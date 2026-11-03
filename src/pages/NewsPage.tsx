import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNews } from "@/lib/content";
import { usePageTitle } from "@/hooks/use-page-title";

export default function NewsPage() {
  const { t, isRTL, language } = useLanguage();
  usePageTitle({
    titleAr: "الأخبار | مؤسسة جسور السلام",
    titleEn: "News | Palestinian Bridges of Peace",
  });

  const newsItems = useNews();

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-hero text-primary-foreground" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-heritage-gold/20 text-heritage-gold text-sm font-semibold rounded-full mb-6">
            {t("الأخبار", "News")}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            {t("آخر", "The Latest")} <span className="text-heritage-gold">{t("المستجدات", "Updates")}</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            {t("تابع أحدث أخبار ونشاطات المؤسسة", "Follow the latest foundation news and activities")}
          </p>
        </div>
      </section>

      {/* News List */}
      <section className="py-20 bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {newsItems.map((item) => (
              <Card key={item.id} variant="elevated" className="overflow-hidden hover:shadow-heritage transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-heritage-gold/10 text-heritage-gold text-xs font-semibold rounded-full">
                      {language === "ar" ? item.categoryAr : item.categoryEn}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(item.date).toLocaleDateString(language === "ar" ? "ar-SA" : "en-US")}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-3 hover:text-heritage-wine transition-colors cursor-pointer">
                    {language === "ar" ? item.titleAr : item.titleEn}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {language === "ar" ? item.excerptAr : item.excerptEn}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
