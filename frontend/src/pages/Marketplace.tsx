import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NavigationEnhanced from "@/components/NavigationEnhanced";
import { Search, Filter, Clock, Users, TrendingUp, Gavel, Flame, Sparkles, Eye } from "lucide-react";
import { useReadContract } from 'wagmi';
import { AUCTION_CONTRACT_ADDRESS, AUCTION_ABI } from '@/constants/contracts';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All Auctions");

  // Fetch auctions from contract
  const { data: auctionsData, isLoading } = useReadContract({
    address: AUCTION_CONTRACT_ADDRESS,
    abi: AUCTION_ABI,
    functionName: 'getAllAuctions',
  });

  // Transform contract data to frontend format
  const auctions = (auctionsData || []).map((auction: any) => ({
    domain: auction.domainName,
    currentBid: `$${auction.currentBid.toString()}`,
    bids: auction.bidCount,
    timeLeft: `${Math.max(0, Math.floor((auction.endTime * 1000 - Date.now()) / 3600000))}h`,
    category: auction.category,
    categoryColor: "bg-gradient-to-r from-primary to-primary-glow", // Map category to color as needed
    status: auction.finalized ? "ended" : "active",
    growth: "+0.0%", // Placeholder, replace with AI output
    watchers: 0 // Placeholder, add watcher logic if needed
  }));

  return (
    <div className="min-h-screen bg-background font-inter overflow-x-hidden">
      <NavigationEnhanced />
      
      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none"></div>
      <div className="fixed top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-primary-glow/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <main className="pt-24 pb-12 px-6 relative z-10">
        <div className="container mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-card backdrop-blur-sm border border-border/50 rounded-full px-6 py-3 mb-8 shadow-card">
              <Gavel className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-sm text-muted-foreground font-medium">Live Marketplace</span>
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            </div>
            
            <h1 className="text-6xl font-black text-foreground mb-6 font-poppins">
              Domain <span className="bg-gradient-rainbow bg-clip-text text-transparent">Marketplace</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover and bid on premium domains with AI-powered insights and real-time market analysis.
            </p>
          </div>

          {/* Enhanced Filters */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search domains..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 bg-gradient-card backdrop-blur-sm border-border/50 rounded-xl shadow-card focus:shadow-premium transition-all duration-300 font-inter"
              />
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="pl-10 pr-4 py-4 w-48 bg-gradient-card backdrop-blur-sm border-border/50 rounded-xl shadow-card font-inter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Auctions">All Auctions</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="Hot">Hot 🔥</SelectItem>
                    <SelectItem value="Ending Soon">Ending Soon ⏰</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Enhanced Auction Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {auctions.map((auction, index) => (
              <Card key={index} className="group relative p-8 border-border/50 hover:border-primary/30 bg-gradient-card backdrop-blur-sm shadow-card hover:shadow-premium transition-all duration-500 hover:scale-[1.02] overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>

                <div className="relative z-10 space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold text-card-foreground font-poppins group-hover:text-primary transition-colors">
                          {auction.domain}
                        </h3>
                        <Sparkles className="w-5 h-5 text-primary-glow animate-pulse" />
                      </div>
                      
                      <div className="flex items-center gap-3 mb-4">
                        <Badge className={`${auction.categoryColor} text-white font-medium px-4 py-2 shadow-sm`}>
                          {auction.category === "Hot" && <Flame className="w-3 h-3 mr-1" />}
                          {auction.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-success text-sm font-semibold">
                          <TrendingUp className="w-3 h-3" />
                          {auction.growth}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-border/30">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                        <Users className="w-4 h-4" />
                      </div>
                      <div className="text-lg font-bold text-card-foreground">{auction.bids}</div>
                      <div className="text-xs text-muted-foreground">Bids</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-warning mb-1">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="text-lg font-bold text-warning">{auction.timeLeft}</div>
                      <div className="text-xs text-muted-foreground">Remaining</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                        <Eye className="w-4 h-4" />
                      </div>
                      <div className="text-lg font-bold text-card-foreground">{auction.watchers}</div>
                      <div className="text-xs text-muted-foreground">Watching</div>
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-2 font-inter">Current Bid</div>
                      <div className="text-4xl font-black bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent font-poppins">
                        {auction.currentBid}
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <Button className="flex-1 bg-gradient-button hover:bg-gradient-button-hover text-primary-foreground font-semibold py-4 rounded-xl shadow-button hover:shadow-glow transition-all duration-300 hover:scale-105 font-inter">
                        <Gavel className="w-4 h-4 mr-2" />
                        Place Bid
                      </Button>
                      <Button variant="outline" className="px-6 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground py-4 rounded-xl transition-all duration-300 hover:scale-105 font-inter">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="absolute top-4 right-4">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse shadow-glow"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Marketplace;