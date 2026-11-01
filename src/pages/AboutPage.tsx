import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { heroImage } from "@/lib/media";

const values = [
  {
    icon: Heart,
    titleAr: "الإنسانية",
    titleEn: "Humanity",
    descAr: "نؤمن بأن كل إنسان يستحق حياة كريمة ونسعى لتحقيق ذلك",
    descEn: "We believe every person deserves a dignified life, and we strive to make that a reality",
  },
  {
    icon: Target,
    titleAr: "الشفافية",
    titleEn: "Transparency",
    descAr: "نلتزم بالوضوح التام في جميع أعمالنا وتقاريرنا المالية",
    descEn: "We are committed to full clarity in all our work and financial reports",
  },
  {
    icon: Eye,
    titleAr: "الاستدامة",
    titleEn: "Sustainability",
    descAr: "نركز على المشاريع المستدامة التي تحقق أثراً طويل المدى",
    descEn: "We focus on sustainable projects that create long-term impact",
  },
  {
    icon: Users,
    titleAr: "التعاون",
    titleEn: "Collaboration",
    descAr: "نؤمن بقوة العمل الجماعي والشراكات المجتمعية",
    descEn: "We believe in the power of teamwork and community partnerships",
  },
];

const boardMembers = [
  {
    nameAr: "د. أحمد العتيبي",
    nameEn: "Dr. Ahmed Al-Otaibi",
    roleAr: "رئيس مجلس الإدارة",
    roleEn: "Board Chairman",
    bioAr: "خبرة تزيد عن 20 عاماً في العمل الخيري والتنموي",
    bioEn: "Over 20 years of experience in charity and development work",
  },
  {
    nameAr: "أ. فاطمة الشمري",
    nameEn: "Fatima Al-Shammari",
    roleAr: "نائب الرئيس",
    roleEn: "Vice Chairman",
    bioAr: "متخصصة في إدارة المشاريع الإنسانية والتطوعية",
    bioEn: "Specialist in humanitarian and volunteer project management",
  },
  {
    nameAr: "م. خالد المالكي",
    nameEn: "Eng. Khaled Al-Malki",
    roleAr: "المدير التنفيذي",
    roleEn: "Executive Director",
    bioAr: "خبير في التخطيط الاستراتيجي وإدارة المؤسسات غير الربحية",
    bioEn: "Expert in strategic planning and nonprofit management",
  },
  {
    nameAr: "د. نورة القحطاني",
    nameEn: "Dr. Noura Al-Qahtani",
    roleAr: "مستشار",
    roleEn: "Advisor",
    bioAr: "أكاديمية ومتخصصة في الدراسات الاجتماعية",
    bioEn: "Academic specialized in social studies",
  },
];

