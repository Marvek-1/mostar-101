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
    title: "Quantum Neural Interface Launch",
    description: "Revolutionary breakthrough in quantum-neural synchronization enables unprecedented AI-human collaboration.",
    category: "Product Launch",
    date: "2025-11-10",
    image: "/lovable-uploads/921f3ba2-a0ad-401c-9c33-566f0fae3618.png",
    tags: ["Quantum", "Neural", "AI"]
  },
  {
    id: "2",
    title: "Grid Expansion: 1000+ Nodes Active",
    description: "MoStar Industries neural grid now spans across 47 countries with over 1,000 active nodes.",
    category: "Network Update",
    date: "2025-11-08",
    image: "/lovable-uploads/921f3ba2-a0ad-401c-9c33-566f0fae3618.png",
    tags: ["Grid", "Network", "Expansion"]
  },
  {
    id: "3",
    title: "Cognitive Framework 3.0 Released",
    description: "Enhanced AI reasoning capabilities with 340% faster processing and improved decision-making algorithms.",
    category: "Software Release",
    date: "2025-11-05",
    image: "/lovable-uploads/921f3ba2-a0ad-401c-9c33-566f0fae3618.png",
    tags: ["AI", "Software", "Cognitive"]
  },
  {
    id: "4",
    title: "Security Protocol Upgrade",
    description: "Advanced quantum encryption now standard across all neural link communications.",
    category: "Security",
    date: "2025-11-01",
    image: "/lovable-uploads/921f3ba2-a0ad-401c-9c33-566f0fae3618.png",
    tags: ["Security", "Encryption", "Protocol"]
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
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background pointer-events-none" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Latest Updates
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay informed about our latest products, activities, and innovations
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
                    {/* Image */}
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

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-mostar-cyan transition-colors">
                        {news.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {news.description}
                      </p>

                      {/* Meta info */}
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
          
          {/* Navigation arrows */}
          <CarouselPrevious className="left-0 -translate-x-12 md:-translate-x-16 bg-mostar-cyan/10 border-mostar-cyan/30 hover:bg-mostar-cyan/20" />
          <CarouselNext className="right-0 translate-x-12 md:translate-x-16 bg-mostar-cyan/10 border-mostar-cyan/30 hover:bg-mostar-cyan/20" />
        </Carousel>

        {/* Pagination dots */}
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
