import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, Wallet } from "lucide-react";
import { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useToast } from "@/components/ui/toaster";

const NavigationEnhanced = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "ETFs", path: "/etfs" },
    { name: "Trends", path: "/trends" },
  ];

  // Wallet connect logic
  const { address, isConnected } = useAccount();
  const { connectors, connectAsync, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { toast } = useToast();
  const [connecting, setConnecting] = useState(false);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-background/80 backdrop-blur-xl shadow-premium border-b border-border/50' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-button rounded-xl flex items-center justify-center shadow-button transition-all duration-300 group-hover:shadow-glow group-hover:scale-110">
                <span className="text-primary-foreground font-bold text-xl">D</span>
                <div className="absolute inset-0 bg-gradient-rainbow rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-primary-glow animate-pulse" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent font-poppins">
              DomainAI
            </span>
          </Link>

          {/* Enhanced Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-sm font-medium transition-all duration-300 hover:text-primary group font-inter ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-2 left-0 h-0.5 bg-gradient-primary transition-all duration-300 ${
                  location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Enhanced Connect Wallet Button */}
          <div>
            {isConnected ? (
              <Button
                className="bg-gradient-button hover:bg-gradient-button-hover text-primary-foreground px-6 py-3 rounded-xl font-medium shadow-button hover:shadow-glow transition-all duration-300 hover:scale-105 font-inter"
                onClick={() => disconnect()}
              >
                <Wallet className="w-4 h-4 mr-2" />
                {address.slice(0, 6)}...{address.slice(-4)} (Disconnect)
              </Button>
            ) : (
              <Button
                className="bg-gradient-button hover:bg-gradient-button-hover text-primary-foreground px-6 py-3 rounded-xl font-medium shadow-button hover:shadow-glow transition-all duration-300 hover:scale-105 font-inter"
                onClick={async () => {
                  setConnecting(true);
                  try {
                    const metamask = connectors?.find((c) => c.id === "metaMask");
                    const connector = metamask || connectors?.[0];
                    if (!connector) {
                      setConnecting(false);
                      return;
                    }
                    await connectAsync({ connector });
                  } catch (err: any) {
                    toast({
                      title: "Wallet Connection Failed",
                      description: err?.message || "User rejected the connection request.",
                      variant: "destructive",
                    });
                  }
                  setConnecting(false);
                }}
                disabled={connecting || status === "pending"}
              >
                <Wallet className="w-4 h-4 mr-2" />
                {connecting || status === "pending" ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationEnhanced;