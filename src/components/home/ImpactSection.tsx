import { Users, Heart, Utensils, GraduationCap, Home, Gift } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useImpact } from "@/lib/content";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Utensils,
  Heart,
  GraduationCap,
  Home,
  Gift,
};

export function ImpactSection() {
  const { t, isRTL } = useLanguage();
  const stats = useImpact();

  return (
    <section className="py-24 bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full">
            {t("أثرنا", "Our Impact")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            {t("أرقام تحكي", "Numbers That Tell")}{" "}
            <span className="text-heritage-gold">{t("قصص نجاح", "Success Stories")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t(
              "بفضل الله ثم بدعمكم، استطعنا تحقيق هذه الإنجازات",
              "By the grace of God and your support, we achieved these accomplishments"
            )}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => {
            const Icon = iconMap[stat.icon] ?? Users;
            return (
            <div
              key={index}
              className="group text-center p-6 rounded-2xl bg-card border border-border hover:border-heritage-gold/30 hover:shadow-heritage transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-heritage-gold/10 text-heritage-gold mb-4 group-hover:bg-heritage-gold group-hover:text-foreground transition-all duration-300">
                <Icon className="w-7 h-7" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-foreground mb-1">
                {t(stat.labelAr, stat.labelEn)}
              </div>
              <div className="text-xs text-muted-foreground">
                {t(stat.descAr, stat.descEn)}
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
