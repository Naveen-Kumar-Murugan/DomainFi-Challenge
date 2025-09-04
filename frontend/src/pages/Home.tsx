import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useState, useEffect } from "react";

console.log("Navigation rendered");

const Navigation = () => {
  const location = useLocation();
  const { address, isConnected } = useAccount();
  const { connectors, connectAsync, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const [connecting, setConnecting] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    setForceUpdate((v) => v + 1);
  }, [location.pathname]);

  console.log("Connectors:", connectors);
  console.log("Account address:", address);
  console.log("Is connected:", isConnected);
  console.log("Connect status:", status);
  console.log("Connect error:", error);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "ETFs", path: "/etfs" },
    { name: "Trends", path: "/trends" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">D</span>
            </div>
            <span className="text-xl font-bold text-foreground">DomainAI</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Connect Wallet Button */}
          <div key={forceUpdate}>
            {/* Debug button to check click events */}
            <Button
              className="bg-warning text-warning-foreground px-2 py-1 rounded-lg font-medium mr-2"
              onClick={() => console.log("Test button clicked")}
            >
              Test Click
            </Button>
            {isConnected ? (
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium"
                onClick={() => {
                  console.log("Disconnecting wallet");
                  disconnect();
                }}
              >
                {address.slice(0, 6)}...{address.slice(-4)} (Disconnect)
              </Button>
            ) : (
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium"
                onClick={async () => {
                  setConnecting(true);
                  try {
                    const metamask = connectors?.find((c) => c.id === "metaMask");
                    const connector = metamask || connectors?.[0];
                    console.log("Attempting to connect with connector:", connector);
                    if (!connector) {
                      console.log("No connector available");
                      setConnecting(false);
                      return;
                    }
                    await connectAsync({ connector });
                    console.log("Connected!");
                  } catch (err) {
                    console.log("Connection error:", err);
                  }
                  setConnecting(false);
                }}
                disabled={connecting || status === "pending"}
              >
                {connecting || status === "pending" ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
            {error && <div className="text-xs text-red-500 mt-2">{error.message}</div>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;