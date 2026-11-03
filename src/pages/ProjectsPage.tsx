import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProjectsDetails } from "@/lib/content";
import { usePageTitle } from "@/hooks/use-page-title";

export default function ProjectsPage() {
  const { t, isRTL, language } = useLanguage();
  usePageTitle({
    titleAr: "مشاريعنا | مؤسسة جسور السلام",
    titleEn: "Projects | Palestinian Bridges of Peace",
  });

  const projects = useProjectsDetails();
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
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-hero text-primary-foreground" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-heritage-gold/20 text-heritage-gold text-sm font-semibold rounded-full mb-6">
            {t("مشاريعنا", "Our Projects")}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            {t("مشاريع تصنع", "Projects That Make")} <span className="text-heritage-gold">{t("الفرق", "a Difference")}</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            {t(
              "نعمل على تنفيذ مشاريع إنسانية مستدامة تلبي احتياجات المجتمع",
              "We implement sustainable humanitarian projects that meet community needs"
            )}
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                id={project.id}
                variant="heritage"
                className="overflow-hidden scroll-mt-24"
              >
                <div className="grid lg:grid-cols-2">
                  <div className={`relative h-64 lg:h-auto ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <img loading="lazy" decoding="async"
                      src={project.image}
                      alt={language === "ar" ? project.titleAr : project.titleEn}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-3xl font-bold text-foreground mb-2">
                          {language === "ar" ? project.titleAr : project.titleEn}
                        </h2>
                        <p className="text-sm text-heritage-gold">
                          {language === "ar" ? project.titleEn : project.titleAr}
                        </p>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {language === "ar" ? project.descAr : project.descEn}
                      </p>
                      <div className="grid grid-cols-3 gap-4">
                        {project.stats.map((stat, i) => (
                          <div key={i} className="text-center p-4 bg-muted rounded-xl">
                            <div className="text-2xl font-bold text-heritage-gold">
                              {stat.value}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {language === "ar" ? stat.labelAr : stat.labelEn}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
