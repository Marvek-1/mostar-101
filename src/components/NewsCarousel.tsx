import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Calendar, Tag } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  image: string;
  tags: string[];
}

const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "$AFSL Blockchain for AFRO OSL",
    description: "4 smart contracts, concept note for institutional adoption, tokenized procurement architecture for WHO AFRO logistics transparency.",
    category: "Blockchain",
    date: "2026-03-01",
    image: "/lovable-uploads/921f3ba2-a0ad-401c-9c33-566f0fae3618.png",
    tags: ["Blockchain", "$AFSL"]
  },
  {
    id: "2",
    title: "QR Code Shipment Sharing Deployed",
    description: "Dubai-style document access for AFRO OSL — QR code shipment sharing deployed for Nairobi and Dakar hubs.",
    category: "WHO",
    date: "2026-03-01",
    image: "/lovable-uploads/921f3ba2-a0ad-401c-9c33-566f0fae3618.png",
    tags: ["WHO", "Logistics"]
  },
  {
    id: "3",
    title: "Signal Tracker — WHO AFRO Headline",
    description: "Signal tracker becomes the headline feature on the WHO AFRO website — institutional validation at the highest level.",
    category: "Headline",
    date: "2026-02-14",
    image: "/lovable-uploads/921f3ba2-a0ad-401c-9c33-566f0fae3618.png",
    tags: ["WHO AFRO", "Recognition"]
  },
  {
    id: "4",
    title: "Chikungunya Detected 9hrs Ahead of EIOS",
    description: "Chikungunya detected in Seychelles 9 hours ahead of EIOS. Cyclone Gezani flagged before 40 deaths in Madagascar.",
    category: "Detection",
    date: "2026-02-14",
    image: "/lovable-uploads/921f3ba2-a0ad-401c-9c33-566f0fae3618.png",
    tags: ["Detection", "EIOS"]
  },
  {
    id: "5",
    title: "AFRO OSL Presented at Dakar 2026",
    description: "Full architecture presented at Dakar 2026 — OR/SR workflows, BMS sync, Tanzania pilot two-section model.",
    category: "Dakar",
    date: "2026-02-11",
    image: "/lovable-uploads/921f3ba2-a0ad-401c-9c33-566f0fae3618.png",
    tags: ["Dakar", "OSL"]
  },
  {
    id: "6",
    title: "TruthEngine Multi-Model Synthesis LIVE",
    description: "Truth Score 0.87, Pass Rate 94%, Ubuntu Coherence 0.88. Measurable, reproducible, publishable.",
    category: "Engine Launch",
    date: "2026-02-11",
    image: "/lovable-uploads/921f3ba2-a0ad-401c-9c33-566f0fae3618.png",
    tags: ["TruthEngine", "Multi-Model"]
  },
  {
    id: "7",
    title: "NOODL + Nairobi Pilot Covenant Hardened",
    description: "NOODL open data license integrated. Green Book governance analysis completed. Nairobi Pilot Covenant hardened.",
    category: "Sovereignty",
    date: "2026-02-09",
    image: "/lovable-uploads/921f3ba2-a0ad-401c-9c33-566f0fae3618.png",
    tags: ["Sovereignty", "NOODL"]
  },
  {
    id: "8",
    title: "Neo4j Reaches 197,000+ Nodes",
    description: "9,700+ cross-domain relationships mapped. Ibibio 196 words + 222 audio files integrated.",
    category: "Grid",
    date: "2026-01-15",
    image: "/lovable-uploads/921f3ba2-a0ad-401c-9c33-566f0fae3618.png",
    tags: ["Grid", "Neo4j"]
  },
  {
    id: "9",
    title: "Four-Stage Pipeline Finalized",
    description: "Dashboard → LPI → DeepCAL → AfroTrack with feedback loop. Complete intelligence pipeline operational.",
    category: "Architecture",
    date: "2025-12-15",
    image: "/lovable-uploads/921f3ba2-a0ad-401c-9c33-566f0fae3618.png",
    tags: ["Pipeline", "Architecture"]
  },
  {
    id: "10",
    title: "RAD-X-FLB Full 8-Layer Architecture",
    description: "38 FastAPI endpoints, Ifá Odu Engine, SANKOFA Protocol, hyper-spine dashboard. 19 validation tests across 5 domains.",
    category: "RAD-X",
    date: "2025-09-01",
    image: "/lovable-uploads/921f3ba2-a0ad-401c-9c33-566f0fae3618.png",
    tags: ["RAD-X", "Architecture"]
  }
];

export const NewsCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Auto-play functionality
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background pointer-events-none" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Latest Updates
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay informed about our latest breakthroughs in African AI sovereignty
          </p>
        </div>

        <Carousel
          setApi={setApi}
          className="w-full max-w-6xl mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {mockNews.map((news) => (
              <CarouselItem key={news.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="glassmorphism border-mostar-cyan/20 hover:border-mostar-cyan/40 transition-all duration-300 group h-full">
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                      <Badge className="absolute top-4 right-4 bg-mostar-cyan/20 text-mostar-cyan border-mostar-cyan/30">
                        {news.category}
                      </Badge>
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-mostar-cyan transition-colors">
                        {news.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {news.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(news.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Tag className="w-3 h-3 text-mostar-cyan" />
                          <span className="text-xs text-mostar-cyan">{news.tags[0]}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselPrevious className="left-0 -translate-x-12 md:-translate-x-16 bg-mostar-cyan/10 border-mostar-cyan/30 hover:bg-mostar-cyan/20" />
          <CarouselNext className="right-0 translate-x-12 md:translate-x-16 bg-mostar-cyan/10 border-mostar-cyan/30 hover:bg-mostar-cyan/20" />
        </Carousel>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current
                  ? "w-8 bg-mostar-cyan"
                  : "w-2 bg-mostar-cyan/30 hover:bg-mostar-cyan/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
