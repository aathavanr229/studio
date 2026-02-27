
'use server';
/**
 * @fileOverview Conversational AI Health Assistant Flow.
 *
 * - healthChat - A function that handles conversational health queries.
 * - ChatInput - The input type for the chat message and history.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatInputSchema = z.object({
  message: z.string().describe('The user\'s message.'),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'model']),
        content: z.string(),
      })
    )
    .optional()
    .describe('The conversation history.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export async function healthChat(input: ChatInput): Promise<string> {
  return healthChatFlow(input);
}

const healthChatFlow = ai.defineFlow(
  {
    name: 'healthChatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: z.string(),
  },
  async input => {
    // Construct messages for Gemini multi-turn conversation
    const messages = (input.history || []).map(m => ({
      role: m.role as 'user' | 'model',
      content: [{text: m.content}],
    }));
    
    // Append the latest user message
    messages.push({
      role: 'user' as const,
      content: [{text: input.message}],
    });

    const response = await ai.generate({
      system: 'You are the MediGold AI Health Assistant, a sophisticated medical consultant. Your tone is professional and reassuring. Provide concise medical information. ALWAYS include a brief medical disclaimer at the end stating that you are an AI and not a replacement for professional medical advice.',
      messages: messages as any,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text;
  }
);
