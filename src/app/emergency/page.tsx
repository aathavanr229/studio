"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Siren, 
  MapPin, 
  Truck, 
  PhoneCall, 
  AlertCircle, 
  Activity,
  ChevronRight,
  ShieldAlert,
  Clock,
  Navigation,
  Loader2
} from "lucide-react";
import { analyzeEmergency, type EmergencyOutput } from "@/ai/flows/emergency-analyzer";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function EmergencyPage() {
  const [isDispatching, setIsDispatching] = useState(false);
  const [eta, setEta] = useState(12);
  const [progress, setProgress] = useState(0);
  const [description, setDescription] = useState("");
  const [aiResult, setAiResult] = useState<EmergencyOutput | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  // Simulated ambulance tracking
  useEffect(() => {
    if (isDispatching && progress < 100) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 100;
          return prev + 1;
        });
        setEta(prev => Math.max(1, Math.ceil(12 - (progress / 8.33))));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isDispatching, progress]);

  const handlePanicButton = () => {
    setIsDispatching(true);
    toast({
      title: "AMBULANCE DISPATCHED",
      description: "Emergency services have been notified of your location. Stay calm.",
      variant: "destructive",
    });
  };

  const handleAiTriage = async () => {
    if (!description.trim()) return;
    setIsLoadingAi(true);
    try {
      const result = await analyzeEmergency({ description });
      setAiResult(result);
    } catch (error) {
      console.error(error);
      toast({
        title: "AI Analysis Failed",
        description: "Please proceed with standard first aid and wait for the ambulance.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-4xl font-bold font-headline flex items-center gap-3 justify-center md:justify-start text-accent">
            <Siren className="h-10 w-10 animate-pulse" />
            Emergency Response
          </h1>
          <p className="text-muted-foreground">MediGold High-Priority Dispatch & Trauma Support</p>
        </div>
        
        {!isDispatching ? (
          <Button 
            onClick={handlePanicButton}
            className="h-20 px-12 bg-accent hover:bg-accent/90 text-white font-black text-2xl rounded-3xl gold-glow border-4 border-white/10 animate-bounce"
          >
            PANIC: DISPATCH NOW
          </Button>
        ) : (
          <Badge variant="destructive" className="px-6 py-3 text-lg animate-pulse">
            AMBULANCE EN ROUTE
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Tracking & Status */}
        <div className="lg:col-span-7 space-y-8">
          <Card className="glass border-accent/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4">
              <Badge className="bg-accent/20 text-accent border-accent/30">Priority 1</Badge>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5 text-accent" />
                Live Tracker
              </CardTitle>
              <CardDescription>Advanced GPS Tracking for Ambulance #MG-402</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Simulated Map / Route */}
              <div className="h-64 rounded-2xl bg-muted/30 border border-primary/10 relative overflow-hidden flex items-center justify-center">
                 <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/map/800/400')] bg-cover" />
                 <div className="relative z-10 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center animate-ping absolute inset-0" />
                        <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center relative">
                          <Truck className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-accent">AMBULANCE #MG-402</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Crossing Avinashi Road</p>
                 </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase">Estimated Arrival</p>
                    <p className="text-4xl font-black text-accent">{eta} MINS</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground uppercase">Distance</p>
                    <p className="text-xl font-bold">2.4 KM</p>
                  </div>
                </div>
                <Progress value={progress} className="h-3 bg-muted/50">
                  <div className="h-full bg-accent transition-all duration-1000" style={{ width: `${progress}%` }} />
                </Progress>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass border-primary/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <PhoneCall className="h-4 w-4 text-primary" />
                  Direct Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-xl bg-background/50 border border-primary/5">
                  <span className="text-sm">Paramedic Unit</span>
                  <Button variant="link" className="text-primary text-xs">+91 999 444 000</Button>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-background/50 border border-primary/5">
                  <span className="text-sm">Police Assistance</span>
                  <Button variant="link" className="text-primary text-xs">Dial 100</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-primary/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  Nearest Trauma Centers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">KG Hospital</span>
                  <Badge variant="outline" className="text-[10px] h-5">0.8 KM</Badge>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">KMCH</span>
                  <Badge variant="outline" className="text-[10px] h-5">3.1 KM</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column: AI Triage */}
        <div className="lg:col-span-5 space-y-8">
          <Card className="glass border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-primary" />
                AI First Aid Assistant
              </CardTitle>
              <CardDescription>Describe the accident for immediate instructions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <textarea
                  className="w-full h-32 rounded-xl bg-background/50 border border-primary/20 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Describe the situation: e.g., Car accident, victim has leg injury, unconscious but breathing..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button 
                  onClick={handleAiTriage}
                  disabled={isLoadingAi || !description.trim()}
                  className="w-full gold-gradient text-black font-bold h-12"
                >
                  {isLoadingAi ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : "Analyze & Get Advice"}
                </Button>
              </div>

              {aiResult && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Triage Level</span>
                    <Badge className={cn(
                      "font-bold",
                      aiResult.triageLevel === 'CRITICAL' ? "bg-accent text-white" : "bg-primary text-black"
                    )}>
                      {aiResult.triageLevel}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-bold text-primary flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Immediate Actions:
                    </p>
                    <ul className="space-y-2">
                      {aiResult.immediateActions.map((action, i) => (
                        <li key={i} className="text-sm flex gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                          <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs shrink-0 font-bold">{i+1}</span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                    <p className="text-xs font-bold text-accent uppercase mb-2">Watch For Warning Signs:</p>
                    <div className="flex flex-wrap gap-2">
                      {aiResult.warningSigns.map((sign, i) => (
                        <Badge key={i} variant="secondary" className="bg-accent/5 text-[10px] text-accent-foreground border-accent/10">
                          {sign}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="glass border-primary/10 overflow-hidden group">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Vitals Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                 <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-primary animate-pulse" />
                 </div>
                 <div>
                    <p className="text-sm font-bold">Waiting for Connection</p>
                    <p className="text-xs text-muted-foreground">Pair with victim's MediGold wearable</p>
                 </div>
              </div>
              <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/5 text-xs h-10">
                Sync Patient ID Card
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
