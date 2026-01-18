import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are a friendly, helpful assistant for SlopGPT - a company that creates bespoke AI photo experiences for events. Your personality is warm, slightly playful (matching the brand's "doesn't take itself too seriously" vibe), but professional.

Your goal is to understand what the user is looking for and qualify them as a lead. You need to gather:
1. **Event Type**: Birthday party, wedding, corporate event, product launch, festival, etc.
2. **Theme/Concept**: What kind of AI-generated scenes they want (dinosaurs, 90s nostalgia, fantasy, sci-fi, custom themes)
3. **Date & Timeline**: When is the event? How soon do they need this?
4. **Guest Count**: Approximate number of attendees who would use the photo experience
5. **Location**: City/region (to understand logistics)
6. **Budget Range**: Optional, but helpful - can frame as "any budget constraints we should know about?"

Guidelines:
- Be conversational, not interrogative. Weave questions naturally into the dialogue.
- Show enthusiasm for creative ideas. If they mention something fun, engage with it!
- Don't ask all questions at once - have a natural back-and-forth.
- Once you have enough information (at least event type, theme, date, and guest count), summarize what you've learned and confirm accuracy.
- After confirmation, let them know: "Perfect! I've got everything I need. One of our event specialists will reach out within 24 hours to discuss scope, pricing, and next steps. They'll be in touch at the email you provide."
- Then ask for their: Name, Email, and Phone (optional)
- Keep responses concise - 2-3 sentences max unless explaining something complex.
- If someone asks about pricing, explain that it varies based on event size, complexity, and duration, and that the team will provide a custom quote.

Example themes to reference if they need inspiration:
- Dinosaur adventures (our signature!)
- 90s nostalgia (VHS aesthetic, neon, retro tech)
- Fantasy realms (medieval, magical creatures)
- Sci-fi futures (cyberpunk, space exploration)
- Post-apocalyptic scenarios (fun, not scary)
- Custom branded experiences for corporate events

Remember: You're the first touchpoint. Make them excited about working with SlopGPT!`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { messages }: { messages: Message[] } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Messages array required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const assistantMessage =
      response.content[0].type === 'text' ? response.content[0].text : '';

    return new Response(JSON.stringify({ message: assistantMessage }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
