import { Card } from "@/components/ui/card";
import { Brain, TrendingUp, BarChart3 } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Auctions",
      description: "Smart bidding algorithms and real-time market analysis help you make informed decisions in our transparent auction system.",
      gradient: "from-primary to-primary-glow"
    },
    {
      icon: TrendingUp,
      title: "Domain ETF Innovation",
      description: "Bundle premium domains into diversified portfolios and trade them like traditional ETFs with fractional ownership.",
      gradient: "from-primary to-primary-glow"
    },
    {
      icon: BarChart3,
      title: "Market Intelligence",
      description: "Advanced analytics and trend forecasting powered by machine learning to identify the next big domain opportunities.",
      gradient: "from-primary to-primary-glow"
    }
  ];

  return (
    <section className="py-20 px-6 bg-secondary/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-foreground mb-4">
            Why Choose <span className="text-primary">DomainAI</span>?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 text-center border-border hover:shadow-lg transition-all duration-300 bg-card">
              <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center`}>
                <feature.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;