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
  verificationSid?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phone, code, verificationSid }: VerifyOTPRequest = await req.json();
    
    console.log(`Verifying OTP for phone:`, phone, verificationSid ? `with SID: ${verificationSid}` : '');

    // Build verification params - prefer VerificationSid if provided
    const verifyParams: Record<string, string> = {
      Code: code,
    };
    
    if (verificationSid) {
      verifyParams.VerificationSid = verificationSid;
    } else {
      verifyParams.To = phone;
    }

    // Verify OTP using Twilio Verify API
    const verifyResponse = await fetch(
      `https://verify.twilio.com/v2/Services/${TWILIO_VERIFY_SERVICE_SID}/VerificationCheck`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`),
        },
        body: new URLSearchParams(verifyParams),
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

    // Create/sign in user with Supabase using magic link
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Generate a magic link for phone-based authentication
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: `${phone.replace(/\+/g, '')}@phone.user`,
    });

    if (linkError) {
      console.error("Error generating magic link:", linkError);
      throw linkError;
    }

    console.log("Magic link generated successfully");

    // Return the action link for client-side redirect
    const actionLink = linkData.properties.action_link;

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Phone number verified successfully',
        redirectUrl: actionLink
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
