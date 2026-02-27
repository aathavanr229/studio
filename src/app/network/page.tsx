
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Building2, Phone } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function NetworkPage() {
  const hospitals = PlaceHolderImages.filter(img => img.id.startsWith('hosp-cbe-'));

  const hospitalDetails = [
    {
      name: "MediGold Central Coimbatore",
      location: "Avinashi Road, Coimbatore",
      specialty: "Multispecialty & Trauma",
      rating: "4.9",
      contact: "+91 422 123 4567"
    },
    {
      name: "Gold Standard Cardiac Center",
      location: "RS Puram, Coimbatore",
      specialty: "Advanced Cardiology",
      rating: "4.8",
      contact: "+91 422 234 5678"
    },
    {
      name: "MediGold Wellness Clinic",
      location: "Race Course, Coimbatore",
      specialty: "Preventative Healthcare",
      rating: "5.0",
      contact: "+91 422 345 6789"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold font-headline">Our <span className="gold-text">Premium Network</span></h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore our hand-picked network of elite medical facilities in Coimbatore, ensuring the highest standard of care.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hospitals.map((hosp, idx) => (
          <Card key={idx} className="glass border-primary/10 overflow-hidden group hover:border-primary/40 transition-all duration-300">
            <div className="relative h-64 w-full">
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
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold">{hospitalDetails[idx]?.name}</CardTitle>
                <div className="flex items-center gap-1 text-primary">
                  <Star className="h-4 w-4 fill-primary" />
                  <span className="text-xs font-bold">{hospitalDetails[idx]?.rating}</span>
                </div>
              </div>
              <CardDescription className="flex items-center gap-1 text-xs">
                <Building2 className="h-3 w-3" />
                {hospitalDetails[idx]?.specialty}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                {hospitalDetails[idx]?.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                {hospitalDetails[idx]?.contact}
              </div>
              <div className="pt-4 border-t border-primary/5">
                <p className="text-xs text-muted-foreground italic">
                  Fully integrated with MediGold digital records and consultation systems.
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
