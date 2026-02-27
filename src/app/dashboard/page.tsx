import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  Video, 
  User, 
  Activity, 
  FileText, 
  ChevronRight,
  Plus
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { HealthInsights } from "@/components/dashboard/HealthInsights";

export default function Dashboard() {
  const doctors = PlaceHolderImages.filter(img => img.id.startsWith('doctor-'));
  
  // Simulated current health data
  const currentMetrics = {
    heartRate: "72 BPM",
    bloodPressure: "120/80",
    weight: "165 lbs"
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Welcome back, <span className="gold-text">Alex</span></h1>
          <p className="text-muted-foreground">You have 2 consultations scheduled for today.</p>
        </div>
        <Link href="/appointments">
          <Button className="gold-gradient text-black font-bold gold-glow">
            <Plus className="mr-2 h-4 w-4" />
            Book New Appointment
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="glass border-primary/10 overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Upcoming Consultations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-primary/10">
                {[
                  { doctor: "Dr. Julianne Vane", time: "14:30 PM", type: "Cardiology", date: "Today" },
                  { doctor: "Dr. Robert Smith", time: "16:00 PM", type: "General Practice", date: "Today" },
                ].map((apt, idx) => (
                  <div key={idx} className="p-6 flex items-center justify-between hover:bg-primary/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden border border-primary/20">
                        <Image 
                          src={doctors[idx]?.imageUrl || "https://picsum.photos/seed/doc/100/100"} 
                          alt={apt.doctor} 
                          width={48} 
                          height={48} 
                          className="object-cover" 
                        />
                      </div>
                      <div>
                        <h4 className="font-bold">{apt.doctor}</h4>
                        <p className="text-xs text-muted-foreground">{apt.type} • {apt.time}</p>
                      </div>
                    </div>
                    <Link href="/consultation">
                      <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/10 text-primary">
                        <Video className="mr-2 h-4 w-4" />
                        Join Room
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass border-primary/10">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Health Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-background/50 border border-primary/5">
                  <span className="text-sm text-muted-foreground">Heart Rate</span>
                  <span className="font-bold text-primary">{currentMetrics.heartRate}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-background/50 border border-primary/5">
                  <span className="text-sm text-muted-foreground">Blood Pressure</span>
                  <span className="font-bold text-primary">{currentMetrics.bloodPressure}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-background/50 border border-primary/5">
                  <span className="text-sm text-muted-foreground">Weight</span>
                  <span className="font-bold text-primary">{currentMetrics.weight}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-primary/10">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Recent Prescriptions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Amoxicillin", date: "Oct 12, 2023" },
                  { name: "Lisinopril", date: "Sep 28, 2023" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-background/50 border border-primary/5">
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground">Refills available</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 text-primary">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <HealthInsights metrics={currentMetrics} />

          <Card className="glass border-primary/10">
            <CardHeader>
              <CardTitle className="text-lg">Specialists for You</CardTitle>
              <CardDescription>Based on your health history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {doctors.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-4 group cursor-pointer p-2 rounded-xl hover:bg-primary/5 transition-colors">
                  <div className="h-12 w-12 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all border border-primary/20">
                    <Image src={doc.imageUrl} alt={doc.description} width={48} height={48} className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold truncate">Dr. Specialist {idx + 1}</p>
                    <p className="text-[11px] text-muted-foreground">98% Match Rate</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="link" className="w-full text-primary text-xs">View All Specialists</Button>
            </CardContent>
          </Card>

          <Card className="gold-gradient text-black border-none gold-glow">
            <CardHeader>
              <CardTitle className="text-lg">Premium Care+</CardTitle>
              <CardDescription className="text-black/70">Unlimited virtual care for you and your family.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-black text-primary font-bold hover:bg-black/90">Upgrade Now</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
