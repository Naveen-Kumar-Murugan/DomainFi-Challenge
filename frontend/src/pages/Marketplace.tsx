import { useState, useEffect } from "react";
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NavigationEnhanced from "@/components/NavigationEnhanced";
import { Search, Filter, Clock, Users, TrendingUp, Gavel, Flame, Sparkles, Eye } from "lucide-react";
import { AUCTION_CONTRACT_ADDRESS, AUCTION_ABI } from '@/constants/contracts';
import CreateAuctionModal from "@/components/CreateAuctionModal";
import { useRef } from "react";
import { useInterval } from '@/hooks/useInterval';

// Add TypeScript interface for auction data
interface AuctionData {
  auctionId: number;
  domainName: string;
  tokenId: number;
  owner: string;
  currentBid: bigint;
  highestBidder: string;
  bidCount: number;
  endTime: number;
  category: string;
  finalized: boolean;
}

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All Auctions");
  const [bidAmount, setBidAmount] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Add bid amount state per auction
  const [bidAmounts, setBidAmounts] = useState<{ [key: number]: string }>({});

  // Read all auctions with proper typing
  const { data: auctionsData, isLoading: isLoadingAuctions } = useReadContract({
    address: AUCTION_CONTRACT_ADDRESS,
    abi: AUCTION_ABI,
    functionName: 'getAllAuctions',
  }) as { data: AuctionData[] | undefined, isLoading: boolean };

  // Write contract for placing bids
  const { writeContract, data: bidTxData } = useWriteContract();
  
  // Wait for bid transaction
  const { isLoading: isBidLoading, isSuccess: isBidSuccess } = 
    useWaitForTransactionReceipt({ hash: bidTxData });

  // Write contract for creating auctions
  const { writeContract: createAuction, data: createAuctionTxData } = useWriteContract();
  
  // Wait for create auction transaction
  const { isLoading: isCreatingAuction, isSuccess: isCreateSuccess } = 
    useWaitForTransactionReceipt({ hash: createAuctionTxData });

  // Store the last auctionId bid on
  
  const lastBidAuctionId = useRef<number | null>(null);

  // Add effect to handle bid success
  useEffect(() => {
    if (isBidSuccess && lastBidAuctionId.current !== null) {
      toast.success("Bid placed successfully!");
      // Clear bid amount for the successful bid
      setBidAmounts(prev => ({ ...prev, [lastBidAuctionId.current!]: '' }));
      lastBidAuctionId.current = null;
    }
  }, [isBidSuccess]);

  // Add debug logging for transaction states
  useEffect(() => {
    if (bidTxData) {
      console.log('Bid transaction data:', bidTxData);
    }
  }, [bidTxData]);

  useEffect(() => {
    console.log('Bid loading:', isBidLoading);
    console.log('Bid success:', isBidSuccess);
  }, [isBidLoading, isBidSuccess]);

  const handlePlaceBid = async (auctionId: number) => {
    try {
      console.log('Starting bid process for auction:', auctionId);
      const bidAmount = bidAmounts[auctionId];
      
      if (!bidAmount) {
        toast.error("Please enter a bid amount");
        return;
      }

      console.log('Bid amount:', bidAmount, 'ETH');
      const parsedValue = parseEther(bidAmount);
      console.log('Parsed value (wei):', parsedValue.toString());

      const config = {
        address: AUCTION_CONTRACT_ADDRESS,
        abi: AUCTION_ABI,
        functionName: 'bid',
        args: [auctionId],
        value: parsedValue
      } as const;

      console.log('Contract config:', config);
      lastBidAuctionId.current = auctionId;

      const loadingToast = toast.loading("Preparing bid transaction...");
      const tx = await writeContract(config);
      console.log('Transaction submitted:', tx);
      console.log ("loadingToast", loadingToast);
      toast.loading("Transaction submitted. Waiting for confirmation...");
      if(isBidSuccess)toast.dismiss();
      
    } catch (error: any) {
      console.error('Detailed bid error:', {
        error,
        message: error?.message,
        data: error?.data,
        code: error?.code
      });
      
      // More specific error messages
      let errorMessage = "Failed to place bid. ";
      if (error?.message?.includes("insufficient funds")) {
        errorMessage += "Insufficient funds in wallet.";
      } else if (error?.message?.includes("user rejected")) {
        errorMessage += "Transaction was rejected.";
      } else if (error?.message?.includes("Bid too low")) {
        errorMessage += "Bid amount is too low.";
      } else {
        errorMessage += error?.message || "Please try again.";
      }
      
      toast.error(errorMessage);
      toast.dismiss(); // Dismiss any loading toasts
    }
  };

  const handleCreateAuction = async (auctionData: {
    domainName: string;
    duration: string;  // removed startingPrice
    category: string;
  }) => {
    try {
      const config = {
        address: AUCTION_CONTRACT_ADDRESS,
        abi: AUCTION_ABI,
        functionName: 'createAuction',
        args: [
          auctionData.domainName,
          0, // tokenId
          Number(auctionData.duration) * 3600,
          auctionData.category
        ]
      } as const;

      toast.loading("Creating auction...");
      await createAuction(config);
    } catch (error) {
      console.error('Error creating auction:', error);
      toast.error("Failed to create auction");
    }
  };

  // Add this effect to handle create auction success
  useEffect(() => {
    if (isCreateSuccess) {
      toast.success("Auction created successfully!", { duration: 5000 });
      setIsCreateModalOpen(false);
      toast.dismiss();
    }
  }, [isCreateSuccess]);

  const [currentTime, setCurrentTime] = useState(Date.now());
  
  // Update time every minute
  useInterval(() => {
    setCurrentTime(Date.now());
  }, 60000);

  // Filter and transform auctions
  const activeAuctions = (auctionsData || [])
    .filter((auction: AuctionData) => {
      const endTimeMs = Number(auction.endTime) * 1000;
      return !auction.finalized && endTimeMs > Date.now();
    })
    .map((auction: AuctionData) => {
      const endTimeMs = Number(auction.endTime) * 1000;
      const timeLeftMs = endTimeMs - currentTime;
      const hours = Math.floor(timeLeftMs / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));
      
      return {
        ...auction,
        id: Number(auction.auctionId),
        domain: auction.domainName,
        currentBid: `${Number(auction.currentBid) / 1e18} ETH`,
        bids: Number(auction.bidCount),
        timeLeft: `${hours}h ${minutes}m`,
        category: auction.category,
        categoryColor: "bg-gradient-to-r from-primary to-primary-glow",
        owner: auction.owner,
        highestBidder: auction.highestBidder,
      };
    });

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
            {activeAuctions.map((auction, index) => (
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
                        <Users className="w-4 h-4" />
                      </div>
                      <div className="text-sm font-medium truncate">{`${auction.owner.slice(0, 6)}...${auction.owner.slice(-4)}`}</div>
                      <div className="text-xs text-muted-foreground">Owner</div>
                    </div>
                  </div>

                  {/* Add Highest Bidder Info */}
                  {auction.highestBidder !== "0x0000000000000000000000000000000000000000" && (
                    <div className="mt-4 text-sm text-muted-foreground">
                      <span className="font-medium">Highest Bidder:</span>{" "}
                      {`${auction.highestBidder.slice(0, 6)}...${auction.highestBidder.slice(-4)}`}
                    </div>
                  )}

                  {/* Price & Actions */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-2 font-inter">Current Bid</div>
                      <div className="text-4xl font-black bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent font-poppins">
                        {auction.currentBid}
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <Input
                        type="number"
                        placeholder="Enter bid amount in ETH"
                        value={bidAmounts[auction.id] || ''}
                        onChange={(e) => setBidAmounts(prev => ({
                          ...prev,
                          [auction.id]: e.target.value
                        }))}
                        className="flex-1"
                      />
                      <Button 
                        onClick={() => handlePlaceBid(auction.id)}
                        disabled={isBidLoading || auction.finalized}
                        className="flex-1 bg-gradient-button hover:bg-gradient-button-hover text-primary-foreground font-semibold py-4 rounded-xl shadow-button hover:shadow-glow transition-all duration-300 hover:scale-105 font-inter"
                      >
                        {isBidLoading ? (
                          "Bidding..."
                        ) : (
                          <>
                            <Gavel className="w-4 h-4 mr-2" />
                            Place Bid
                          </>
                        )}
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

          {/* Add Create Auction button in the header section */}
          <div className="flex gap-4">
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-gradient-button hover:bg-gradient-button-hover text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-button hover:shadow-glow transition-all duration-300 hover:scale-105 font-inter"
            >
              <Gavel className="w-4 h-4 mr-2" />
              Create Auction
            </Button>
          </div>

          {/* Add CreateAuctionModal */}
          <CreateAuctionModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onCreateAuction={handleCreateAuction}
            isProcessing={isCreatingAuction}
          />
        </div>
      </main>
    </div>
  );
};

export default Marketplace;