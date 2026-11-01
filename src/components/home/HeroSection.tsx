import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Play } from "lucide-react";
import { useEffect, useState } from "react";
import heroImage from "@/assets/hero.webp";
import heroSeaImage from "@/assets/hero-sea.webp";
import heroWashing from "@/assets/hero-washing.webp";
import heroJabaliya from "@/assets/hero-jabaliya.webp";
import heroMais from "@/assets/hero-mais.webp";
import heroMaisFather from "@/assets/hero-mais-father.webp";
import heroAdelFamily from "@/assets/hero-adel-family.webp";
import heroAdelInjury from "@/assets/hero-adel-injury.webp";
import { useLanguage } from "@/contexts/LanguageContext";

const heroImages = [
  {
    src: heroImage,
    altAr: "أطفال في منطقة نزوح ينتظرون بجرّات الماء",
    altEn: "Children with water jugs in a displacement area",
  },
  {
    src: heroSeaImage,
    altAr: "أطفال يضحكون على شاطئ البحر",
    altEn: "Children laughing and playing on the seashore",
  },
  {
    src: heroWashing,
    altAr: "سيدة تغسل ملابس أسرتها بين الأنقاض",
    altEn: "A woman washing her family's laundry amid rubble",
  },
  {
    src: heroJabaliya,
    altAr: "مشهد واسع لمخيم جبليا بعد الدمار",
    altEn: "A wide view of Jabaliya camp after destruction",
  },
  {
    src: heroMais,
    altAr: "طفلة من أهالي جبليا قبل منزلٍ متهدم",
    altEn: "A girl from Jabaliya in front of a half-destroyed home",
  },
  {
    src: heroMaisFather,
    altAr: "بنت مع والدها يطبخ على نار بين الأنقاض",
    altEn: "A girl with her father cooking over a fire amid rubble",
  },
  {
    src: heroAdelFamily,
    altAr: "أسرة من جبليا أمام منزلها المدمّر",
    altEn: "A family from Jabaliya stands before their destroyed home",
  },
  {
    src: heroAdelInjury,
    altAr: "قدم طفل مجروح بضماد بين الأنقاض",
    altEn: "An injured child's bandaged foot amid rubble",
  },
];

export function HeroSection() {
  const { t, isRTL } = useLanguage();
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: "10,000+", labelAr: "مستفيد", labelEn: "Beneficiaries" },
    { value: "15+", labelAr: "مشروع", labelEn: "Projects" },
    { value: "50+", labelAr: "متطوع", labelEn: "Volunteers" },
    { value: "5", labelAr: "سنوات خدمة", labelEn: "Years" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slideshow (crossfade every 10s) */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt={t(image.altAr, image.altEn)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              activeHeroIndex === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />
        <div className="absolute inset-0 bg-hero-pattern" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 text-center" dir={isRTL ? "rtl" : "ltr"}>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-heritage-gold/20 backdrop-blur-sm px-4 py-2 rounded-full animate-fade-up">
            <span className="w-2 h-2 bg-heritage-gold rounded-full animate-pulse" />
            <span className="text-heritage-gold text-sm font-medium">
              {t("مؤسسة ثقافية وإنسانية", "Cultural & Humanitarian Foundation")}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight animate-fade-up animation-delay-200">
            {t("معاً نبني", "Together We Build")}{" "}
            <span className="text-heritage-gold">{t("مستقبلاً", "a Better")}</span>
            <br />
            {t("أفضل للجميع", "Future for All")}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed animate-fade-up animation-delay-400">
            {t(
              "نسعى في مؤسسة جسور السلام الفلسطينية لتقديم يد العون للمحتاجين والأيتام من خلال مشاريع إنسانية مستدامة تحقق الأثر الإيجابي في المجتمع",
              "At the Palestinian Bridges of Peace Foundation, we strive to extend a helping hand to those in need and orphans through sustainable humanitarian projects that create a positive impact in the community"
            )}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-600">
            <Button variant="hero-primary" size="xl" asChild>
              <Link to="/#donate">
                <Heart className="w-5 h-5" />
                {t("تبرع الآن", "Donate Now")}
              </Link>
            </Button>
            <Button variant="hero-secondary" size="xl" asChild>
              <Link to="/projects">
                <Play className="w-5 h-5" />
                {t("استكشف مشاريعنا", "Explore Our Projects")}
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 animate-fade-up animation-delay-600">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 rounded-xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10"
              >
                <div className="text-2xl sm:text-3xl font-bold text-heritage-gold">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/70 mt-1">
                  {t(stat.labelAr, stat.labelEn)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-heritage-gold rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
