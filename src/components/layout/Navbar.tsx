"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Stethoscope, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                <Stethoscope className="h-8 w-8 text-primary" />
              </div>
              <span className="text-2xl font-bold font-headline gold-text tracking-tighter">
                MediGold
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
            <Link href="/appointments" className="text-sm font-medium hover:text-primary transition-colors">Appointments</Link>
            <Link href="/symptom-checker" className="text-sm font-medium hover:text-primary transition-colors">AI Checker</Link>
            <Link href="/consultation" className="text-sm font-medium hover:text-primary transition-colors">Consult</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/auth">
              <Button variant="ghost" className="text-primary hover:bg-primary/10">Log In</Button>
            </Link>
            <Link href="/auth">
              <Button className="gold-gradient gold-glow text-black font-semibold hover:opacity-90">Join Now</Button>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-primary p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("md:hidden glass border-t border-primary/10 transition-all duration-300 overflow-hidden", isOpen ? "max-h-screen" : "max-h-0")}>
        <div className="px-4 pt-4 pb-8 space-y-4">
          <Link href="/dashboard" className="block text-lg font-medium py-2">Dashboard</Link>
          <Link href="/appointments" className="block text-lg font-medium py-2">Appointments</Link>
          <Link href="/symptom-checker" className="block text-lg font-medium py-2">AI Checker</Link>
          <Link href="/auth" className="block">
            <Button className="w-full gold-gradient text-black font-semibold">Join Now</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}