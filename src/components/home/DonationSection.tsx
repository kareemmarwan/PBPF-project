import { Button } from "@/components/ui/button";
import { Heart, Copy, Check, CreditCard, Coins, ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@/lib/content";
import bakeryImage from "@/assets/project-bakery.jpg";
import kitchenImage from "@/assets/project-kitchen.jpg";
import orphansImage from "@/assets/project-orphans.jpg";
import educationImage from "@/assets/project-education.jpg";

const SUGGESTED_AMOUNTS = [25, 50, 100, 250, 500];

const DONATION_SLIDES = [
  {
    image: bakeryImage,
    titleAr: "مشروع فرن الخير",
    titleEn: "Bread of Goodness Project",
    descAr: "رغيف طازج يومياً لأكثر من 2,000 أسرة محتاجة",
    descEn: "Fresh bread daily for over 2,000 needy families",
  },
  {
    image: kitchenImage,
    titleAr: "مشروع تكية الطعام",
    titleEn: "Community Kitchen Project",
    descAr: "وجبات ساخنة يومياً للأسر والأفراد المحتاجين",
    descEn: "Daily hot meals for needy families and individuals",
  },
  {
    image: orphansImage,
    titleAr: "مشروع كفالة الأيتام",
    titleEn: "Orphan Sponsorship Project",
    descAr: "رعاية شاملة تعليمياً وصحياً لأكثر من 300 يتيم",
    descEn: "Comprehensive education and healthcare for 300+ orphans",
  },
  {
    image: educationImage,
    titleAr: "مشروع المنح الدراسية",
    titleEn: "Scholarships Project",
    descAr: "دعم الطلاب المتفوقين من الأسر المحدودة الدخل",
    descEn: "Supporting outstanding students from low-income families",
  },
];

type DonationMethod = "paypal" | "usdt";

export function DonationSection() {
  const [amount, setAmount] = useState<number | null>(100);
  const [customValue, setCustomValue] = useState("");
  const [method, setMethod] = useState<DonationMethod>("paypal");
  const [copiedUsdt, setCopiedUsdt] = useState(false);
  const [slide, setSlide] = useState(0);
  const [slidePaused, setSlidePaused] = useState(false);
  const { t, isRTL } = useLanguage();
  const settings = useSettings();

  const nextSlide = () => setSlide((s) => (s + 1) % DONATION_SLIDES.length);
  const prevSlide = () => setSlide((s) => (s - 1 + DONATION_SLIDES.length) % DONATION_SLIDES.length);

  useEffect(() => {
    if (slidePaused) return;
    const id = setInterval(nextSlide, 5000);
    return () => clearInterval(id);
  }, [slidePaused]);

  const slideItem = DONATION_SLIDES[slide];

  const resolvedAmount = customValue.trim() !== "" ? Number(customValue) : amount;

  const hasValidAmount =
    resolvedAmount !== null && Number.isFinite(resolvedAmount) && resolvedAmount > 0;

  const selectPreset = (value: number) => {
    setAmount(value);
    setCustomValue("");
  };

  const paypalBase = settings.donationPayPalLink.replace(/\/+$/, "");
  const paypalHref = paypalBase && hasValidAmount ? `${paypalBase}/${resolvedAmount}` : "";

  const paypalLabel = hasValidAmount
    ? t(`تبرّع $${resolvedAmount} عبر باي بال`, `Donate $${resolvedAmount} via PayPal`)
    : t("تبرّع عبر باي بال", "Donate via PayPal");

  const usdtButtonLabel = copiedUsdt
    ? t("تم النسخ — أرسل المبلغ الآن", "Copied — send the amount now")
    : hasValidAmount
      ? t(`انسخ العنوان وأرسل $${resolvedAmount} USDT`, `Copy the address and send $${resolvedAmount} in USDT`)
      : t("انسخ عنوان USDT", "Copy the USDT address");

  const copyUsdt = () => {
    navigator.clipboard.writeText(settings.donationUsdtAddress);
    setCopiedUsdt(true);
    setTimeout(() => setCopiedUsdt(false), 2000);
  };

  const methodOptions: {
    id: DonationMethod;
    icon: typeof CreditCard;
    titleAr: string;
    titleEn: string;
    descAr: string;
    descEn: string;
  }[] = [
    {
      id: "paypal",
      icon: CreditCard,
      titleAr: "باي بال",
      titleEn: "PayPal",
      descAr: "دفع إلكتروني آمن وسريع",
      descEn: "Secure and instant online payment",
    },
    {
      id: "usdt",
      icon: Coins,
      titleAr: `USDT (${settings.donationUsdtNetwork})`,
      titleEn: `USDT (${settings.donationUsdtNetwork})`,
      descAr: "عملة مستقرة عبر البلوكتشين",
      descEn: "Stablecoin via blockchain",
    },
  ];

  return (
    <section id="donate" className="scroll-mt-36" dir={isRTL ? "rtl" : "ltr"}>
      <div className="grid lg:grid-cols-2 items-stretch">
        {/* Half 1: Project images carousel */}
        <div
          className="relative overflow-hidden bg-primary h-52 sm:h-64 lg:h-auto"
          onMouseEnter={() => setSlidePaused(true)}
          onMouseLeave={() => setSlidePaused(false)}
        >
          {DONATION_SLIDES.map((item, index) => (
            <img loading="lazy" decoding="async"
              key={item.image}
              src={item.image}
              alt={t(item.titleAr, item.titleEn)}
              aria-hidden={index !== slide}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                index === slide ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-primary/20" />
          <div className="absolute inset-0 bg-hero-pattern opacity-10" />

          <Button
            variant="hero-secondary"
            size="sm"
            onClick={prevSlide}
            className="hidden sm:flex absolute inset-y-0 start-0 m-auto w-9 h-9 p-0 justify-center border-none"
            aria-label={t("الشريحة السابقة", "Previous slide")}
          >
            {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          </Button>
          <Button
            variant="hero-secondary"
            size="sm"
            onClick={nextSlide}
            className="hidden sm:flex absolute inset-y-0 end-0 m-auto w-9 h-9 p-0 justify-center border-none"
            aria-label={t("الشريحة التالية", "Next slide")}
          >
            {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Button>

          <div className="absolute bottom-6 sm:bottom-8 inset-x-0">
            <div className="container mx-auto px-4 flex items-end justify-between gap-4">
              <div className="text-start" aria-live="polite">
                <span className="inline-block px-3 py-1 bg-heritage-gold text-foreground text-xs font-bold rounded-full mb-2">
                  {t("مشارك تبرعك", "Where your donation goes")}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
                  {t(slideItem.titleAr, slideItem.titleEn)}
                </h3>
                <p className="text-sm sm:text-base text-primary-foreground/80 mt-1">
                  {t(slideItem.descAr, slideItem.descEn)}
                </p>
                <div className="flex items-center gap-1.5 mt-3">
                  {DONATION_SLIDES.map((item, index) => (
                    <button
                      key={item.image}
                      onClick={() => setSlide(index)}
                      aria-label={t(`عرض الشريحة ${index + 1}`, `Show slide ${index + 1}`)}
                      aria-current={index === slide}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === slide
                          ? "w-6 bg-heritage-gold"
                          : "w-2 bg-primary-foreground/40 hover:bg-primary-foreground/70"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <Heart className="w-9 h-9 text-heritage-gold fill-current flex-shrink-0 hidden sm:block" />
            </div>
          </div>
        </div>

        {/* Half 2: Donation */}
        <div className="py-8 sm:py-10 bg-gradient-hero text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern opacity-10" />

          <div className="relative z-10 h-full flex flex-col justify-center">
            <div className="max-w-xl w-full mx-auto">
              {/* Header */}
              <div className="text-center space-y-4 mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-heritage-gold/20 animate-float">
                  <Heart className="w-6 h-6 text-heritage-gold" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">
                  {t("ساهم معنا في", "Join Us in")}{" "}
                  <span className="text-heritage-gold">{t("صنع الفرق", "Making a Difference")}</span>
                </h2>
                <p className="text-sm sm:text-base text-primary-foreground/80">
                  {t(
                    "اختَر المبلغ والوسيلة التي تناسبك في أقل من دقيقة.",
                    "Choose your amount and method in under a minute."
                  )}
                </p>
              </div>

              {/* Donation Card */}
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-primary-foreground/20 flex flex-col">
                {/* Step 1: Amount */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-primary-foreground/80">
                    {t("1. حدد مبلغ التبرع (دولار)", "1. Select donation amount (USD)")}
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {SUGGESTED_AMOUNTS.map((value) => (
                      <button
                        key={value}
                        onClick={() => selectPreset(value)}
                        aria-pressed={amount === value && customValue.trim() === ""}
                        className={`h-10 rounded-lg text-sm font-bold transition-all duration-300 border ${
                          amount === value && customValue.trim() === ""
                            ? "bg-heritage-gold text-foreground border-heritage-gold"
                            : "bg-primary-foreground/10 border-primary-foreground/20 hover:border-heritage-gold/50"
                        }`}
                      >
                        ${value}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 bg-primary-foreground/10 rounded-lg p-2 border border-primary-foreground/10">
                    <span className="ps-3 text-primary-foreground/70 font-bold">$</span>
                    <input
                      type="number"
                      min={1}
                      step={1}
                      value={customValue}
                      onChange={(e) => setCustomValue(e.target.value)}
                      placeholder={t("أو أدخل مبلغاً مخصصاً", "or type a custom amount")}
                      aria-label={t("مبلغ التبرع المخصص بالدولار", "Custom donation amount in USD")}
                      dir="ltr"
                      className="flex-1 bg-transparent py-1.5 text-sm outline-none placeholder:text-primary-foreground/50"
                    />
                  </div>
                </div>

                {/* Step 2: Method */}
                <div className="space-y-3 mt-4">
                  <p className="text-sm font-medium text-primary-foreground/80">
                    {t("2. اختَر وسيلة التبرع", "2. Choose donation method")}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {methodOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setMethod(option.id)}
                        aria-pressed={method === option.id}
                        className={`flex items-center gap-3 rounded-lg p-3 text-start transition-all duration-300 border ${
                          method === option.id
                            ? "bg-heritage-gold/20 border-heritage-gold"
                            : "bg-primary-foreground/10 border-primary-foreground/20 hover:border-heritage-gold/50"
                        }`}
                      >
                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-heritage-gold/20 flex-shrink-0">
                          <option.icon className="w-4 h-4 text-heritage-gold" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-bold truncate">{t(option.titleAr, option.titleEn)}</span>
                          <span className="block text-xs text-primary-foreground/70 truncate">{t(option.descAr, option.descEn)}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Confirm */}
                <div className="mt-4 pt-4 border-t border-primary-foreground/10 space-y-3 flex flex-col flex-1 justify-end">
                  <p className="text-sm font-medium text-primary-foreground/80">
                    {t("3. أكّد التبرع", "3. Confirm donation")}
                  </p>

                  {method === "paypal" ? (
                    <>
                      {paypalHref ? (
                        <Button variant="gold" size="lg" className="w-full" asChild>
                          <a href={paypalHref} target="_blank" rel="noreferrer">
                            {paypalLabel}
                            <Heart className={`w-5 h-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                          </a>
                        </Button>
                      ) : (
                        <>
                          <Button variant="gold" size="lg" className="w-full" disabled>
                            {paypalLabel}
                            <Heart className={`w-5 h-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                          </Button>
                          <p className="text-xs text-primary-foreground/60 text-center">
                            {t(
                              "زر باي بال يُفعَّل بعد اعتماد الرابط الرسمي للمؤسسة.",
                              "The PayPal button activates once the official link is approved."
                            )}
                          </p>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 bg-primary-foreground/10 rounded-lg p-2.5 border border-primary-foreground/10">
                        <code className="flex-1 text-sm font-mono truncate" dir="ltr">
                          {settings.donationUsdtAddress}
                        </code>
                        <button
                          onClick={copyUsdt}
                          className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
                          aria-label={t("نسخ عنوان محفظة USDT", "Copy USDT wallet address")}
                        >
                          {copiedUsdt ? (
                            <Check className="w-4 h-4 text-heritage-gold" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <Button variant="gold" size="lg" className="w-full" onClick={copyUsdt}>
                        {copiedUsdt ? (
                          <Check className={`w-5 h-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                        ) : (
                          <Copy className={`w-5 h-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                        )}
                        {usdtButtonLabel}
                      </Button>
                      <p className="text-xs text-primary-foreground/60 text-center">
                        {t(
                          "أرسل المبلغ إلى العنوان أعلاه ثم أبلغنا عبر نموذج التواصل لتسجيل تبرعك وإرسال شهادة التقدير.",
                          "Send the amount to the address above, then notify us via the contact form to register your donation and receive a certificate."
                        )}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Trust Note */}
              <p className="text-sm text-primary-foreground/60 max-w-lg mx-auto text-center mt-4">
                {t(
                  "نلتزم بالشفافية الكاملة في استخدام التبرعات. يمكنك متابعة أثر تبرعك من خلال تقاريرنا الدورية.",
                  "We are committed to full transparency in using donations. You can track the impact of your donation through our periodic reports."
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
