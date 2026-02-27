'use server';
/**
 * @fileOverview An AI-powered symptom checker chatbot for patients.
 *
 * - patientSymptomChecker - A function that processes patient symptoms and provides preliminary information.
 * - PatientSymptomCheckerInput - The input type for the patientSymptomChecker function.
 * - PatientSymptomCheckerOutput - The return type for the patientSymptomChecker function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PatientSymptomCheckerInputSchema = z.object({
  symptoms: z.string().describe('A detailed description of the patient\'s symptoms.'),
});
export type PatientSymptomCheckerInput = z.infer<typeof PatientSymptomCheckerInputSchema>;

const PatientSymptomCheckerOutputSchema = z.object({
  potentialConditions: z
    .array(
      z.object({
        name: z.string().describe('The name of the potential medical condition.'),
        description: z
          .string()
          .describe('A brief, general description of the condition.'),
      })
    )
    .describe(
      'A list of potential conditions based on the symptoms provided, each with a brief description. This is for informational purposes only and not a diagnosis.'
    ),
  guidance: z
    .string()
    .describe(
      'General guidance and recommendations, always emphasizing the immediate need to seek professional medical advice and not to self-diagnose or self-treat.'
    ),
  disclaimer: z
    .string()
    .describe(
      'A clear, prominent disclaimer stating that this information is not a diagnosis, should not replace professional medical advice, and is for informational purposes only.'
    ),
});
export type PatientSymptomCheckerOutput = z.infer<typeof PatientSymptomCheckerOutputSchema>;

export async function patientSymptomChecker(
  input: PatientSymptomCheckerInput
): Promise<PatientSymptomCheckerOutput> {
  return patientSymptomCheckerFlow(input);
}

const patientSymptomCheckerPrompt = ai.definePrompt({
  name: 'patientSymptomCheckerPrompt',
  input: {schema: PatientSymptomCheckerInputSchema},
  output: {schema: PatientSymptomCheckerOutputSchema},
  prompt: `You are an AI-powered symptom checker chatbot for patients. Your purpose is to provide preliminary, non-diagnostic information based on user-described symptoms. You are not a medical professional and cannot provide diagnoses or prescribe treatments.

Based on the following symptoms, list a few potential conditions and provide general guidance. Always emphasize the critical importance of consulting a qualified healthcare professional for a proper diagnosis and treatment. Clearly state that this information is not a diagnosis.

Symptoms: {{{symptoms}}}`,
});

const patientSymptomCheckerFlow = ai.defineFlow(
  {
    name: 'patientSymptomCheckerFlow',
    inputSchema: PatientSymptomCheckerInputSchema,
    outputSchema: PatientSymptomCheckerOutputSchema,
  },
  async input => {
    const {output} = await patientSymptomCheckerPrompt(input);
    return output!;
  }
);
