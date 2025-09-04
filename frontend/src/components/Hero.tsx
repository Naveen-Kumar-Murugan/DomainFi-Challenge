import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="container mx-auto text-center">
        <h1 className="text-6xl font-bold text-foreground mb-6 leading-tight">
          The Future of Domain{" "}
          <span className="text-primary">Investments</span>{" "}
          Here
        </h1>
        
        <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
          Discover, auction, and invest in premium domains through our AI-powered marketplace. 
          Bundle domains into ETFs and track market trends with precision.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/marketplace">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Explore Marketplace
            </Button>
          </Link>
          <Link to="/trends">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-medium rounded-lg transition-all"
            >
              View Trends
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;