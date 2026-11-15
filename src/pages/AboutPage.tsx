import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { heroImage } from "@/lib/media";
import { useAbout, useAboutValues, useTeamMembers } from "@/lib/content";
import { statIconMap } from "@/lib/icons";
import { usePageTitle } from "@/hooks/use-page-title";

const categoryEn: Record<string, string> = {
  "مجلس الإدارة": "Board of Directors",
  "فريق العمل": "Team",
  "متطوعون": "Volunteers",
};

export default function AboutPage() {
  usePageTitle({
    titleAr: "من نحن | مؤسسة جسور السلام",
    titleEn: "About Us | Palestinian Bridges of Peace",
  });
  const { t, isRTL, language } = useLanguage();
  const about = useAbout();
  const values = useAboutValues();
  const team = useTeamMembers();
  const storyImage = about.storyImageUrl || heroImage;
  const storyStats = [
    { value: about.stat1Value, labelAr: about.stat1LabelAr, labelEn: about.stat1LabelEn },
    { value: about.stat2Value, labelAr: about.stat2LabelAr, labelEn: about.stat2LabelEn },
    { value: about.stat3Value, labelAr: about.stat3LabelAr, labelEn: about.stat3LabelEn },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero text-primary-foreground" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-heritage-gold/20 text-heritage-gold text-sm font-semibold rounded-full mb-6">
            {t(about.heroBadgeAr, about.heroBadgeEn)}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            {t(about.heroTitleAr, about.heroTitleEn)} <span className="text-heritage-gold">{t(about.heroTitleAccentAr, about.heroTitleAccentEn)}</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            {t(about.heroSubtitleAr, about.heroSubtitleEn)}
          </p>
        </div>
      </section>

      {/* Foundation Story */}
      <section className="py-20 bg-muted/30" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block px-4 py-1.5 bg-heritage-gold/10 text-heritage-gold-text text-sm font-semibold rounded-full">
                {t(about.storyBadgeAr, about.storyBadgeEn)}
              </span>
              <h2 className="text-3xl font-bold text-foreground">
                {t(about.storyTitleAr, about.storyTitleEn)} <span className="text-heritage-gold-text">{t(about.storyTitleAccentAr, about.storyTitleAccentEn)}</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t(about.storyPara1Ar, about.storyPara1En)}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t(about.storyPara2Ar, about.storyPara2En)}
              </p>
              <div className="grid grid-cols-3 gap-3 pt-2">
                {storyStats.map((item) => (
                  <div key={item.value} className="rounded-2xl border border-heritage-gold/30 bg-card p-4 text-center">
                    <div className="text-xl font-bold text-heritage-wine">{item.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {t(item.labelAr, item.labelEn)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-heritage-elevated min-h-72">
              <img loading="lazy" decoding="async"
                src={storyImage}
                alt={t("لحظات من مبادرات المؤسسة الميدانية", "Moments from our field initiatives")}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/10 to-transparent" />
              <div className="absolute bottom-5 start-5 end-5">
                <div className="inline-block px-4 py-1.5 bg-heritage-gold text-foreground text-xs font-bold rounded-full">
                  {t(about.storyImageBadgeAr, about.storyImageBadgeEn)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                {t("رسالتنا و", "Our Mission &")}<span className="text-heritage-gold-text">{t("رؤيتنا", "Vision")}</span>
              </h2>
              <div className="space-y-4">
                <div className="p-6 bg-muted rounded-2xl">
                  <h3 className="font-bold text-lg text-foreground mb-2">{t("رسالتنا", "Our Mission")}</h3>
                  <p className="text-muted-foreground">
                    {t(about.missionAr, about.missionEn)}
                  </p>
                </div>
                <div className="p-6 bg-heritage-gold/10 rounded-2xl">
                  <h3 className="font-bold text-lg text-foreground mb-2">{t("رؤيتنا", "Our Vision")}</h3>
                  <p className="text-muted-foreground">
                    {t(about.visionAr, about.visionEn)}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.map((value) => {
                const Icon = statIconMap[value.icon] ?? statIconMap.Heart;
                return (
                  <Card key={value.id} variant="heritage" className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-heritage-gold/10 text-heritage-gold-text flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">
                      {t(value.titleAr, value.titleEn)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(value.descAr, value.descEn)}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Board Members */}
      <section className="py-20 bg-muted/30" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-heritage-gold/10 text-heritage-gold-text text-sm font-semibold rounded-full mb-4">
              {t("فريقنا", "Our Team")}
            </span>
            <h2 className="text-3xl font-bold text-foreground">
              {t("مجلس", "Board of")} <span className="text-heritage-gold-text">{t("الإدارة", "Directors")}</span> {t("وفريق", "&")} <span className="text-heritage-gold-text">{t("العمل", "Team")}</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.id} variant="elevated" className="text-center p-6">
                {member.photo ? (
                  <img loading="lazy" decoding="async"
                    src={member.photo}
                    alt={t(member.nameAr, member.nameEn)}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-heritage-gold/40"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-hero mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-foreground">
                      {language === "ar" ? member.nameAr.charAt(0) : member.nameEn.charAt(0)}
                    </span>
                  </div>
                )}
                <CardContent className="p-0 space-y-2">
                  <h3 className="font-bold text-foreground">
                    {language === "ar" ? member.nameAr : member.nameEn}
                  </h3>
                  <p className="text-sm text-heritage-gold-text font-medium">
                    {language === "ar" ? member.roleAr : member.roleEn}
                  </p>
                  <span className="inline-block text-xs px-3 py-1 bg-heritage-gold/10 text-heritage-gold-text rounded-full">
                    {language === "ar" ? member.category : (categoryEn[member.category] ?? member.category)}
                  </span>
                  <p className="text-xs text-muted-foreground">
                    {language === "ar" ? member.bioAr : member.bioEn}
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
