import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
  source?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, source }: WelcomeEmailRequest = await req.json();
    console.log(`Sending welcome email to ${email} from source: ${source}`);

    const sourceMessage = source === 'hero' 
      ? "Thanks for joining from our homepage! We're excited to have you as an early evolution pioneer."
      : "Thanks for your interest in becoming an evolution pioneer! We're glad you found us.";

    const emailResponse = await resend.emails.send({
      from: "HumanYX <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to HumanYX - Evolution Pioneer",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Welcome to HumanYX!</h1>
          <p style="font-size: 16px; color: #555;">
            ${sourceMessage}
          </p>
          <p style="font-size: 16px; color: #555;">
            The gene pool is better already! We'll keep you updated on our progress and exciting developments.
          </p>
          <p style="font-size: 16px; color: #555;">
            Stay tuned for exclusive updates and early access opportunities.
          </p>
          <p style="font-size: 14px; color: #888; margin-top: 30px;">
            Best regards,<br>
            The HumanYX Team
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error);
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
