import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.79.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const WelcomeSMSSchema = z.object({
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format. Must be E.164 format (e.g., +1234567890)" })
    .trim(),
  source: z.string()
    .max(100, { message: "Source must be less than 100 characters" })
    .trim()
    .optional(),
  signup_id: z.string()
    .uuid({ message: "Invalid signup ID format" })
    .trim(),
});

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Validate internal secret
  const INTERNAL_SECRET = Deno.env.get("EDGE_FUNCTION_SECRET");
  const providedSecret = req.headers.get("x-internal-secret");

  if (!INTERNAL_SECRET || providedSecret !== INTERNAL_SECRET) {
    console.error("Unauthorized access attempt");
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const requestBody = await req.json();
    
    // Validate input
    const validation = WelcomeSMSSchema.safeParse(requestBody);
    if (!validation.success) {
      console.error("Validation failed:", validation.error.errors);
      return new Response(
        JSON.stringify({ 
          error: "Invalid input",
          details: validation.error.errors.map(e => e.message).join(", ")
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { phone, source, signup_id } = validation.data;
    console.log(`Sending welcome SMS to ${phone} from source: ${source}, signup_id: ${signup_id}`);

    // Initialize Twilio client
    const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    const twilioPhone = Deno.env.get("TWILIO_PHONE_NUMBER");

    if (!accountSid || !authToken || !twilioPhone) {
      throw new Error("Twilio credentials not configured");
    }

    // Send SMS via Twilio REST API (Deno-compatible)
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    const authHeader = `Basic ${btoa(`${accountSid}:${authToken}`)}`;

    const twilioResponse = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        To: phone,
        From: twilioPhone,
        Body: "Welcome to HumanyxAI! Thanks for expressing interest to become an evolution pioneer....the gene pool is better already! We'll keep you updated on our progress. Reply STOP to unsubscribe.",
      }),
    });

    if (!twilioResponse.ok) {
      const error = await twilioResponse.json();
      console.error("Twilio API error:", error);
      throw new Error(error.message || `Twilio API error: ${twilioResponse.status}`);
    }

    const message = await twilioResponse.json();
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
