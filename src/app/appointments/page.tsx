"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Star, ShieldCheck, MapPin, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { toast } from "@/hooks/use-toast";

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const doctors = PlaceHolderImages.filter(img => img.id.startsWith('doctor-'));

  const handleBook = (doctorName: string) => {
    toast({
      title: "Appointment Request Sent",
      description: `Your request for Dr. ${doctorName} on ${date?.toLocaleDateString()} is being processed.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold font-headline mb-4">Book Your <span className="gold-text">Private Specialist</span></h1>
        <p className="text-muted-foreground text-lg">Select a specialist and choose your preferred consultation window.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Doctor List */}
        <div className="lg:col-span-8 space-y-6">
          {doctors.map((doc, idx) => (
            <Card key={idx} className="glass border-primary/10 overflow-hidden group hover:border-primary/40 transition-all duration-300">
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-48 h-64 md:h-auto">
                  <Image src={doc.imageUrl} alt={doc.description} fill className="object-cover" />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-primary text-black font-bold">TOP RATED</Badge>
                  </div>
                </div>
                <div className="flex-1 p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold">Dr. Specialist {idx + 1}</h3>
                        <ShieldCheck className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-primary text-sm font-medium uppercase tracking-widest">Cardiology Specialist</p>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                      <Star className="h-4 w-4 fill-primary" />
                      <span className="text-sm font-bold">4.9 (124 reviews)</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Expert in diagnostic cardiology and preventative heart health. Practicing for over 15 years in leading medical institutions.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      Remote & New York Office
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-4 w-4 text-primary" />
                      Available Today
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap gap-2">
                    {["10:00 AM", "11:30 AM", "14:00 PM", "16:30 PM"].map((time) => (
                      <Button key={time} variant="outline" size="sm" className="border-primary/20 hover:border-primary hover:text-primary transition-all">
                        {time}
                      </Button>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-primary/5 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-muted-foreground">Consultation Fee</span>
                      <p className="text-lg font-bold text-primary">$150.00</p>
                    </div>
                    <Button 
                      className="gold-gradient text-black font-bold px-8 group"
                      onClick={() => handleBook(`Specialist ${idx + 1}`)}
                    >
                      Book Appointment
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Right: Sticky Calendar/Filter */}
        <div className="lg:col-span-4">
          <div className="sticky top-32 space-y-6">
            <Card className="glass border-primary/10">
              <CardHeader>
                <CardTitle className="text-lg">Select Date</CardTitle>
                <CardDescription>Appointments are available for the next 30 days.</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center p-0 pb-6">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border-none"
                />
              </CardContent>
            </Card>

            <Card className="glass border-primary/10">
              <CardHeader>
                <CardTitle className="text-lg">Filter Specialists</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase">Specialization</p>
                  <div className="flex flex-wrap gap-2">
                    {["Cardiology", "Neurology", "Dermatology", "General"].map(cat => (
                      <Badge key={cat} variant="secondary" className="cursor-pointer hover:bg-primary/20 hover:text-primary">{cat}</Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase">Availability</p>
                  <div className="flex flex-wrap gap-2">
                    {["Morning", "Afternoon", "Evening"].map(time => (
                      <Badge key={time} variant="outline" className="cursor-pointer border-primary/20">{time}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}