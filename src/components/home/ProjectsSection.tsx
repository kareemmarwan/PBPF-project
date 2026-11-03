import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMiniProjects } from "@/lib/content";

export function ProjectsSection() {
  const { t, isRTL, language } = useLanguage();
  const projects = useMiniProjects();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="py-24 bg-muted/30" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 bg-heritage-gold/10 text-heritage-gold text-sm font-semibold rounded-full">
            {t("مشاريعنا", "Our Projects")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            {t("مشاريع تصنع", "Projects That Make")}{" "}
            <span className="text-heritage-gold">{t("الفرق", "a Difference")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t(
              "نعمل على تنفيذ مشاريع إنسانية مستدامة تلبي احتياجات المجتمع وتحقق أثراً إيجابياً ملموساً",
              "We implement sustainable humanitarian projects that meet community needs and create tangible positive impact"
            )}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              to={`/projects#${project.id}`}
              aria-label={t(`عرض تفاصيل ${project.titleAr}`, `View ${project.titleEn} details`)}
              className="block h-full animate-fade-up rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card
                variant="heritage"
                className="group overflow-hidden h-full cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img loading="lazy" decoding="async"
                    src={project.image}
                    alt={language === "ar" ? project.titleAr : project.titleEn}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-3 right-3 px-3 py-1 bg-heritage-gold rounded-full text-xs font-semibold text-foreground">
                    {language === "ar" ? project.beneficiariesAr : project.beneficiariesEn}
                  </div>
                </div>
                <CardContent className="p-5 space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-heritage-wine transition-colors">
                      {language === "ar" ? project.titleAr : project.titleEn}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {language === "ar" ? project.titleEn : project.titleAr}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {language === "ar" ? project.descAr : project.descEn}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="heritage-outline" size="lg" asChild>
            <Link to="/projects">
              {t("عرض جميع المشاريع", "View All Projects")}
              <Arrow className={`w-4 h-4 ${isRTL ? "mr-2" : "ml-2"}`} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
