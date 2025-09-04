import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NavigationEnhanced from "@/components/NavigationEnhanced";
import { Flame, TrendingUp, DollarSign, Plus } from "lucide-react";

const Trends = () => {
  const trendStats = [
    {
      icon: Flame,
      value: "2,847",
      label: "Trending Domains",
      color: "bg-primary",
      iconColor: "text-white"
    },
    {
      icon: TrendingUp,
      value: "+24.7%",
      label: "Average Growth",
      color: "bg-success",
      iconColor: "text-white"
    },
    {
      icon: DollarSign,
      value: "$2.8M",
      label: "Top Sale Value",
      color: "bg-primary-glow",
      iconColor: "text-white"
    },
    {
      icon: Plus,
      value: "156",
      label: "New Listings",
      color: "bg-warning",
      iconColor: "text-white"
    }
  ];

  const topTrendingDomains = [
    {
      rank: 1,
      name: "AIStartup.com",
      category: "AI",
      growth: "+45.2%",
      volume: "$125K",
      badge: "🟢"
    },
    {
      rank: 2,
      name: "CryptoBank.io",
      category: "Finance",
      growth: "+38.7%",
      volume: "$98K",
      badge: "🔥"
    },
    {
      rank: 3,
      name: "TechGiant.net",
      category: "Technology",
      growth: "+32.1%",
      volume: "$87K",
      badge: "⚡"
    },
    {
      rank: 4,
      name: "BlockchainApp.org",
      category: "Blockchain",
      growth: "+28.9%",
      volume: "$76K",
      badge: "🚀"
    },
    {
      rank: 5,
      name: "MetaWorld.com",
      category: "Metaverse",
      growth: "+25.3%",
      volume: "$65K",
      badge: "🌟"
    }
  ];

  const categoryTrends = [
    { category: "AI & Machine Learning", domains: 1247, growth: "+34.2%", avgPrice: "$15.2K" },
    { category: "Cryptocurrency", domains: 892, growth: "+28.7%", avgPrice: "$22.1K" },
    { category: "Technology", domains: 2156, growth: "+19.8%", avgPrice: "$8.9K" },
    { category: "Finance", domains: 678, growth: "+16.4%", avgPrice: "$31.7K" },
    { category: "Healthcare", domains: 543, growth: "+12.3%", avgPrice: "$18.5K" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationEnhanced />
      
      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h1 className="text-5xl font-bold text-foreground mb-4 sm:mb-0">
              Domain <span className="text-primary">Trends</span>
            </h1>
            <div className="flex gap-3">
              <Select defaultValue="Last 7 Days">
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Last 7 Days">Last 7 Days</SelectItem>
                  <SelectItem value="Last 30 Days">Last 30 Days</SelectItem>
                  <SelectItem value="Last 90 Days">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="All Categories">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Categories">All Categories</SelectItem>
                  <SelectItem value="AI">AI</SelectItem>
                  <SelectItem value="Crypto">Crypto</SelectItem>
                  <SelectItem value="Tech">Tech</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Trend Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {trendStats.map((stat, index) => (
              <Card key={index} className="p-6 border-border">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Top Trending Domains */}
            <div className="lg:col-span-2">
              <Card className="p-6 border-border">
                <h2 className="text-2xl font-bold text-card-foreground mb-6">Top Trending Domains</h2>
                
                <div className="space-y-4">
                  {topTrendingDomains.map((domain, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg hover:bg-secondary/20 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
                          {domain.rank}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-card-foreground">{domain.name}</span>
                            <span className="text-lg">{domain.badge}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">{domain.category}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-success font-medium">{domain.growth}</div>
                        <div className="text-sm text-muted-foreground">{domain.volume}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Category Trends */}
            <div>
              <Card className="p-6 border-border">
                <h2 className="text-xl font-bold text-card-foreground mb-6">Category Trends</h2>
                
                <div className="space-y-4">
                  {categoryTrends.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium text-card-foreground text-sm">
                          {category.category}
                        </div>
                        <div className="text-success text-sm font-medium">
                          {category.growth}
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>{category.domains} domains</span>
                        <span>Avg: {category.avgPrice}</span>
                      </div>
                      <div className="w-full bg-secondary/20 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${Math.min(parseFloat(category.growth.replace('+', '').replace('%', '')), 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Market Analysis Section */}
          <div className="mt-12">
            <Card className="p-6 border-border">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Market Analysis</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">18.5%</div>
                  <div className="text-sm text-muted-foreground">AI Domain Growth</div>
                  <div className="text-xs text-muted-foreground mt-1">vs last month</div>
                </div>
                
                <div className="text-center p-4 bg-success/5 rounded-lg">
                  <div className="text-3xl font-bold text-success mb-2">$2.1M</div>
                  <div className="text-sm text-muted-foreground">Weekly Volume</div>
                  <div className="text-xs text-muted-foreground mt-1">+12.3% increase</div>
                </div>
                
                <div className="text-center p-4 bg-warning/5 rounded-lg">
                  <div className="text-3xl font-bold text-warning mb-2">247</div>
                  <div className="text-sm text-muted-foreground">New Investors</div>
                  <div className="text-xs text-muted-foreground mt-1">this week</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Trends;