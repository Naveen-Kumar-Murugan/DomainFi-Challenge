import { Card } from "@/components/ui/card";
import { Brain, TrendingUp, BarChart3, Sparkles, Zap, Target } from "lucide-react";

const FeaturesEnhanced = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Auctions",
      description: "Smart bidding algorithms and real-time market analysis help you make informed decisions in our transparent auction system.",
      gradient: "from-primary via-primary-glow to-primary",
      accentIcon: Sparkles,
      stats: "99.2% Accuracy"
    },
    {
      icon: TrendingUp,
      title: "Domain ETF Innovation", 
      description: "Bundle premium domains into diversified portfolios and trade them like traditional ETFs with fractional ownership.",
      gradient: "from-success via-success to-primary-glow",
      accentIcon: Target,
      stats: "$2.8M Volume"
    },
    {
      icon: BarChart3,
      title: "Market Intelligence",
      description: "Advanced analytics and trend forecasting powered by machine learning to identify the next big domain opportunities.",
      gradient: "from-warning via-primary-glow to-primary", 
      accentIcon: Zap,
      stats: "24/7 Tracking"
    }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-glow/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-card backdrop-blur-sm border border-border/50 rounded-full px-6 py-3 mb-8 shadow-card">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm text-muted-foreground font-medium font-inter">Why Choose Us</span>
          </div>
          
          <h2 className="text-6xl font-black text-foreground mb-6 font-poppins">
            Why Choose <span className="bg-gradient-rainbow bg-clip-text text-transparent">DomainAI</span>?
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
            Experience the future of domain investing with cutting-edge AI technology and innovative financial instruments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group relative p-8 text-center border-border/50 hover:border-primary/20 bg-gradient-card backdrop-blur-sm shadow-card hover:shadow-premium transition-all duration-500 hover:scale-105 overflow-hidden"
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
              </div>

              <div className="relative z-10">
                {/* Icon Container */}
                <div className="relative mb-8">
                  <div className={`w-24 h-24 mx-auto bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center shadow-button group-hover:shadow-glow transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <feature.icon className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <feature.accentIcon className="w-6 h-6 text-primary-glow animate-pulse" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-2 font-inter">
                    {feature.stats}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-card-foreground mb-4 font-poppins group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed font-inter">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesEnhanced;