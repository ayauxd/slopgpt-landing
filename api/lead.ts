export const config = {
  runtime: 'edge',
};

interface LeadData {
  name: string;
  email: string;
  phone?: string;
  eventType?: string;
  theme?: string;
  date?: string;
  guestCount?: string;
  location?: string;
  budget?: string;
  conversationSummary?: string;
}

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const lead: LeadData = await req.json();

    if (!lead.name || !lead.email) {
      return new Response(
        JSON.stringify({ error: 'Name and email are required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Format the lead data for email
    const emailBody = `
New Lead from SlopGPT Chat

Contact Information:
--------------------
Name: ${lead.name}
Email: ${lead.email}
Phone: ${lead.phone || 'Not provided'}

Event Details:
--------------
Event Type: ${lead.eventType || 'Not specified'}
Theme/Concept: ${lead.theme || 'Not specified'}
Date: ${lead.date || 'Not specified'}
Guest Count: ${lead.guestCount || 'Not specified'}
Location: ${lead.location || 'Not specified'}
Budget: ${lead.budget || 'Not discussed'}

Conversation Summary:
--------------------
${lead.conversationSummary || 'No summary available'}

---
This lead was captured via the SlopGPT chat assistant.
    `.trim();

    // If Resend API key is configured, send via Resend
    if (process.env.RESEND_API_KEY) {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'SlopGPT <noreply@slopgpt.com>',
          to: process.env.LEAD_EMAIL || 'hello@slopgpt.com',
          subject: `New Lead: ${lead.name} - ${lead.eventType || 'Event Inquiry'}`,
          text: emailBody,
        }),
      });

      if (!resendResponse.ok) {
        console.error('Resend API error:', await resendResponse.text());
        // Don't fail the request - we'll still return success to the user
      }
    }

    // If webhook URL is configured, also send there
    if (process.env.LEAD_WEBHOOK_URL) {
      try {
        await fetch(process.env.LEAD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...lead,
            timestamp: new Date().toISOString(),
            source: 'slopgpt-chat',
          }),
        });
      } catch (webhookError) {
        console.error('Webhook error:', webhookError);
      }
    }

    // Log lead for debugging (visible in Vercel logs)
    console.log('Lead captured:', {
      name: lead.name,
      email: lead.email,
      eventType: lead.eventType,
      timestamp: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you! Our team will be in touch within 24 hours.',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Lead API error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to submit lead' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
