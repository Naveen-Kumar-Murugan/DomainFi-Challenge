import NavigationEnhanced from "@/components/NavigationEnhanced";
import HeroEnhanced from "@/components/HeroEnhanced";
import FeaturesEnhanced from "@/components/FeaturesEnhanced";
import FeaturedDomainsEnhanced from "@/components/FeaturedDomainsEnhanced";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-inter overflow-x-hidden">
      <NavigationEnhanced />
      <HeroEnhanced />
      <FeaturesEnhanced />
      <FeaturedDomainsEnhanced />
    </div>
  );
};

export default Index;
