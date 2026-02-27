"use client";

import { useState } from "react";
import { patientSymptomChecker, type PatientSymptomCheckerOutput } from "@/ai/flows/patient-symptom-checker";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BrainCircuit, Loader2, Send, AlertTriangle, ShieldCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SymptomChecker() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PatientSymptomCheckerOutput | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    try {
      const res = await patientSymptomChecker({ symptoms: input });
      setResult(res);
    } catch (error) {
      console.error("Error checking symptoms:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center space-y-4 mb-12">
        <div className="p-4 rounded-full bg-primary/10 border border-primary/20 w-fit mx-auto mb-6">
          <BrainCircuit className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold font-headline gold-text">AI Symptom Assistant</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Describe how you're feeling in detail. Our medical AI will provide preliminary information and guidance.
        </p>
      </div>

      <div className="grid gap-8">
        <Card className="glass border-primary/10">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary uppercase tracking-wider">Describe Symptoms</label>
                <Textarea
                  placeholder="e.g., I have a sharp pain in my lower back that started 2 days ago, accompanied by slight fever..."
                  className="min-h-[150px] bg-background/50 border-primary/20 focus:border-primary text-lg"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full gold-gradient text-black font-bold h-14 text-lg"
                disabled={loading || !input.trim()}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing Symptoms...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Check Symptoms
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid gap-4 md:grid-cols-2">
              {result.potentialConditions.map((condition, idx) => (
                <Card key={idx} className="glass border-primary/10 hover:border-primary/30 transition-all">
                  <CardHeader>
                    <CardTitle className="text-primary">{condition.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">{condition.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-accent/20 bg-accent/5">
              <CardHeader className="flex flex-row items-center gap-2 pb-2">
                <ShieldCheck className="h-5 w-5 text-accent" />
                <CardTitle className="text-lg">Guidance & Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed">{result.guidance}</p>
              </CardContent>
            </Card>

            <Alert variant="destructive" className="border-accent/50 bg-accent/10 text-white">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle className="font-bold">Medical Disclaimer</AlertTitle>
              <AlertDescription className="text-xs opacity-90">
                {result.disclaimer}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
}