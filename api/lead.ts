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

    let notificationSent = false;

    // Primary: Send to Slack directly (most reliable)
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (slackWebhookUrl) {
      try {
        const slackMessage = {
          blocks: [
            {
              type: 'header',
              text: {
                type: 'plain_text',
                text: `🎉 New SlopGPT Lead: ${lead.name}`,
                emoji: true,
              },
            },
            {
              type: 'section',
              fields: [
                { type: 'mrkdwn', text: `*Name:*\n${lead.name}` },
                { type: 'mrkdwn', text: `*Email:*\n${lead.email}` },
                { type: 'mrkdwn', text: `*Phone:*\n${lead.phone || 'Not provided'}` },
                { type: 'mrkdwn', text: `*Event Type:*\n${lead.eventType || 'Not specified'}` },
                { type: 'mrkdwn', text: `*Theme:*\n${lead.theme || 'Not specified'}` },
                { type: 'mrkdwn', text: `*Date:*\n${lead.date || 'Not specified'}` },
                { type: 'mrkdwn', text: `*Guests:*\n${lead.guestCount || 'Not specified'}` },
                { type: 'mrkdwn', text: `*Budget:*\n${lead.budget || 'Not discussed'}` },
              ],
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*Conversation Summary:*\n${lead.conversationSummary || 'No summary'}`,
              },
            },
            {
              type: 'context',
              elements: [
                {
                  type: 'mrkdwn',
                  text: `📍 ${lead.location || 'Location not specified'} | ⏰ ${new Date().toISOString()}`,
                },
              ],
            },
          ],
        };

        const slackResponse = await fetch(slackWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(slackMessage),
        });

        if (slackResponse.ok) {
          console.log('Lead sent to Slack:', { name: lead.name, email: lead.email });
          notificationSent = true;
        } else {
          console.error('Slack webhook error:', await slackResponse.text());
        }
      } catch (slackError) {
        console.error('Slack webhook error:', slackError);
      }
    }

    // Secondary: Try n8n webhook (for Supabase storage)
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      try {
        const n8nResponse = await fetch(`${n8nWebhookUrl}/slopgpt-lead-intake`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lead),
        });

        if (n8nResponse.ok) {
          console.log('Lead also sent to n8n for storage');
        }
      } catch (n8nError) {
        console.error('n8n webhook error (non-critical):', n8nError);
      }
    }

    // Log lead for debugging (visible in Vercel logs)
    console.log('Lead captured:', {
      name: lead.name,
      email: lead.email,
      eventType: lead.eventType,
      notificationSent,
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
