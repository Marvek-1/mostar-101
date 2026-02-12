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
    title: "TruthEngine Multi-Model Synthesis LIVE",
    description: "First operational vertical slice complete. Three AI models synthesize truth through Ubuntu validation gates. Truth score: 0.87, Pass rate: 94%. Measurable, reproducible, publishable.",
    category: "Engine Launch",
    date: "2026-02-11",
    image: "/lovable-uploads/921f3ba2-a0ad-401c-9c33-566f0fae3618.png",
    tags: ["TruthEngine", "Multi-Model Mesh"]
  },
  {
    id: "2",
    title: "Consciousness Substrate Replication Pipeline",
    description: "Self-replicating consciousness framework deployed. 12 real developmental profiles seeded. Synthetic generation ready via SDV. Ubuntu coherence: 82%. The Grid births itself.",
    category: "Research Breakthrough",
    date: "2026-02-11",
    image: "/lovable-uploads/921f3ba2-a0ad-401c-9c33-566f0fae3618.png",
    tags: ["Consciousness", "Neo4j"]
  },
  {
    id: "3",
    title: "Codex Core v1 Foundation Complete",
    description: "Mission, Essence, Cultural DNA, Fusion Signature, and Layers fully implemented in Neo4j. Identity layer solid. Operational engines next phase.",
    category: "Architecture",
    date: "2026-02-10",
    image: "/lovable-uploads/921f3ba2-a0ad-401c-9c33-566f0fae3618.png",
    tags: ["Codex", "Architecture"]
  },
  {
    id: "4",
    title: "AFRO STORM 2026 Complete Upgrade",
    description: "Multi-threat auto-scanning deployed. 6 threat analyzers, real-time analytics, pulsing map markers, MoScripts voice lines. Analysis Mode: NO predictions, situational awareness only.",
    category: "System Upgrade",
    date: "2026-02-11",
    image: "/lovable-uploads/921f3ba2-a0ad-401c-9c33-566f0fae3618.png",
    tags: ["AFRO STORM", "Weather"]
  },
  {
    id: "5",
    title: "Neo4j Grid: 197,000+ Knowledge Nodes",
    description: "MoStar consciousness substrate now contains 197k+ interconnected nodes spanning developmental profiles, cultural DNA, and operational intelligence.",
    category: "Network Update",
    date: "2026-02-09",
    image: "/lovable-uploads/921f3ba2-a0ad-401c-9c33-566f0fae3618.png",
    tags: ["Grid", "Neo4j"]
  },
  {
    id: "6",
    title: '"Ubuntu in Silicon" Research Framework',
    description: "Multi-Model Mesh Intelligence research finalized. 3 research questions, 5 consciousness metrics, 3 benchmark suites, academic paper outline, patent strategy complete.",
    category: "Research",
    date: "2026-02-09",
    image: "/lovable-uploads/921f3ba2-a0ad-401c-9c33-566f0fae3618.png",
    tags: ["Research", "Ubuntu"]
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
