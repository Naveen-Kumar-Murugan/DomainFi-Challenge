import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NavigationEnhanced from "@/components/NavigationEnhanced";
import { TrendingUp, TrendingDown, Sparkles, BarChart, Wallet, Plus, Target, Zap } from "lucide-react";
import { useState } from 'react';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ETF_CONTRACT_ADDRESS, ETF_ABI } from '@/constants/contracts';

const ETFs = () => {
  // Read ETF data
  const { data: etfsData, isLoading: isLoadingETFs } = useReadContract({
    address: ETF_CONTRACT_ADDRESS,
    abi: ETF_ABI,
    functionName: 'getAllETFs',
  });

  // Write contract for investing
  const { writeContract: investInETF, data: investTxData } = useWriteContract();
  
  // Wait for investment transaction
  const { isLoading: isInvesting, isSuccess: isInvestSuccess } = 
    useWaitForTransactionReceipt({ hash: investTxData });

  const handleInvest = async (etfId: number, amount: string) => {
    try {
      investInETF({
        address: ETF_CONTRACT_ADDRESS,
        abi: ETF_ABI,
        functionName: 'investInETF',
        args: [etfId],
        value: parseEther(amount)
      });
    } catch (error) {
      console.error('Error investing in ETF:', error);
    }
  };

  const etfs = [
    {
      name: "Tech Giants ETF",
      symbol: "TECH",
      change: "+12.5%",
      period: "24h",
      netAssetValue: "$2.4M",
      domains: "25 premium tech domains",
      pricePerShare: "$125.50",
      category: "TECH",
      categoryColor: "bg-gradient-to-r from-primary to-primary-glow",
      isPositive: true
    },
    {
      name: "Crypto Domains ETF",
      symbol: "CRYPTO",
      change: "+8.3%",
      period: "24h",
      netAssetValue: "$1.8M",
      domains: "18 crypto-focused domains",
      pricePerShare: "$89.75",
      category: "CRYPTO",
      categoryColor: "bg-gradient-to-r from-warning to-yellow-400",
      isPositive: true
    },
    {
      name: "AI Innovation ETF",
      symbol: "AI",
      change: "+15.2%",
      period: "24h",
      netAssetValue: "$3.1M",
      domains: "32 AI-related domains",
      pricePerShare: "$156.80",
      category: "AI",
      categoryColor: "bg-gradient-to-r from-success to-emerald-400",
      isPositive: true
    },
    {
      name: "Finance Hub ETF",
      symbol: "FIN",
      change: "-2.1%",
      period: "24h",
      netAssetValue: "$1.2M",
      domains: "15 finance domains",
      pricePerShare: "$78.90",
      category: "FINANCE",
      categoryColor: "bg-gradient-to-r from-destructive to-red-400",
      isPositive: false
    }
  ];

  const performanceStats = [
    { label: "Total Market Cap", value: "$8.5M", color: "text-primary", icon: BarChart },
    { label: "Average 24h Growth", value: "+9.2%", color: "text-success", icon: TrendingUp },
    { label: "Total Domains", value: "90", color: "text-primary", icon: Target },
    { label: "Active Investors", value: "1,247", color: "text-primary", icon: Zap }
  ];

  const topPerformers = [
    { name: "TechStartup.com", etf: "Tech Giants ETF", change: "+18.5%", value: "$25,000", color: "bg-primary" },
    { name: "AIRevolution.net", etf: "AI Innovation ETF", change: "+22.3%", value: "$35,000", color: "bg-success" },
    { name: "CryptoExchange.io", etf: "Crypto Domains ETF", change: "+14.7%", value: "$45,000", color: "bg-warning" }
  ];

  return (
    <div className="min-h-screen bg-background font-inter overflow-x-hidden">
      <NavigationEnhanced />
      
      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-0 right-0 w-80 h-80 bg-primary-glow/5 rounded-full blur-3xl pointer-events-none animate-pulse delay-1000"></div>
      
      <main className="pt-24 pb-12 px-6 relative z-10">
        <div className="container mx-auto">
          {/* Enhanced Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-card backdrop-blur-sm border border-border/50 rounded-full px-6 py-3 mb-6 shadow-card">
                <BarChart className="w-5 h-5 text-primary animate-pulse" />
                <span className="text-sm text-muted-foreground font-medium">Investment Portfolio</span>
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              </div>
              
              <h1 className="text-6xl font-black text-foreground mb-4 font-poppins">
                Domain <span className="bg-gradient-rainbow bg-clip-text text-transparent">ETFs</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl">
                Diversified domain portfolios powered by AI analytics and fractional ownership technology.
              </p>
            </div>
            
            <div className="flex gap-4 mt-6 lg:mt-0">
              <Select defaultValue="All ETFs">
                <SelectTrigger className="w-40 bg-gradient-card backdrop-blur-sm border-border/50 rounded-xl shadow-card font-inter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All ETFs">All ETFs</SelectItem>
                  <SelectItem value="Tech">Tech</SelectItem>
                  <SelectItem value="Crypto">Crypto</SelectItem>
                  <SelectItem value="AI">AI</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-gradient-button hover:bg-gradient-button-hover text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-button hover:shadow-glow transition-all duration-300 hover:scale-105 font-inter">
                <Plus className="w-4 h-4 mr-2" />
                Create ETF
              </Button>
            </div>
          </div>

          {/* Enhanced ETF Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
            {etfs.map((etf, index) => (
              <Card key={index} className="group relative p-6 border-border/50 hover:border-primary/30 bg-gradient-card backdrop-blur-sm shadow-card hover:shadow-premium transition-all duration-500 hover:scale-105 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-lg font-bold text-card-foreground font-poppins group-hover:text-primary transition-colors">
                          {etf.name}
                        </h3>
                        <Sparkles className="w-4 h-4 text-primary-glow animate-pulse" />
                      </div>
                      <Badge className={`${etf.categoryColor} text-white text-xs font-medium px-3 py-1 shadow-sm`}>
                        {etf.category}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className={`flex items-center gap-1 text-sm font-bold ${
                        etf.isPositive ? 'text-success' : 'text-destructive'
                      }`}>
                        {etf.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {etf.change}
                      </div>
                      <div className="text-xs text-muted-foreground">{etf.period}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-secondary/20 rounded-lg p-3">
                      <div className="text-xs text-muted-foreground mb-1">Net Asset Value</div>
                      <div className="text-2xl font-black text-primary font-poppins">{etf.netAssetValue}</div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-muted-foreground mb-2">Portfolio</div>
                      <div className="text-sm text-card-foreground font-medium mb-3">{etf.domains}</div>
                      
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs text-muted-foreground">Price per Share</span>
                        <span className="text-lg font-bold text-primary font-poppins">{etf.pricePerShare}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleInvest(etf.id, etf.minInvestment)}
                    disabled={isInvesting}
                    className="w-full bg-gradient-button hover:bg-gradient-button-hover text-primary-foreground font-semibold py-3 rounded-xl shadow-button hover:shadow-glow transition-all duration-300 hover:scale-105 group-hover:animate-pulse-glow font-inter"
                  >
                    {isInvesting ? (
                      "Processing..."
                    ) : (
                      <>
                        <Wallet className="w-4 h-4 mr-2" />
                        Invest Now
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Enhanced Performance Overview & Portfolio */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ETF Performance Overview */}
            <Card className="group relative p-8 border-border/50 hover:border-primary/30 bg-gradient-card backdrop-blur-sm shadow-card hover:shadow-premium transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-card-foreground mb-8 font-poppins">ETF Performance Overview</h2>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {performanceStats.map((stat, index) => (
                    <div key={index} className="group text-center p-6 bg-gradient-secondary rounded-xl shadow-card hover:shadow-premium transition-all duration-300 hover:scale-105">
                      <div className="flex items-center justify-center mb-3">
                        <stat.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className={`text-3xl font-black ${stat.color} mb-2 font-poppins`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground font-inter">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-6 font-poppins">Top Performing Domains</h3>
                  <div className="space-y-4">
                    {topPerformers.map((domain, index) => (
                      <div key={index} className="group flex items-center justify-between p-4 bg-gradient-secondary rounded-xl hover:shadow-card transition-all duration-300 hover:scale-[1.02]">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 ${domain.color} rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-button group-hover:shadow-glow transition-all duration-300`}>
                            {domain.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-card-foreground font-inter">{domain.name}</div>
                            <div className="text-sm text-muted-foreground">{domain.etf}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-success font-bold">{domain.change}</div>
                          <div className="text-sm text-muted-foreground">{domain.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Enhanced Your Portfolio */}
            <Card className="group relative p-8 border-border/50 hover:border-primary/30 bg-gradient-card backdrop-blur-sm shadow-card hover:shadow-premium transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-card-foreground mb-8 font-poppins">Your Portfolio</h2>
                
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                    <Wallet className="w-12 h-12 text-white" />
                  </div>
                  <div className="text-muted-foreground mb-8 font-inter">
                    Connect your wallet to view your ETF portfolio and start investing in domain futures.
                  </div>
                  <Button className="bg-gradient-button hover:bg-gradient-button-hover text-primary-foreground px-8 py-4 rounded-xl font-semibold shadow-button hover:shadow-glow transition-all duration-300 hover:scale-105 font-inter">
                    <Wallet className="w-5 h-5 mr-2" />
                    Connect Wallet
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ETFs;