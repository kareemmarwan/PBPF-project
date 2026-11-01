import { Megaphone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const tickerItems = [
  {
    titleAr: "توزيع 500 وجبة يومياً ضمن مشروع تكية الطعام",
    titleEn: "500 meals distributed daily under the Food Kitchen project",
  },
  {
    titleAr: "تكفل بـ 300 يتيم جديد خلال الشهر الجاري",
    titleEn: "300 new orphans sponsored during this month",
  },
  {
    titleAr: "بدء صرف المنح الدراسية للعام الجديد",
    titleEn: "Scholarship disbursement for the new academic year has started",
  },
  {
    titleAr: "التسجيل مفتوح للمتطوعين في مشروع فرن الخير",
    titleEn: "Volunteer registration is open for the Good Bakery project",
  },
  {
    titleAr: "أكثر من 10,000 مستفيد من مشاريع المؤسسة حتى الآن",
    titleEn: "Over 10,000 beneficiaries served by the foundation's projects so far",
  },
  {
    titleAr: "حملة السلال الغذائية تصل إلى 2,000 أسرة متضررة",
    titleEn: "Food basket campaign reached 2,000 affected families",
  },
  {
    titleAr: "أكثر من 50 متطوعاً يشاركون في أنشطة المؤسسة الموسمية",
    titleEn: "More than 50 volunteers joined the foundation's seasonal activities",
  },
  {
    titleAr: "معرض التراث العربي السنوي يقام في قاعة المؤسسة",
    titleEn: "The annual Arab heritage exhibition is held at the foundation's hall",
  },
];

export function NewsTicker() {
  const { language, isRTL, t } = useLanguage();

  return (
    <div
      className="news-ticker flex h-9 items-stretch border-y border-heritage-gold/30 bg-heritage-wine text-primary-foreground"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <ul className="sr-only">
        {tickerItems.map((item) => (
          <li key={item.titleEn}>{t(item.titleAr, item.titleEn)}</li>
        ))}
      </ul>
      <span
        className="flex shrink-0 items-center gap-2 bg-heritage-gold px-3 lg:px-4"
        aria-hidden="true"
      >
        <Megaphone className="w-3.5 h-3.5 text-heritage-wine" />
        <span className="text-xs font-bold whitespace-nowrap">
          {t("أخبار عاجلة", "Breaking News")}
        </span>
      </span>
      <div aria-hidden="true" className="relative flex-1 overflow-hidden" dir={isRTL ? "ltr" : "rtl"}>
        <div
          className={`flex h-full w-max items-center ${
            isRTL ? "ticker-track-left" : "ticker-track-right"
          }`}
        >
          {[
            ...tickerItems,
            ...tickerItems,
            ...tickerItems,
            ...tickerItems,
          ].map((item, index) => (
            <span
              key={index}
              className="flex flex-row-reverse items-center gap-2 px-4 text-xs font-medium whitespace-nowrap sm:text-sm"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-heritage-gold" />
              {language === "ar" ? item.titleAr : item.titleEn}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
