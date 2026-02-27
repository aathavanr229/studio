import { Stethoscope } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-black/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold gold-text">MediGold</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Premium healthcare services delivered with gold standard precision and care.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-primary">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/consultation" className="hover:text-primary transition-colors">Video Consultation</Link></li>
              <li><Link href="/symptom-checker" className="hover:text-primary transition-colors">AI Symptom Checker</Link></li>
              <li><Link href="/appointments" className="hover:text-primary transition-colors">Specialist Booking</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-primary">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-primary">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">Subscribe for medical updates.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-card border border-primary/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary w-full"
              />
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-primary/5 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MediGold Telemedicine. All rights reserved.
        </div>
      </div>
    </footer>
  );
}