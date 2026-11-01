import { Layout } from "@/components/layout";
import { Cookie, Settings2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@/lib/content";

export default function CookiePolicyPage() {
  const { t, isRTL } = useLanguage();
  const settings = useSettings();

  const sections = [
    {
      titleAr: "ما هي ملفات الكوكيز",
      titleEn: "What cookies are",
      bodyAr:
        "ملفات صغيرة يخزنها المتصفح على جهازك ليتذكر الموقع تفضيلاتك وزياراتك المتكررة دون تسجيل أي بيانات شخصية للهوية.",
      bodyEn:
        "Small files stored by your browser so the website can remember your preferences and repeat visits, without storing personal identity data.",
    },
    {
      titleAr: "الكوكيز الضرورية",
      titleEn: "Essential cookies",
      bodyAr:
        "مطلوبة لعمل الموقع وتبقى مفعّلة دائماً، وبدونها لا تعمل بعض الوظائف الأساسية.",
      bodyEn:
        "Required for the website to work and always active; without them some core functions fail.",
    },
    {
      titleAr: "كوكيز التفضيلات",
      titleEn: "Preferences cookies",
      bodyAr:
        "تتذكر اختياراتك مثل اللغة المفضلة (عربي أو إنجليزي) كي تُعرض الصفحة كما اخترت في زياراتك القادمة.",
      bodyEn:
        "They remember choices such as your preferred language (Arabic or English) so pages display as chosen on future visits.",
    },
    {
      titleAr: "كيف تديرها",
      titleEn: "How to manage",
      bodyAr:
        "يمكنك التحكم عبر شريط الموافقة أسفل الصفحة (إعدادات الكوكيز)، أو إعدادات المتصفح نفسه لحذفها أو منعها، مع بقاء الوظائف الأساسية.",
      bodyEn:
        "Control them via the consent banner at the bottom of the page (Cookie settings), or through your browser settings to delete or block them while keeping essential functions.",
    },
  ];

  return (
    <Layout>
      <section className="pt-32 pb-12 bg-gradient-hero text-primary-foreground" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-heritage-gold/20 mx-auto mb-5 flex items-center justify-center">
            <Cookie className="w-8 h-8 text-heritage-gold" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            {t("سياسة الكوكيز", "Cookie Policy")}
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            {t(
              "توضح هذه السياسة أنواع الملفات التي يستخدمها الموقع وكيف تديرها.",
              "This policy explains the file types the website uses and how to manage them."
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
                {t("تعديل موافقتك", "Change your consent")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t(
                  "يمكنك تعديل اختيارك في أي وقت من إعدادات الكوكيز في الشريط السفلي، أو التواصل معنا على",
                  "You may change your choice anytime from the cookie settings in the bottom banner, or contact us at"
                )}{" "}
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="text-heritage-gold hover:underline"
                  dir="ltr"
                >
                  {settings.contactEmail}
                </a>
                .
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Settings2 className="w-3.5 h-3.5 text-heritage-gold" />
                {t(
                  "تُحدَّث هذه السياسة بالتوازي مع أي تعديل على ملفات الموقع.",
                  "This policy updates in parallel with any change to the website's files."
                )}
              </p>
            </div>

            <div className="text-center">
              <Link to="/" className="text-heritage-gold hover:underline text-sm font-semibold">
                {t("العودة إلى الرئيسية", "Back to home")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
