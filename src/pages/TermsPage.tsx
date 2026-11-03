import { Layout } from "@/components/layout";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@/lib/content";
import { usePageTitle } from "@/hooks/use-page-title";

export default function TermsPage() {
  const { t, isRTL } = useLanguage();
  usePageTitle({
    titleAr: "الشروط والأحكام | مؤسسة جسور السلام",
    titleEn: "Terms & Conditions | Palestinian Bridges of Peace",
  });

  const settings = useSettings();

  const sections = [
    {
      titleAr: "قبول الشروط",
      titleEn: "Acceptance of terms",
      bodyAr:
        "استخدامك هذا الموقع وتصفّحه أو التواصل عبره يعني موافقتك على الشروط الواردة في هذه الوثيقة.",
      bodyEn:
        "Using this website, browsing it, or contacting through it means you accept the terms contained in this document.",
    },
    {
      titleAr: "استخدام الموقع",
      titleEn: "Use of the website",
      bodyAr:
        "يُستخدم الموقع للاطلاع على المؤسسة وتبرعها والتواصل بها. يمنع أي استخدام يخل بالقوانين أو ينشر محتوى مضلل أو يمثل عن المؤسسة دون تفويض.",
      bodyEn:
        "The website is used to learn about the foundation, donate, and communicate. Any unlawful use, misleading content, or unauthorized representation of the foundation is prohibited.",
    },
    {
      titleAr: "ملكية المحتوى",
      titleEn: "Content ownership",
      bodyAr:
        "الشعارات والمواد والصور الخاصة بالمؤسسة ملك لها، ولا يجوز استخدامها تجارياً دون إذن مكتوب.",
      bodyEn:
        "The foundation's logos, materials, and images are its property and may not be used commercially without written permission.",
    },
    {
      titleAr: "التبرعات",
      titleEn: "Donations",
      bodyAr:
        "تُستخدم التبرعات ضمن المشاريع المعلنة، ونلتزم بالشفافية عبر تقارير دورية، ويُسجل إشعار التحويل عبر نموذج التواصل مع إصدار شهادة التقدير.",
      bodyEn:
        "Donations are used within the announced projects. We commit to transparency through periodic reports; transfer notices are received via the contact form for registration and certificate issuance.",
    },
    {
      titleAr: "حدود المسؤولية",
      titleEn: "Liability limits",
      bodyAr:
        "يُقدَّم المحتوى كما هو لغرض تعريفي، ولا يتحمل الموقع مسؤولية قرارات تعتمد على المحتوى المعروض وحده.",
      bodyEn:
        "Content is provided as-is for informational purposes; the foundation is not liable for decisions based solely on the displayed content.",
    },
  ];

  return (
    <Layout>
      <section className="pt-32 pb-12 bg-gradient-hero text-primary-foreground" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-heritage-gold/20 mx-auto mb-5 flex items-center justify-center">
            <FileText className="w-8 h-8 text-heritage-gold" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            {t("شروط الاستخدام", "Terms of Use")}
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            {t(
              "تنظم هذه الشروط استخدامك لموقع المؤسسة بما يتضمنه من حقوق والتزامات.",
              "These terms regulate your use of the foundation's website, including the rights and obligations it involves."
            )}
          </p>
        </div>
      </section>

      <section className="py-16 bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="space-y-2">
                <h2 className="text-xl font-bold text-foreground">
                  {t(section.titleAr, section.titleEn)}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t(section.bodyAr, section.bodyEn)}
                </p>
              </div>
            ))}

            <div className="p-5 rounded-2xl bg-heritage-gold/10 border border-heritage-gold/20 space-y-2">
              <h2 className="text-xl font-bold text-foreground">
                {t("الاستفسارات والتعديلات", "Inquiries and updates")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t(
                  "لأي استفسار حول هذه الشروط راسلنا على",
                  "For any question about these terms, email us at"
                )}{" "}
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="text-heritage-gold hover:underline"
                  dir="ltr"
                >
                  {settings.contactEmail}
                </a>{" "}
                {t("أو عبر", "or via")}{" "}
                <Link to="/contact" className="text-heritage-gold hover:underline">
                  {t("نموذج التواصل", "the contact form")}
                </Link>
                .
              </p>
              <p className="text-xs text-muted-foreground">
                {t(
                  "يحق للمؤسسة تحديث هذه الشروط، ويُعد الاستمرار في استخدام الموقع موافقة على الصيغة المحدثة.",
                  "The foundation may update these terms; continued use of the website constitutes acceptance of the updated version."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
