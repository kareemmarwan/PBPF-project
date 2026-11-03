import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBooks, useStories } from "@/lib/content";
import { usePageTitle } from "@/hooks/use-page-title";

export default function BooksPage() {
  const { t, isRTL, language } = useLanguage();
  usePageTitle({
    titleAr: "الكتب والقصص | مؤسسة جسور السلام",
    titleEn: "Books & Stories | Palestinian Bridges of Peace",
  });

  const books = useBooks();
  const stories = useStories();

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-hero text-primary-foreground" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-heritage-gold/20 text-heritage-gold text-sm font-semibold rounded-full mb-6">
            {t("المكتبة", "Library")}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            {t("الكتب", "Books")} <span className="text-heritage-gold">{t("والقصص", "& Stories")}</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            {t(
              "إصداراتنا التي توثق قصص النازحين وتجاربهم الإنسانية",
              "Our publications documenting displaced people's stories and humanitarian experiences"
            )}
          </p>
        </div>
      </section>

      {/* Books Section */}
      <section className="py-20 bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            <BookOpen className="inline-block w-8 h-8 text-heritage-gold me-2" />
            {t("الكتب المنشورة", "Published Books")}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {books.map((book) => (
              <Card key={book.id} variant="heritage" className="overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-32 h-44 bg-gradient-hero rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-12 h-12 text-heritage-gold" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">
                          {language === "ar" ? book.titleAr : book.titleEn}
                        </h3>
                        <p className="text-sm text-heritage-gold">
                          {language === "ar" ? book.titleEn : book.titleAr}
                        </p>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {language === "ar" ? book.descAr : book.descEn}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {book.year}
                        </span>
                        <span>{t(`${book.pages} صفحة`, `${book.pages} pages`)}</span>
                      </div>
                      {book.pdf ? (
                        <Button variant="heritage-outline" size="sm" asChild>
                          <a href={book.pdf} target="_blank" rel="noreferrer">
                            <Download className="w-4 h-4" />
                            {t("تحميل الكتاب", "Download Book")}
                          </a>
                        </Button>
                      ) : (
                        <Button variant="heritage-outline" size="sm">
                          <Download className="w-4 h-4" />
                          {t("تحميل الكتاب", "Download Book")}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section className="py-20 bg-muted/30" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            {t("قصص", "Stories of")} <span className="text-heritage-gold">{t("النازحين", "the Displaced")}</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {stories.map((story) => (
              <Card key={story.id} variant="elevated" className="p-6">
                <CardContent className="p-0 space-y-4">
                  <h3 className="text-xl font-bold text-foreground">
                    {language === "ar" ? story.titleAr : story.titleEn}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {language === "ar" ? story.excerptAr : story.excerptEn}
                  </p>
                  <Button variant="link" className="p-0 text-heritage-gold">
                    {t("اقرأ القصة كاملة", "Read Full Story")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
