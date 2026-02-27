"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  MessageSquare, 
  Settings, 
  Users,
  Maximize2
} from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

export default function ConsultationPage() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const doctorImage = PlaceHolderImages.find(img => img.id === 'doctor-1');

  return (
    <div className="fixed inset-0 pt-20 bg-black flex flex-col z-40">
      {/* Video Grid */}
      <div className="flex-1 relative p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Doctor View */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-primary/20 bg-card group">
          <Image 
            src={doctorImage?.imageUrl || ""} 
            alt="Doctor" 
            fill 
            className="object-cover"
          />
          <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-xs font-medium text-primary flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Live: Dr. Julianne Vane
          </div>
          <div className="absolute bottom-4 left-4 glass px-3 py-1 rounded-full text-xs text-white">
            Specialist Cardiology
          </div>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <Maximize2 className="text-white h-8 w-8" />
          </div>
        </div>

        {/* Patient View (Self) */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-white/10 bg-muted">
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            {isVideoOff ? (
              <div className="text-center space-y-2">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <p className="text-primary font-medium">Your camera is off</p>
              </div>
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                 <p className="text-muted-foreground italic">Your preview would appear here</p>
              </div>
            )}
          </div>
          <div className="absolute bottom-4 left-4 glass px-3 py-1 rounded-full text-xs text-white">
            You (Patient)
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="h-24 glass border-t border-primary/10 flex items-center justify-center px-8 gap-4">
        <div className="flex items-center gap-4 bg-background/50 p-2 rounded-2xl border border-primary/10">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMuted(!isMuted)}
            className={cn("h-12 w-12 rounded-xl transition-all", isMuted ? "bg-accent/20 text-accent hover:bg-accent/30" : "hover:bg-primary/10 text-primary")}
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={cn("h-12 w-12 rounded-xl transition-all", isVideoOff ? "bg-accent/20 text-accent hover:bg-accent/30" : "hover:bg-primary/10 text-primary")}
          >
            {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
          </Button>
        </div>

        <Button className="h-14 w-14 rounded-2xl bg-accent hover:bg-accent/90 text-white gold-glow">
          <PhoneOff className="h-6 w-6" />
        </Button>

        <div className="flex items-center gap-4 bg-background/50 p-2 rounded-2xl border border-primary/10">
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl hover:bg-primary/10 text-primary">
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl hover:bg-primary/10 text-primary">
            <Users className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl hover:bg-primary/10 text-primary">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function User(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}