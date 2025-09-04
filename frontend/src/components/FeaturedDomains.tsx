import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FeaturedDomains = () => {
  const domains = [
    {
      name: "TechStartup.com",
      description: "Premium tech domain",
      price: "$25,000",
      category: "Tech",
      categoryColor: "bg-primary"
    },
    {
      name: "CryptoExchange.io",
      description: "Blockchain focused domain",
      price: "$45,000",
      category: "Crypto",
      categoryColor: "bg-warning"
    },
    {
      name: "AIRevolution.net",
      description: "AI industry domain",
      price: "$35,000",
      category: "AI",
      categoryColor: "bg-success"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-foreground mb-4">
            Featured <span className="text-primary">Domains</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {domains.map((domain, index) => (
            <Card key={index} className="p-6 border-border hover:shadow-lg transition-all duration-300 bg-card">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-card-foreground">
                    {domain.name}
                  </h3>
                  <Badge className={`${domain.categoryColor} text-white`}>
                    {domain.category}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground">
                  {domain.description}
                </p>
                
                <div className="flex items-center justify-between pt-4">
                  <span className="text-2xl font-bold text-primary">
                    {domain.price}
                  </span>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Bid Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDomains;