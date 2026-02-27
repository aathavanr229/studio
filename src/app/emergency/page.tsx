"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Loader2,
  CheckCircle2
} from "lucide-react";
import { analyzeEmergency, type EmergencyOutput } from "@/ai/flows/emergency-analyzer";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function EmergencyPage() {
  const [isDispatching, setIsDispatching] = useState(false);
  const [hasArrived, setHasArrived] = useState(false);
  const [eta, setEta] = useState(12);
  const [progress, setProgress] = useState(0);
  const [description, setDescription] = useState("");
  const [aiResult, setAiResult] = useState<EmergencyOutput | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [currentStreet, setCurrentStreet] = useState("Stationary at Hub");

  const streets = [
    "Leaving MG Road Hub",
    "Passing Avinashi Road Junction",
    "Crossing Brookefields Area",
    "Near Gandhipuram Signal",
    "Turning onto Race Course Road",
    "Entering your immediate vicinity",
    "Ambulance has Arrived"
  ];

  // Simulated ambulance tracking
  useEffect(() => {
    if (isDispatching && !hasArrived) {
      const timer = setInterval(() => {
        setProgress(prev => {
          const next = prev + 1;
          if (next >= 100) {
            setHasArrived(true);
            return 100;
          }
          return next;
        });

        setEta(prev => {
          const newEta = Math.max(0, 12 - Math.floor(progress / 8.33));
          return newEta;
        });

        // Update street location based on progress
        const streetIdx = Math.min(Math.floor((progress / 100) * streets.length), streets.length - 1);
        setCurrentStreet(streets[streetIdx]);

      }, 800); 
      return () => clearInterval(timer);
    }
  }, [isDispatching, progress, hasArrived, streets]);

  useEffect(() => {
    if (hasArrived) {
      toast({
        title: "AMBULANCE ARRIVED",
        description: "Unit #MG-402 is at your location now.",
      });
    }
  }, [hasArrived]);

  const handlePanicButton = () => {
    setIsDispatching(true);
    setHasArrived(false);
    setProgress(0);
    setEta(12);
    toast({
      title: "AMBULANCE DISPATCHED",
      description: "Emergency services have been notified. Unit #MG-402 is en route.",
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
      toast({
        title: "Analysis Failed",
        description: "Could not reach medical AI. Please follow standard emergency protocols.",
        variant: "destructive",
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
        ) : hasArrived ? (
          <Badge className="px-8 py-4 text-xl bg-green-600 text-white border-none flex gap-2 items-center">
            <CheckCircle2 className="h-6 w-6" />
            ARRIVED AT LOCATION
          </Badge>
        ) : (
          <Badge variant="destructive" className="px-8 py-4 text-xl animate-pulse flex gap-2 items-center">
            <Truck className="h-6 w-6" />
            EN ROUTE (ETA: {eta}m)
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
          <Card className={cn(
            "glass border-accent/20 overflow-hidden relative transition-all duration-500",
            hasArrived && "border-green-500/50 bg-green-500/5"
          )}>
            <div className="absolute top-0 right-0 p-4">
              <Badge className={cn(
                "border-accent/30",
                hasArrived ? "bg-green-500 text-white" : "bg-accent/20 text-accent"
              )}>
                {hasArrived ? "MISSION COMPLETE" : "PRIORITY 1"}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5 text-accent" />
                Live Tracker: Unit #MG-402
              </CardTitle>
              <CardDescription>GPS Satellite Link Active • Coimbatore Sector</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="h-64 rounded-3xl bg-muted/30 border border-primary/10 relative overflow-hidden flex items-center justify-center group">
                 <div className="absolute inset-0 opacity-40 bg-[url('https://picsum.photos/seed/cbe-map/1200/800')] bg-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                 <div className="relative z-10 text-center glass p-6 rounded-2xl border-white/10">
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        {!hasArrived && isDispatching && (
                          <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center animate-ping absolute inset-0" />
                        )}
                        <div className={cn(
                          "h-16 w-16 rounded-full flex items-center justify-center relative transition-colors duration-500",
                          hasArrived ? "bg-green-600" : isDispatching ? "bg-accent" : "bg-muted"
                        )}>
                          {hasArrived ? <CheckCircle2 className="h-8 w-8 text-white" /> : <Truck className="h-8 w-8 text-white" />}
                        </div>
                      </div>
                    </div>
                    <p className={cn("text-lg font-black uppercase tracking-tight", hasArrived ? "text-green-500" : isDispatching ? "text-accent" : "text-muted-foreground")}>
                      {hasArrived ? "Ambulance Arrived" : isDispatching ? "Ambulance En Route" : "Awaiting Dispatch"}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium mt-1">
                      {isDispatching ? currentStreet : "Awaiting emergency signal"}
                    </p>
                 </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Estimated Arrival</p>
                    <p className={cn(
                      "text-5xl font-black transition-colors",
                      hasArrived ? "text-green-500" : isDispatching ? "text-accent" : "text-muted-foreground"
                    )}>
                      {hasArrived ? "0" : isDispatching ? eta : "--"} <span className="text-xl">MINS</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Current Distance</p>
                    <p className="text-2xl font-bold">
                      {hasArrived ? "0.0" : isDispatching ? (2.4 * (1 - progress/100)).toFixed(1) : "--"} KM
                    </p>
                  </div>
                </div>
                <div className="relative pt-2">
                  <Progress value={progress} className="h-4 bg-muted/50 rounded-full overflow-hidden">
                    <div className={cn(
                      "h-full transition-all duration-1000",
                      hasArrived ? "bg-green-600" : "bg-accent"
                    )} style={{ width: `${progress}%` }} />
                  </Progress>
                </div>
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
                  <Button variant="link" className="text-primary text-xs font-bold">+91 999 444 000</Button>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-background/50 border border-primary/5">
                  <span className="text-sm">Police Assistance</span>
                  <Button variant="link" className="text-primary text-xs font-bold">Dial 100</Button>
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
                <div className="flex items-center justify-between text-xs p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <span className="font-bold">KG Hospital</span>
                  <Badge variant="outline" className="text-[10px] h-5 border-primary/20">0.8 KM</Badge>
                </div>
                <div className="flex items-center justify-between text-xs p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <span className="font-bold">KMCH (Avinashi Rd)</span>
                  <Badge variant="outline" className="text-[10px] h-5 border-primary/20">3.1 KM</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <Card className="glass border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-primary" />
                AI First Aid Assistant
              </CardTitle>
              <CardDescription>Get immediate life-saving instructions while waiting.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <textarea
                  className="w-full h-32 rounded-xl bg-background/50 border border-primary/20 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                  placeholder="Describe the situation: e.g., Car accident, victim has leg injury, unconscious but breathing..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button 
                  onClick={handleAiTriage}
                  disabled={isLoadingAi || !description.trim()}
                  className="w-full gold-gradient text-black font-bold h-12 shadow-lg"
                >
                  {isLoadingAi ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : "Analyze Situation"}
                </Button>
              </div>

              {aiResult && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex items-center justify-between border-b border-primary/10 pb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Triage Level</span>
                    <Badge className={cn(
                      "font-black px-4 py-1",
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
                    <ul className="space-y-3">
                      {aiResult.immediateActions.map((action, i) => (
                        <li key={i} className="text-sm flex gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                          <span className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs shrink-0 font-black">{i+1}</span>
                          <span className="leading-relaxed">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                    <p className="text-xs font-black text-accent uppercase mb-3 flex items-center gap-2">
                      <AlertCircle className="h-3 w-3" />
                      Critical Warning Signs:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {aiResult.warningSigns.map((sign, i) => (
                        <Badge key={i} variant="secondary" className="bg-accent/10 text-[10px] text-accent font-bold border-accent/20">
                          {sign}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}