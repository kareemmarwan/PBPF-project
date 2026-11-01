import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNews } from "@/lib/content";

export function NewsSection() {
  const { t, isRTL, language } = useLanguage();
  const news = useNews().slice(0, 3);
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="py-24 bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div className="space-y-2">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full">
              {t("آخر الأخبار", "Latest News")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              {t("مستجدات", "Foundation")}{" "}
              <span className="text-heritage-gold">{t("المؤسسة", "Updates")}</span>
            </h2>
          </div>
          <Button variant="heritage-outline" asChild>
            <Link to="/news">
              {t("جميع الأخبار", "All News")}
              <Arrow className={`w-4 h-4 ${isRTL ? "mr-2" : "ml-2"}`} />
            </Link>
          </Button>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <Card
              key={item.id}
              variant="elevated"
              className="group overflow-hidden animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-heritage-gold/10 text-heritage-gold text-xs font-semibold rounded-full">
                    {language === "ar" ? item.categoryAr : item.categoryEn}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.date).toLocaleDateString(language === "ar" ? "ar-SA" : "en-US")}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-heritage-wine transition-colors line-clamp-2">
                  {language === "ar" ? item.titleAr : item.titleEn}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {language === "ar" ? item.excerptAr : item.excerptEn}
                </p>
                <Link
                  to="/news"
                  className="inline-flex items-center gap-2 text-heritage-gold text-sm font-semibold hover:gap-3 transition-all"
                >
                  {t("اقرأ المزيد", "Read More")}
                  <Arrow className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