export default function AboutPage() {
  const { t, isRTL, language } = useLanguage();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero text-primary-foreground" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-heritage-gold/20 text-heritage-gold text-sm font-semibold rounded-full mb-6">
            {t("تعرف علينا", "About Us")}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            {t("من", "About")} <span className="text-heritage-gold">{t("نحن", "Us")}</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            {t(
              "مؤسسة جسور السلام الفلسطينية هي مؤسسة ثقافية وإنسانية تسعى لخدمة المجتمع وإحياء التراث العربي",
              "The Palestinian Bridges of Peace Foundation for Relief and Development is a cultural and humanitarian organization striving to serve the community and revive Arab heritage"
            )}
          </p>
        </div>
      </section>

      {/* Foundation Story */}
      <section className="py-20 bg-muted/30" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block px-4 py-1.5 bg-heritage-gold/10 text-heritage-gold text-sm font-semibold rounded-full">
                {t("قصتنا", "Our Story")}
              </span>
              <h2 className="text-3xl font-bold text-foreground">
                {t("بدأت الحكاية", "It Started")} <span className="text-heritage-gold">{t("بجوارٍ واحد", "With One Neighbor")}</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t(
                  "وُلدت المؤسسة عام 2019 من مبادرة تطوعية صغيرة انطلقت على يد مجموعة من شباب الرياض، بإيمان أن لا يبقى جارٌ جائعاً، حين بدأ الخبز الطازج والسلال الغذائية يُوزَّع بهدوء من بابٍ إلى باب. لم يكن العملُ حينها خطةً مفصّلة، بل إجابة طبيعية لسؤال بسيط: من يمدّ يد العون حين يغيب الجميع؟",
                  "The foundation was born in 2019 from a small volunteer initiative led by a group of young people in Riyadh, determined that no neighbor should go hungry, as fresh bread and food baskets were quietly delivered door to door. There was no elaborate plan at first, just a natural answer to a simple question: who lends a hand when everyone else is gone?"
                )}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t(
                  "مع نمو الحاجة تحوّلت المبادرة إلى مؤسسة معتمدة تجمع بين العمل الإنساني وإحياء التراث العربي، فأصبحت خدماتها تصل اليوم إلى أكثر من 10,000 مستفيد عبر أكثر من 15 مشروعاً تشمل فرن الخير وتكية الطعام وكفالة الأيتام والمنح الدراسية، وتدخل منازل الآلاف من الأسر بكرامة.",
                  "As needs grew, the initiative grew into a licensed foundation that combines humanitarian work with reviving Arab heritage. Its services now reach over 10,000 beneficiaries through 15+ projects, from Bread of Goodness to the Community Kitchen, orphan sponsorship, and scholarships, entering thousands of homes with dignity."
                )}
              </p>
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { value: "2019", labelAr: "سنة التأسيس", labelEn: "Founded" },
                  { value: "15+", labelAr: "مشروعاً فعالاً", labelEn: "Active projects" },
                  { value: "10,000+", labelAr: "مستفيد", labelEn: "Beneficiaries" },
                ].map((item) => (
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
              <img
                src={heroImage}
                alt={t("لحظات من مبادرات المؤسسة الميدانية", "Moments from our field initiatives")}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/10 to-transparent" />
              <div className="absolute bottom-5 start-5 end-5">
                <div className="inline-block px-4 py-1.5 bg-heritage-gold text-foreground text-xs font-bold rounded-full">
                  {t("من ميدان العمل منذ 2019", "In the field since 2019")}
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
                {t("رسالتنا و", "Our Mission &")}<span className="text-heritage-gold">{t("رؤيتنا", "Vision")}</span>
              </h2>
              <div className="space-y-4">
                <div className="p-6 bg-muted rounded-2xl">
                  <h3 className="font-bold text-lg text-foreground mb-2">{t("رسالتنا", "Our Mission")}</h3>
                  <p className="text-muted-foreground">
                    {t(
                      "تقديم خدمات إنسانية متميزة للمحتاجين والأيتام، والمساهمة في الحفاظ على التراث العربي الأصيل من خلال مشاريع مستدامة تحقق الأثر الإيجابي في المجتمع.",
                      "Providing distinguished humanitarian services to the needy and orphans, and contributing to preserving authentic Arab heritage through sustainable projects that create a positive impact on society."
                    )}
                  </p>
                </div>
                <div className="p-6 bg-heritage-gold/10 rounded-2xl">
                  <h3 className="font-bold text-lg text-foreground mb-2">{t("رؤيتنا", "Our Vision")}</h3>
                  <p className="text-muted-foreground">
                    {t(
                      "أن نكون المؤسسة الرائدة في العمل الإنساني والثقافي، ونموذجاً يحتذى به في الشفافية والفاعلية والاستدامة.",
                      "To be the leading organization in humanitarian and cultural work, and a role model in transparency, effectiveness, and sustainability."
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <Card key={index} variant="heritage" className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-heritage-gold/10 text-heritage-gold flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">
                    {language === "ar" ? value.titleAr : value.titleEn}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === "ar" ? value.descAr : value.descEn}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Board Members */}
      <section className="py-20 bg-muted/30" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-heritage-gold/10 text-heritage-gold text-sm font-semibold rounded-full mb-4">
              {t("فريقنا", "Our Team")}
            </span>
            <h2 className="text-3xl font-bold text-foreground">
              {t("مجلس", "Board of")} <span className="text-heritage-gold">{t("الإدارة", "Directors")}</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {boardMembers.map((member, index) => (
              <Card key={index} variant="elevated" className="text-center p-6">
                <div className="w-20 h-20 rounded-full bg-gradient-hero mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">
                    {language === "ar" ? member.nameAr.charAt(0) : member.nameEn.charAt(0)}
                  </span>
                </div>
                <CardContent className="p-0 space-y-2">
                  <h3 className="font-bold text-foreground">
                    {language === "ar" ? member.nameAr : member.nameEn}
                  </h3>
                  <p className="text-sm text-heritage-gold font-medium">
                    {language === "ar" ? member.roleAr : member.roleEn}
                  </p>
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
