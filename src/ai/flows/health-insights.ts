'use server';
/**
 * @fileOverview AI Health Insight Generator.
 *
 * - generateHealthInsights - A function that provides premium AI-driven health feedback.
 * - HealthMetricsInput - The input type for health data.
 * - HealthInsightsOutput - The return type for the AI insights.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HealthMetricsInputSchema = z.object({
  heartRate: z.string().describe('The patient\'s current heart rate in BPM.'),
  bloodPressure: z.string().describe('The patient\'s current blood pressure reading.'),
  weight: z.string().describe('The patient\'s weight in lbs.'),
});
export type HealthMetricsInput = z.infer<typeof HealthMetricsInputSchema>;

const HealthInsightsOutputSchema = z.object({
  summary: z.string().describe('A brief, high-level summary of the health status.'),
  insights: z.array(z.string()).describe('A list of specific insights based on the provided metrics.'),
  recommendations: z.array(z.string()).describe('General lifestyle recommendations in the "Gold Standard" style.'),
  disclaimer: z.string().describe('A medical disclaimer.'),
});
export type HealthInsightsOutput = z.infer<typeof HealthInsightsOutputSchema>;

export async function generateHealthInsights(
  input: HealthMetricsInput
): Promise<HealthInsightsOutput> {
  return healthInsightsFlow(input);
}

const healthInsightsPrompt = ai.definePrompt({
  name: 'healthInsightsPrompt',
  input: {schema: HealthMetricsInputSchema},
  output: {schema: HealthInsightsOutputSchema},
  prompt: `You are an elite medical AI consultant for MediGold, a premium telemedicine service. 
Analyze the following health metrics and provide professional, sophisticated, and insightful feedback. 

Metrics:
- Heart Rate: {{{heartRate}}}
- Blood Pressure: {{{bloodPressure}}}
- Weight: {{{weight}}}

Your tone should be reassuring, precise, and professional. Provide a summary, specific insights, and lifestyle recommendations. Always include a disclaimer that this is not a substitute for professional medical advice.`,
});

const healthInsightsFlow = ai.defineFlow(
  {
    name: 'healthInsightsFlow',
    inputSchema: HealthMetricsInputSchema,
    outputSchema: HealthInsightsOutputSchema,
  },
  async input => {
    const {output} = await healthInsightsPrompt(input);
    return output!;
  }
);
