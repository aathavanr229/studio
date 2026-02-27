
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * Genkit instance for MediGold AI services.
 * Uses Gemini 2.0 Flash for low latency and high-quality medical analysis.
 */
export const ai = genkit({
  plugins: [
    googleAI()
  ],
  model: 'googleai/gemini-2.0-flash',
});
