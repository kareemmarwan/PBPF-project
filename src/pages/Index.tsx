import { Layout } from "@/components/layout";
import { NewsTicker } from "@/components/layout/NewsTicker";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  HeroSection,
  ProjectsSection,
  DonationSection,
  ImpactSection,
  TestimonialsSection,
  NewsSection,
  GalleryPreview,
} from "@/components/home";
import { usePageTitle } from "@/hooks/use-page-title";

const Index = () => {
  usePageTitle({
    titleAr: "مؤسسة جسور السلام الفلسطينية للعون والتنمية",
    titleEn: "Palestinian Bridges of Peace Foundation for Relief and Development",
  });
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const target = document.getElementById(location.hash.slice(1));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.hash]);

  return (
    <Layout>
      <HeroSection />
      <NewsTicker />
      <ImpactSection />
      <ProjectsSection />
      <TestimonialsSection />
      <DonationSection />
      <GalleryPreview />
      <NewsSection />
    </Layout>
  );
};

export default Index;
