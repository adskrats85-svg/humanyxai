import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.79.0";
import twilio from "https://esm.sh/twilio@5.3.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WelcomeSMSRequest {
  phone: string;
  source?: string;
  signup_id: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const { phone, source, signup_id }: WelcomeSMSRequest = await req.json();
    console.log(`Sending welcome SMS to ${phone} from source: ${source}, signup_id: ${signup_id}`);

    // Initialize Twilio client
    const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    const twilioPhone = Deno.env.get("TWILIO_PHONE_NUMBER");

    if (!accountSid || !authToken || !twilioPhone) {
      throw new Error("Twilio credentials not configured");
    }

    const twilioClient = twilio(accountSid, authToken);

    // Validate phone number format (basic E.164 check)
    if (!phone.match(/^\+?[1-9]\d{1,14}$/)) {
      console.error("Invalid phone number format:", phone);
      
      // Log failed attempt
      await supabase.from("sms_logs").insert({
        phone,
        email: null,
        status: "failed",
        reason: "Invalid phone number format",
      });

      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid phone number format. Must be E.164 format (e.g., +1234567890)" 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send SMS via Twilio
    const message = await twilioClient.messages.create({
      body: "Welcome to HumanYX and expressing interest to become an evolution pioneer....the gene pool is better already it! We'll keep you updated on our progress. Reply STOP to unsubscribe.",
      from: twilioPhone,
      to: phone,
    });

    console.log("SMS sent successfully:", message.sid);

    // Log successful SMS
    await supabase.from("sms_logs").insert({
      phone,
      email: null,
      status: "sent",
      reason: null,
    });

    // Get current signup info for rate limit details
    const { data: signup } = await supabase
      .from("signups")
      .select("sms_send_count, is_rate_limited")
      .eq("id", signup_id)
      .single();

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "SMS sent successfully",
        sms_sid: message.sid,
        sms_count: signup?.sms_send_count || 0,
        is_rate_limited: signup?.is_rate_limited || false,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-welcome-sms function:", error);

    // Log failed attempt
    try {
      const { phone } = await req.json();
      await supabase.from("sms_logs").insert({
        phone: phone || "unknown",
        email: null,
        status: "failed",
        reason: error.message || "Unknown error",
      });
    } catch (logError) {
      console.error("Failed to log SMS error:", logError);
    }

    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to send SMS" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
