
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Building2, Phone, Globe, ExternalLink } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

export default function NetworkPage() {
  const hospitals = PlaceHolderImages.filter(img => img.id.startsWith('hosp-cbe-'));

  const hospitalDetails = [
    {
      name: "KG Hospital & Post Graduate Institute",
      location: "Arts College Road, Coimbatore",
      specialty: "Multi-Speciality & Trauma Care",
      rating: "4.8",
      contact: "+91 422 221 2121",
      website: "https://www.kghospital.com/"
    },
    {
      name: "GKNM Hospital",
      location: "P.N. Palayam, Coimbatore",
      specialty: "Advanced Cardiology & Women Care",
      rating: "4.7",
      contact: "+91 422 430 5000",
      website: "https://www.gknmhospital.com/"
    },
    {
      name: "KMCH (Kovai Medical Center)",
      location: "Avinashi Road, Coimbatore",
      specialty: "Multi-Disciplinary Tertiary Care",
      rating: "4.9",
      contact: "+91 422 432 3000",
      website: "https://www.kmchhospitals.com/"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold font-headline">Our <span className="gold-text">Premium Network</span></h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Connect with the most prestigious medical institutions in Coimbatore, fully integrated with your MediGold account.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hospitals.map((hosp, idx) => (
          <Card key={idx} className="glass border-primary/10 overflow-hidden group hover:border-primary/40 transition-all duration-300 flex flex-col">
            <div className="relative h-64 w-full shrink-0">
              <Image 
                src={hosp.imageUrl} 
                alt={hosp.description} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110" 
                data-ai-hint={hosp.imageHint}
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary text-black font-bold">PREMIUM PARTNER</Badge>
              </div>
            </div>
            <CardHeader className="space-y-1">
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="text-xl font-bold leading-tight">{hospitalDetails[idx]?.name}</CardTitle>
                <div className="flex items-center gap-1 text-primary shrink-0">
                  <Star className="h-4 w-4 fill-primary" />
                  <span className="text-xs font-bold">{hospitalDetails[idx]?.rating}</span>
                </div>
              </div>
              <CardDescription className="flex items-center gap-1 text-xs">
                <Building2 className="h-3 w-3" />
                {hospitalDetails[idx]?.specialty}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow">
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{hospitalDetails[idx]?.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <span>{hospitalDetails[idx]?.contact}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-primary group/link">
                  <Globe className="h-4 w-4 shrink-0" />
                  <Link 
                    href={hospitalDetails[idx]?.website || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline font-medium flex items-center gap-1"
                  >
                    Official Website
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>
              
              <div className="pt-6 mt-auto border-t border-primary/5">
                <Button variant="outline" className="w-full border-primary/20 hover:border-primary hover:text-primary transition-all rounded-xl" asChild>
                  <Link href={hospitalDetails[idx]?.website || "#"} target="_blank">
                    View Facility Details
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-20 glass p-8 rounded-3xl border-primary/20 text-center max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">Direct Integration</h3>
        <p className="text-muted-foreground mb-6">
          All hospitals in our network share diagnostic results directly to your MediGold dashboard securely via 256-bit encryption. No more carrying paper files.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Badge variant="outline" className="px-4 py-2 border-primary/20">Digital Records</Badge>
          <Badge variant="outline" className="px-4 py-2 border-primary/20">Priority Booking</Badge>
          <Badge variant="outline" className="px-4 py-2 border-primary/20">Direct Billing</Badge>
        </div>
      </div>
    </div>
  );
}
