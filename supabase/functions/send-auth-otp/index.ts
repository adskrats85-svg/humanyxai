import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID");
const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN");
const TWILIO_VERIFY_SERVICE_SID = Deno.env.get("TWILIO_VERIFY_SERVICE_SID");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SendOTPRequest {
  phone: string;
  channel: 'sms' | 'call';
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phone, channel = 'sms' }: SendOTPRequest = await req.json();
    
    console.log(`Sending OTP via ${channel} to:`, phone);

    // Send OTP using Twilio Verify API
    const verifyResponse = await fetch(
      `https://verify.twilio.com/v2/Services/${TWILIO_VERIFY_SERVICE_SID}/Verifications`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`),
        },
        body: new URLSearchParams({
          To: phone,
          Channel: channel,
        }),
      }
    );

    const verifyData = await verifyResponse.json();

    if (!verifyResponse.ok) {
      console.error("Twilio Verify error:", verifyData);
      throw new Error(verifyData.message || 'Failed to send OTP');
    }

    console.log("OTP sent successfully:", verifyData.sid);

    return new Response(
      JSON.stringify({ 
        success: true, 
        sid: verifyData.sid,
        status: verifyData.status 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending OTP:", error);
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
