import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.79.0';

const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID");
const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN");
const TWILIO_VERIFY_SERVICE_SID = Deno.env.get("TWILIO_VERIFY_SERVICE_SID");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VerifyOTPRequest {
  phone: string;
  code: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phone, code }: VerifyOTPRequest = await req.json();
    
    console.log(`Verifying OTP for phone:`, phone);

    // Verify OTP using Twilio Verify API
    const verifyResponse = await fetch(
      `https://verify.twilio.com/v2/Services/${TWILIO_VERIFY_SERVICE_SID}/VerificationCheck`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`),
        },
        body: new URLSearchParams({
          To: phone,
          Code: code,
        }),
      }
    );

    const verifyData = await verifyResponse.json();

    if (!verifyResponse.ok || verifyData.status !== 'approved') {
      console.error("Twilio verification failed:", verifyData);
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid code' }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("OTP verified successfully");

    // Create/sign in user with Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    let userId: string;

    // Try to create the user
    const { data: createData, error: createError } = await supabase.auth.admin.createUser({
      phone,
      phone_confirm: true,
    });

    if (createError) {
      // If user already exists, get their ID
      if (createError.message.includes('already registered')) {
        console.log("User already exists, fetching user ID");
        
        const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
        if (listError) {
          throw listError;
        }
        
        const existingUser = users.find(u => u.phone === phone);
        if (existingUser) {
          userId = existingUser.id;
          console.log("Found existing user:", userId);
        } else {
          console.warn("Existing user with this phone not found in current page; proceeding without userId");
        }
      } else {
        console.error("Supabase auth error:", createError);
        throw createError;
      }
    } else {
      userId = createData.user.id;
      console.log("Created new user:", userId);
    }

    // Generate a session using admin API
    // Note: generateLink doesn't directly return session tokens, so we'll use the hashed_token
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: `${phone.replace(/\+/g, '')}@phone.user`, // Use phone as email identifier
    });

    if (linkError) {
      console.error("Error generating link:", linkError);
      throw linkError;
    }

    console.log("Magic link generated successfully");

    // Extract tokens from the action link
    const actionLink = linkData.properties.action_link;
    const url = new URL(actionLink);
    const accessToken = url.searchParams.get('access_token');
    const refreshToken = url.searchParams.get('refresh_token');

    if (!accessToken || !refreshToken) {
      throw new Error('Failed to extract session tokens');
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Phone number verified successfully',
        session: {
          access_token: accessToken,
          refresh_token: refreshToken,
        }
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error verifying OTP:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
