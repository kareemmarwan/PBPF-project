import { Layout } from "@/components/layout";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGallery } from "@/lib/content";

const categories = ["الكل", "مشاريع", "نشاطات", "فعاليات"];

const categoriesEn: Record<string, string> = {
  "الكل": "All",
  "مشاريع": "Projects",
  "نشاطات": "Activities",
  "فعاليات": "Events",
};

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const { t, isRTL, language } = useLanguage();
  const galleryItems = useGallery();

  const filteredItems = activeCategory === "الكل"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-hero text-primary-foreground" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-heritage-gold/20 text-heritage-gold text-sm font-semibold rounded-full mb-6">
            {t("المعرض", "Gallery")}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            {t("معرض", "Photo")} <span className="text-heritage-gold">{t("الصور", "Gallery")}</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            {t("صور توثق أنشطتنا ومشاريعنا الإنسانية", "Photos documenting our humanitarian activities and projects")}
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeCategory === category
                    ? "bg-heritage-gold text-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {t(category, categoriesEn[category] ?? category)}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
              >
                <img
                  src={item.src}
                  alt={language === "ar" ? item.altAr : item.altEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 max-md:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 max-md:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-2 py-1 bg-heritage-gold text-foreground text-xs font-semibold rounded-full mb-2">
                    {t(item.category, categoriesEn[item.category] ?? item.category)}
                  </span>
                  <p className="text-primary-foreground font-semibold">
                    {language === "ar" ? item.altAr : item.altEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
