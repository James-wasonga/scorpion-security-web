
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from 'npm:resend@2.0.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { name, email, subject } = await req.json()

    console.log('Sending auto-reply email to:', email, 'for:', name)

    const emailResponse = await resend.emails.send({
      from: 'Scorpion Security Ltd <onboarding@resend.dev>',
      to: [email],
      subject: 'Thank you for contacting Scorpion Security Ltd',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background-color: #1e40af; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .footer { background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #ddd; }
            .logo { max-width: 60px; height: auto; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0;">Scorpion Security Ltd</h1>
            <p style="margin: 5px 0 0 0;">Professional Security Services</p>
          </div>
          
          <div class="content">
            <h2>Dear ${name},</h2>
            
            <p>Thank you for contacting <strong>Scorpion Security Ltd</strong>. We have received your inquiry regarding: <em>"${subject}"</em></p>
            
            <p>We appreciate your interest in our professional security services. Our team will review your message and get back to you within 24 hours with a comprehensive response.</p>
            
            <p><strong>What happens next:</strong></p>
            <ul>
              <li>Our security experts will assess your specific requirements</li>
              <li>We'll prepare a customized security solution for your needs</li>
              <li>You'll receive a detailed proposal within 24-48 hours</li>
            </ul>
            
            <p>In the meantime, if you have any urgent security concerns, please don't hesitate to call us directly at:</p>
            <p><strong>📞 +254 721 106 100 or +254 732 086 479</strong></p>
            
            <p>We look forward to protecting what matters most to you.</p>
            
            <p>Best regards,<br>
            <strong>The Scorpion Security Team</strong><br>
            Professional Security Services</p>
          </div>
          
          <div class="footer">
            <p>© 2024 Scorpion Security Guards Ltd. All rights reserved.</p>
            <p style="margin-top: 10px; font-style: italic;">Website developed by <strong>NganaB Web Solutions</strong></p>
          </div>
        </body>
        </html>
      `,
    })

    console.log('Auto-reply email sent successfully:', emailResponse)

    return new Response(
      JSON.stringify({ success: true, messageId: emailResponse.data?.id }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error: any) {
    console.error('Error sending auto-reply email:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
