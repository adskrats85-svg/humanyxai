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
        console.log("User already exists, fetching user...");
        const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
        
        if (listError) {
          console.error("Error listing users:", listError);
          throw listError;
        }

        const existingUser = users.find(u => u.phone === phone);
        if (!existingUser) {
          throw new Error('User not found after creation failed');
        }
        
        userId = existingUser.id;
        console.log("Found existing user:", userId);
      } else {
        console.error("Supabase auth error:", createError);
        throw createError;
      }
    } else {
      userId = createData.user.id;
      console.log("Created new user:", userId);
    }

    // Generate a session for the user
    const { data: sessionData, error: sessionError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      phone,
    });

    if (sessionError) {
      console.error("Error generating session:", sessionError);
      throw sessionError;
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        session: sessionData.properties,
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
