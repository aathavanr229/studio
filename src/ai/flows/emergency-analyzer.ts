'use server';
/**
 * @fileOverview AI Emergency Triage & First Aid Assistant.
 *
 * - analyzeEmergency - Provides immediate first aid instructions based on accident descriptions.
 * - EmergencyInput - The input type for accident details.
 * - EmergencyOutput - The return type for triage instructions.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EmergencyInputSchema = z.object({
  description: z.string().describe('A description of the accident or emergency situation.'),
  location: z.string().optional().describe('The user\'s current location.'),
});
export type EmergencyInput = z.infer<typeof EmergencyInputSchema>;

const EmergencyOutputSchema = z.object({
  triageLevel: z.enum(['CRITICAL', 'URGENT', 'STABLE']).describe('The severity of the situation.'),
  immediateActions: z.array(z.string()).describe('Step-by-step first aid actions to take immediately.'),
  warningSigns: z.array(z.string()).describe('Critical signs to watch out for while waiting.'),
  professionalAdvice: z.string().describe('Summary of professional medical advice.'),
});
export type EmergencyOutput = z.infer<typeof EmergencyOutputSchema>;

export async function analyzeEmergency(input: EmergencyInput): Promise<EmergencyOutput> {
  return emergencyFlow(input);
}

const emergencyPrompt = ai.definePrompt({
  name: 'emergencyPrompt',
  input: {schema: EmergencyInputSchema},
  output: {schema: EmergencyOutputSchema},
  prompt: `You are an elite Emergency Medical Dispatch AI. 
A user is reporting an accident or medical emergency. 

User Description: {{{description}}}

Provide immediate, high-priority first aid instructions that can be performed by a bystander while an ambulance is en route. 

Your instructions must be:
1. Clear and concise.
2. Action-oriented (e.g., "Apply firm pressure", "Do not move the neck").
3. Calm and professional.

Categorize the triage level as CRITICAL, URGENT, or STABLE.`,
});

const emergencyFlow = ai.defineFlow(
  {
    name: 'emergencyFlow',
    inputSchema: EmergencyInputSchema,
    outputSchema: EmergencyOutputSchema,
  },
  async input => {
    const {output} = await emergencyPrompt(input);
    return output!;
  }
);
