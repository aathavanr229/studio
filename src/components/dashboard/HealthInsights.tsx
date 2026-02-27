'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { generateHealthInsights, type HealthInsightsOutput } from '@/ai/flows/health-insights';

interface HealthInsightsProps {
  metrics: {
    heartRate: string;
    bloodPressure: string;
    weight: string;
  };
}

export function HealthInsights({ metrics }: HealthInsightsProps) {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<HealthInsightsOutput | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await generateHealthInsights(metrics);
      setInsights(res);
    } catch (error) {
      console.error('Failed to generate insights:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass border-primary/20 overflow-hidden relative group">
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Health Insights
          </CardTitle>
          {!insights && !loading && (
            <Button 
              size="sm" 
              onClick={handleGenerate}
              className="gold-gradient text-black font-bold h-8 px-4"
            >
              Analyze Metrics
            </Button>
          )}
        </div>
        <CardDescription>Advanced analysis of your current vitals.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground animate-pulse">Generating gold-standard insights...</p>
          </div>
        ) : insights ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm font-medium text-primary mb-1">Status Summary</p>
              <p className="text-sm leading-relaxed">{insights.summary}</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Key Observations</p>
              <ul className="space-y-1">
                {insights.insights.map((insight, i) => (
                  <li key={i} className="text-xs flex items-start gap-2">
                    <div className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                    {insight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-start gap-2 p-2 rounded border border-accent/20 bg-accent/5">
              <AlertCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <p className="text-[10px] text-accent-foreground leading-tight italic">
                {insights.disclaimer}
              </p>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-xs text-primary hover:bg-primary/5"
              onClick={() => setInsights(null)}
            >
              Reset Analysis
            </Button>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-muted-foreground">Click the button above to receive an AI analysis of your heart rate, blood pressure, and weight.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
