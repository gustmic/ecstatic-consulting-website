import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from 'https://esm.sh/resend@4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  contactId: string;
  subject: string;
  body: string;
  fromEmail: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY not configured');
    }

    const resend = new Resend(resendApiKey);
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    const { contactId, subject, body, fromEmail }: EmailRequest = await req.json();

    // Get contact details
    const { data: contact, error: contactError } = await supabaseClient
      .from('contacts')
      .select('*')
      .eq('id', contactId)
      .single();

    if (contactError || !contact) {
      throw new Error('Contact not found');
    }

    // Send email via Resend
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: fromEmail,
      to: [contact.email],
      subject: subject,
      html: body,
    });

    if (emailError) {
      throw emailError;
    }

    console.log('Email sent successfully:', emailData);

    // Log interaction
    const { error: interactionError } = await supabaseClient
      .from('interactions')
      .insert({
        contact_id: contactId,
        type: 'Email',
        subject: subject,
        notes: body.substring(0, 500), // Store first 500 chars
        date: new Date().toISOString().split('T')[0],
        logged_by: user.id,
      });

    if (interactionError) {
      console.error('Failed to log interaction:', interactionError);
    }

    // Update last_contacted
    await supabaseClient
      .from('contacts')
      .update({ last_contacted: new Date().toISOString().split('T')[0] })
      .eq('id', contactId);

    return new Response(
      JSON.stringify({ success: true, emailId: emailData?.id }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in send-email:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
