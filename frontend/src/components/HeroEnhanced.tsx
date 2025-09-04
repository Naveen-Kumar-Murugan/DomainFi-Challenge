import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, TrendingUp, Zap, ArrowRight } from "lucide-react";

const HeroEnhanced = () => {
  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-mesh"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-rainbow/5 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        {/* Floating Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-card backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 mb-8 shadow-card animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-sm text-muted-foreground font-medium">AI-Powered Domain Intelligence</span>
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
        </div>

        <h1 className="text-7xl md:text-8xl font-black text-foreground mb-8 leading-tight font-poppins animate-fade-in-up">
          The Future of Domain{" "}
          <span className="bg-gradient-rainbow bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
            Investments
          </span>{" "}
          Here
        </h1>
        
        <p className="text-xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed font-inter animate-fade-in-up delay-200">
          Discover, auction, and invest in premium domains through our revolutionary AI-powered marketplace. 
          Bundle domains into ETFs and track market trends with unprecedented precision.
        </p>

        {/* Enhanced Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up delay-300">
          <Link to="/marketplace">
            <Button 
              size="lg" 
              className="group bg-gradient-button hover:bg-gradient-button-hover text-primary-foreground px-10 py-5 text-lg font-semibold rounded-2xl shadow-button hover:shadow-glow transition-all duration-300 hover:scale-105 font-inter"
            >
              <TrendingUp className="w-5 h-5 mr-3 group-hover:animate-scale-bounce" />
              Explore Marketplace
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/trends">
            <Button 
              size="lg" 
              variant="outline" 
              className="group border-2 border-primary/30 bg-background/50 backdrop-blur-sm text-primary hover:bg-gradient-button hover:text-primary-foreground hover:border-transparent px-10 py-5 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-button font-inter"
            >
              <Zap className="w-5 h-5 mr-3 group-hover:animate-scale-bounce" />
              View Trends
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 animate-fade-in-up delay-500">
          {[
            { value: "$2.8M+", label: "Total Volume" },
            { value: "1,247", label: "Active Investors" },
            { value: "2,847", label: "Domains Listed" }
          ].map((stat, index) => (
            <div key={index} className="group">
              <div className="bg-gradient-card backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-card hover:shadow-premium transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold text-primary mb-2 font-poppins">{stat.value}</div>
                <div className="text-muted-foreground font-medium font-inter">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroEnhanced;