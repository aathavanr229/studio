import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  Video, 
  MessageSquare, 
  BrainCircuit, 
  Calendar, 
  ChevronRight,
  Star
} from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { FloatingChat } from "@/components/ai/FloatingChat";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-medical');

  return (
    <div className="flex flex-col gap-24 pb-24 relative">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage?.imageUrl || ""}
            alt="Premium Medical Care"
            fill
            className="object-cover opacity-30 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase">
              <Star className="h-3 w-3 fill-primary" />
              The Gold Standard of Telemedicine
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-headline leading-tight">
              Elite Healthcare <br />
              <span className="gold-text">Delivered Instantly.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              Experience a premium medical ecosystem. Connect with world-class specialists via HD video, manage appointments, and use AI-driven diagnostics from the comfort of your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/auth">
                <Button size="lg" className="gold-gradient text-black font-bold h-14 px-8 rounded-xl gold-glow hover:opacity-90">
                  Book Consultation
                </Button>
              </Link>
              <Link href="/symptom-checker">
                <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5 h-14 px-8 rounded-xl group">
                  AI Symptom Checker
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Premium Platform Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our technology is built to provide security, speed, and precision in every medical interaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Video Consultations",
              desc: "Crystal-clear HD video calls with built-in medical tools for seamless virtual checkups.",
              icon: <Video className="h-6 w-6" />,
            },
            {
              title: "AI Symptom Checker",
              desc: "Advanced neural networks providing preliminary medical guidance in seconds.",
              icon: <BrainCircuit className="h-6 w-6" />,
            },
            {
              title: "Secure Messaging",
              desc: "Encrypted real-time chat with your healthcare providers for prescriptions and follow-ups.",
              icon: <MessageSquare className="h-6 w-6" />,
            },
            {
              title: "Smart Scheduling",
              desc: "Effortless appointment booking with synchronized calendars and instant reminders.",
              icon: <Calendar className="h-6 w-6" />,
            },
            {
              title: "Verified Doctors",
              desc: "Access a curated network of elite specialists, each rigorously vetted for quality.",
              icon: <ShieldCheck className="h-6 w-6" />,
            },
            {
              title: "Premium Experience",
              desc: "A focused, luxury environment designed to prioritize your peace of mind.",
              icon: <Star className="h-6 w-6" />,
            },
          ].map((feature, idx) => (
            <div key={idx} className="glass p-8 rounded-2xl group hover:border-primary/40 transition-all duration-300">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 w-fit mb-6 group-hover:bg-primary group-hover:text-black transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-primary/5 py-24">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <div className="max-w-3xl space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold font-headline leading-tight">
              Ready to experience <br /> 
              <span className="gold-text">Modern Medical Luxury?</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of satisfied patients who have upgraded their healthcare experience to the MediGold standard.
            </p>
            <Link href="/auth">
              <Button size="lg" className="gold-gradient text-black font-bold h-16 px-12 text-lg rounded-2xl gold-glow">
                Create Your Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Chatbot */}
      <FloatingChat />
    </div>
  );
}
