import { FeaturesSection } from "./sections/features-section";
import { FinalCtaSection } from "./sections/final-cta-section";
import { FooterSection } from "./sections/footer-section";
import { HeroSection } from "./sections/hero-section";
import { ShowcaseSection } from "./sections/showcase-section";

export function HomeView() {
  return (
    <main>
      <HeroSection />
      <ShowcaseSection />
      <FeaturesSection />
      <FinalCtaSection />
      <FooterSection />
    </main>
  );
}
