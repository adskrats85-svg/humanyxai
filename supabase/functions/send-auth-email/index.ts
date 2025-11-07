import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AuthEmailRequest {
  email: string;
  token: string;
  type: 'magiclink' | 'signup' | 'recovery';
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, token, type }: AuthEmailRequest = await req.json();
    
    console.log(`Sending ${type} email to:`, email);

    const subject = type === 'recovery' ? 'Reset Your Password' : 
                    type === 'signup' ? 'Welcome to HumanyxAI' : 
                    'Sign In to HumanyxAI';

    const emailResponse = await resend.emails.send({
      from: "HumanyxAI <onboarding@resend.dev>",
      to: [email],
      subject,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px; border-radius: 12px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0 0 20px;">HumanyxAI</h1>
            <p style="color: #a0a0b0; font-size: 18px; margin: 0 0 30px;">
              ${type === 'recovery' ? 'Reset your password' : 'Your verification code'}
            </p>
            
            <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 8px; margin: 0 0 30px;">
              <div style="font-size: 36px; font-weight: bold; color: #ffffff; letter-spacing: 8px; font-family: monospace;">
                ${token}
              </div>
            </div>
            
            <p style="color: #a0a0b0; font-size: 14px; margin: 0;">
              This code expires in 60 minutes. If you didn't request this, you can safely ignore this email.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <p style="color: #666; font-size: 12px;">
              © 2025 HumanyxAI. Empowering human growth through AI.
            </p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, id: emailResponse.id }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending auth email:", error);
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
