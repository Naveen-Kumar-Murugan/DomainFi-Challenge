import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import NavigationEnhanced from "@/components/NavigationEnhanced";
import { Home, ArrowLeft, Sparkles } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background font-inter overflow-x-hidden">
      <NavigationEnhanced />
      
      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none"></div>
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-primary-glow/10 rounded-full blur-3xl pointer-events-none animate-pulse delay-1000"></div>
      
      <div className="flex items-center justify-center min-h-screen pt-24 relative z-10">
        <div className="text-center space-y-8 animate-fade-in-up">
          {/* 404 Display */}
          <div className="relative">
            <h1 className="text-9xl font-black bg-gradient-rainbow bg-clip-text text-transparent font-poppins animate-float">
              404
            </h1>
            <div className="absolute -top-4 -right-4">
              <Sparkles className="w-12 h-12 text-primary-glow animate-pulse" />
            </div>
          </div>
          
          {/* Message */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground font-poppins">
              Oops! Page Not Found
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto leading-relaxed font-inter">
              The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              onClick={() => window.location.href = "/"}
              className="group bg-gradient-button hover:bg-gradient-button-hover text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl shadow-button hover:shadow-glow transition-all duration-300 hover:scale-105 font-inter"
            >
              <Home className="w-5 h-5 mr-3 group-hover:animate-scale-bounce" />
              Back to Home
            </Button>
            
            <Button 
              onClick={() => window.history.back()}
              variant="outline"
              className="group border-2 border-primary/30 bg-background/50 backdrop-blur-sm text-primary hover:bg-gradient-button hover:text-primary-foreground hover:border-transparent px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-button font-inter"
            >
              <ArrowLeft className="w-5 h-5 mr-3 group-hover:animate-scale-bounce" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
