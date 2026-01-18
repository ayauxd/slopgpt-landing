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

    // Primary: Send to n8n webhook (stores in Supabase + sends Slack notification)
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      try {
        const n8nResponse = await fetch(`${n8nWebhookUrl}/slopgpt-lead-intake`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(lead),
        });

        if (n8nResponse.ok) {
          const result = await n8nResponse.json();
          console.log('Lead sent to n8n:', {
            name: lead.name,
            email: lead.email,
            id: result.id,
            priority: result.priority,
          });

          return new Response(
            JSON.stringify({
              success: true,
              message: result.message || 'Thank you! Our team will be in touch within 24 hours.',
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        } else {
          console.error('n8n webhook error:', await n8nResponse.text());
        }
      } catch (n8nError) {
        console.error('n8n webhook error:', n8nError);
      }
    }

    // Fallback: Send via Formsubmit.co if n8n is not configured or fails
    const formsubmitEmail = process.env.LEAD_EMAIL || 'fred@softworkstrading.com';
    try {
      const formsubmitResponse = await fetch(`https://formsubmit.co/ajax/${formsubmitEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `SlopGPT Lead: ${lead.name} - ${lead.eventType || 'Event Inquiry'}`,
          _replyto: lead.email,
          _template: 'table',
          'Lead Name': lead.name,
          'Lead Email': lead.email,
          'Lead Phone': lead.phone || 'Not provided',
          'Event Type': lead.eventType || 'Not specified',
          'Theme/Concept': lead.theme || 'Not specified',
          'Event Date': lead.date || 'Not specified',
          'Guest Count': lead.guestCount || 'Not specified',
          'Location': lead.location || 'Not specified',
          'Budget Range': lead.budget || 'Not discussed',
          'Conversation': lead.conversationSummary || 'No summary',
        }),
      });

      if (!formsubmitResponse.ok) {
        console.error('Formsubmit error:', await formsubmitResponse.text());
      } else {
        console.log('Lead email sent via Formsubmit (fallback)');
      }
    } catch (emailError) {
      console.error('Formsubmit error:', emailError);
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
