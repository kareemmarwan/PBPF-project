import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const { t, isRTL } = useLanguage();

  return (
    <Layout>
      <section className="pt-32 pb-24 bg-gradient-hero text-primary-foreground" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-heritage-gold/20 text-heritage-gold text-sm font-semibold rounded-full mb-6">
            404
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            {t("الصفحة غير موجودة", "Page Not Found")}
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            {t(
              "عذراً، الصفحة التي تبحث عنها غير متوفرة",
              "Sorry, the page you are looking for is not available"
            )}
          </p>
          <Button variant="hero-primary" size="lg" asChild>
            <Link to="/">{t("العودة للرئيسية", "Back to Home")}</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
