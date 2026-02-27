import { config } from 'dotenv';
config();

import '@/ai/flows/patient-symptom-checker.ts';
import '@/ai/flows/health-insights.ts';
import '@/ai/flows/emergency-analyzer.ts';
