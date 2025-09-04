import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, Clock, Users, Gavel } from "lucide-react";

const FeaturedDomainsEnhanced = () => {
  const domains = [
    {
      name: "TechStartup.com",
      description: "Premium tech domain",
      price: "$25,000",
      category: "Tech",
      categoryColor: "bg-gradient-to-r from-primary to-primary-glow",
      bids: 23,
      timeLeft: "2h 34m",
      growth: "+15.2%",
      rarity: "Ultra Rare"
    },
    {
      name: "CryptoExchange.io",
      description: "Blockchain focused domain",
      price: "$45,000",
      category: "Crypto",
      categoryColor: "bg-gradient-to-r from-warning to-yellow-400",
      bids: 41,
      timeLeft: "5h 12m",
      growth: "+28.7%",
      rarity: "Legendary"
    },
    {
      name: "AIRevolution.net",
      description: "AI industry domain",
      price: "$35,000",
      category: "AI",
      categoryColor: "bg-gradient-to-r from-success to-emerald-400",
      bids: 18,
      timeLeft: "1d 3h",
      growth: "+22.3%",
      rarity: "Epic"
    }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-80 h-80 bg-primary-glow/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-card backdrop-blur-sm border border-border/50 rounded-full px-6 py-3 mb-8 shadow-card">
            <Gavel className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm text-muted-foreground font-medium font-inter">Live Auctions</span>
          </div>

          <h2 className="text-6xl font-black text-foreground mb-6 font-poppins">
            Featured <span className="bg-gradient-rainbow bg-clip-text text-transparent">Domains</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
            Discover premium domains with high investment potential, powered by AI market analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {domains.map((domain, index) => (
            <Card 
              key={index} 
              className="group relative p-6 border-border/50 hover:border-primary/30 bg-gradient-card backdrop-blur-sm shadow-card hover:shadow-premium transition-all duration-500 hover:scale-105 overflow-hidden"
            >
              {/* Animated Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              </div>

              <div className="relative z-10 space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-xl font-bold text-card-foreground font-poppins group-hover:text-primary transition-colors">
                        {domain.name}
                      </h3>
                      <Sparkles className="w-4 h-4 text-primary-glow animate-pulse" />
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`${domain.categoryColor} text-white font-medium px-3 py-1 shadow-sm`}>
                        {domain.category}
                      </Badge>
                      <div className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-full">
                        {domain.rarity}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm font-inter">
                      {domain.description}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-success text-sm font-semibold mb-1">
                      <TrendingUp className="w-3 h-3" />
                      {domain.growth}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-border/30">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground font-inter">{domain.bids} bids</span>
                  </div>
                  <div className="flex items-center gap-2 justify-end">
                    <Clock className="w-4 h-4 text-warning" />
                    <span className="text-sm text-warning font-medium font-inter">{domain.timeLeft}</span>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1 font-inter">Current Bid</div>
                    <div className="text-3xl font-black bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent font-poppins">
                      {domain.price}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-button hover:bg-gradient-button-hover text-primary-foreground font-semibold py-3 rounded-xl shadow-button hover:shadow-glow transition-all duration-300 hover:scale-105 group-hover:animate-pulse-glow font-inter">
                    <Gavel className="w-4 h-4 mr-2" />
                    Place Bid
                  </Button>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button 
            size="lg"
            variant="outline" 
            className="bg-background/50 backdrop-blur-sm border-primary/30 text-primary hover:bg-gradient-button hover:text-primary-foreground hover:border-transparent px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-button font-inter"
          >
            View All Auctions
            <TrendingUp className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDomainsEnhanced;