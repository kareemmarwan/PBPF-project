import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGallery } from "@/lib/content";

const categoriesEn: Record<string, string> = {
  "مشاريع": "Projects",
  "نشاطات": "Activities",
  "فعاليات": "Events",
};

export function GalleryPreview() {
  const { t, isRTL, language } = useLanguage();
  const galleryImages = useGallery().slice(0, 4);
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="py-24 bg-muted/30" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div className="space-y-2">
            <span className="inline-block px-4 py-1.5 bg-heritage-gold/10 text-heritage-gold text-sm font-semibold rounded-full">
              {t("معرض الصور", "Photo Gallery")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              {t("لحظات من", "Moments of")}{" "}
              <span className="text-heritage-gold">{t("العطاء", "Giving")}</span>
            </h2>
          </div>
          <Button variant="heritage-outline" asChild>
            <Link to="/gallery">
              {t("عرض المعرض كاملاً", "View Full Gallery")}
              <Arrow className={`w-4 h-4 ${isRTL ? "mr-2" : "ml-2"}`} />
            </Link>
          </Button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={image.src}
                alt={language === "ar" ? image.altAr : image.altEn}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 max-md:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 max-md:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-2 py-1 bg-heritage-gold text-foreground text-xs font-semibold rounded-full mb-2">
                  {t(image.category, categoriesEn[image.category] ?? image.category)}
                </span>
                <p className="text-primary-foreground font-semibold">
                  {language === "ar" ? image.altAr : image.altEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
