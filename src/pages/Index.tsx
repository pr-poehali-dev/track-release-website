import MusicDistributionHeader from "@/components/MusicDistributionHeader";
import HeroSection from "@/components/HeroSection";
import PlatformsSection from "@/components/PlatformsSection";
import StepsSection from "@/components/StepsSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MusicDistributionHeader />
      <main>
        <HeroSection />
        <PlatformsSection />
        <StepsSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
