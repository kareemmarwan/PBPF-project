import { Layout } from "@/components/layout";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@/lib/content";
import { usePageTitle } from "@/hooks/use-page-title";

export default function PrivacyPage() {
  const { t, isRTL } = useLanguage();
  usePageTitle({
    titleAr: "سياسة الخصوصية | مؤسسة جسور السلام",
    titleEn: "Privacy Policy | Palestinian Bridges of Peace",
  });

  const settings = useSettings();

  const sections = [
    {
      titleAr: "ما نجمعه",
      titleEn: "What we collect",
      bodyAr:
        "نجمع البيانات التي تقدمها طوعاً عبر نموذج التواصل: الاسم والبريد الإلكتروني ونص الرسالة. لا نطلب ولا نخزن أي بيانات دفع أو بطاقات داخل الموقع.",
      bodyEn:
        "We collect the data you provide voluntarily via the contact form: name, email, and message. We do not request or store any payment or card data inside the website.",
    },
    {
      titleAr: "كيف نستخدمه",
      titleEn: "How we use it",
      bodyAr:
        "الرد على استفساراتك، وتسجيل إشعارات التبرع وإصدار شهادات التقدير، وتحسين تجربة الموقع وفق اختيار اللغة المحفوظ.",
      bodyEn:
        "Responding to inquiries, registering donation notices and issuing appreciation certificates, and improving the website experience according to the saved language choice.",
    },
    {
      titleAr: "عدم البيع أو المشاركة",
      titleEn: "No sale or sharing",
      bodyAr:
        "لا نبيع بياناتك ولا نشاركها مع أطراف تجارية، وتقتصر المشاركة على الحد الأدنى الذي تفرضه الجهات الرسمية أو مزودو خدمة الموقع الأساسية.",
      bodyEn:
        "We never sell your data or share it with commercial parties; sharing is limited to the minimum required by official authorities or core website service providers.",
    },
    {
      titleAr: "أمان المعلومات",
      titleEn: "Data security",
      bodyAr:
        "نطبّق إجراءات تقنية وتنظيمية معتادة لحماية البيانات من الوصول غير المصرّح به أو الفقدان أو التعديل.",
      bodyEn:
        "We maintain routine technical and organizational measures protecting data from unauthorized access, loss, or modification.",
    },
    {
      titleAr: "حقوقك",
      titleEn: "Your rights",
      bodyAr:
        "لديك الحق في طلب الاطلاع على بياناتك أو تصحيحها أو حذفها في أي وقت عبر التواصل معنا مباشرة.",
      bodyEn:
        "You may request access to your data, its correction, or deletion at any time by contacting us directly.",
    },
  ];

  return (
    <Layout>
      <section className="pt-32 pb-12 bg-gradient-hero text-primary-foreground" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-heritage-gold/20 mx-auto mb-5 flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-heritage-gold" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            {t("سياسة الخصوصية", "Privacy Policy")}
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            {t(
              "خصوصيتك أمانة. توضح هذه السياسة كيف نتعامل مع بياناتك عند استخدام موقع المؤسسة.",
              "Your privacy is a trust. This policy explains how we handle your data when using the foundation's website."
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
                {t("للتواصل بشأن الخصوصية", "Privacy inquiries")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t(
                  "لأي سؤال حول هذه السياسة أو بياناتك راسلنا على",
                  "For any question about this policy or your data, email us at"
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
                  "تُحدَّث هذه السياسة فور أي تعديل جوهري على طريقة جمع البيانات أو استخدامها.",
                  "This policy is updated upon any material change in how data is collected or used."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
