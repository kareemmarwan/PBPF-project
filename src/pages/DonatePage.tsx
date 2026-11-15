import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Copy, Check, CreditCard, Coins } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@/lib/content";
import { usePageTitle } from "@/hooks/use-page-title";

export default function DonatePage() {
  const [copiedIban, setCopiedIban] = useState(false);
  const [copiedUsdt, setCopiedUsdt] = useState(false);
  const [amount, setAmount] = useState<number | null>(100);
  const [customValue, setCustomValue] = useState("");
  const { t, isRTL } = useLanguage();
  usePageTitle({
    titleAr: "تبرع لنا | مؤسسة جسور السلام",
    titleEn: "Donate | Palestinian Bridges of Peace",
  });

  const settings = useSettings();

  const ibanNumber = settings.donationIban;

  const copyIban = () => {
    navigator.clipboard.writeText(ibanNumber.replace(/\s/g, ""));
    setCopiedIban(true);
    setTimeout(() => setCopiedIban(false), 2000);
  };

  const SUGGESTED_AMOUNTS = [25, 50, 100, 250, 500];

  const selectAmount = (value: number) => {
    setAmount(value);
    setCustomValue("");
  };

  const resolvedAmount = customValue.trim() !== "" ? Number(customValue) : amount;
  const hasValidAmount =
    resolvedAmount !== null && Number.isFinite(resolvedAmount) && resolvedAmount > 0;

  const paypalBase = settings.donationPayPalLink.replace(/\/+$/, "");
  const paypalHref = paypalBase && hasValidAmount ? `${paypalBase}/${resolvedAmount}` : "";

  const paypalLabel = hasValidAmount
    ? t(`تبرّع $${resolvedAmount} عبر باي بال`, `Donate $${resolvedAmount} via PayPal`)
    : t("تبرّع عبر باي بال", "Donate via PayPal");

  const copyUsdt = () => {
    navigator.clipboard.writeText(settings.donationUsdtAddress);
    setCopiedUsdt(true);
    setTimeout(() => setCopiedUsdt(false), 2000);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-hero text-primary-foreground" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-heritage-gold/20 mx-auto mb-6 flex items-center justify-center">
            <Heart className="w-10 h-10 text-heritage-gold" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            {t("ساهم في", "Contribute to")} <span className="text-heritage-gold">{t("الخير", "Goodness")}</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            {t(
              "تبرعك يصنع فرقاً حقيقياً في حياة المحتاجين والأيتام",
              "Your donation makes a real difference in the lives of the needy and orphans"
            )}
          </p>
        </div>
      </section>

      {/* Donation Methods */}
      <section className="py-20 bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* IBAN Card */}
            <Card variant="heritage" className="p-8">
              <CardContent className="p-0 space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-2">{t("التحويل البنكي", "Bank Transfer")}</h2>
                  <p className="text-muted-foreground">
                    {t("يمكنك التبرع عبر التحويل المصرفي", "You can donate via bank transfer")}
                  </p>
                </div>
                <div className="bg-muted rounded-xl p-6">
                  <p className="text-sm text-muted-foreground mb-2">{t("رقم الآيبان (IBAN)", "IBAN Number")}</p>
                  <div className="flex items-center gap-3 bg-background rounded-lg p-4">
                    <code className="flex-1 text-lg font-mono text-foreground" dir="ltr">
                      {ibanNumber}
                    </code>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={copyIban}
                      aria-label={t("نسخ رقم الآيبان", "Copy IBAN")}
                    >
                      {copiedIban ? (
                        <Check className="w-4 h-4 text-heritage-gold-text" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    {t(
                      `اسم الحساب: ${settings.donationAccountNameAr}`,
                      `Account name: ${settings.donationAccountNameEn}`
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* PayPal Card */}
            <Card variant="heritage" className="p-8">
              <CardContent className="p-0 space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-2">{t("باي بال", "PayPal")}</h2>
                  <p className="text-muted-foreground">
                    {t("دفع إلكتروني آمن وسريع", "Secure and instant online payment")}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2 text-center">
                    {t("حدد مبلغ التبرع (دولار)", "Select donation amount (USD)")}
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {SUGGESTED_AMOUNTS.map((value) => (
                      <button
                        key={value}
                        onClick={() => selectAmount(value)}
                        aria-pressed={amount === value && customValue.trim() === ""}
                        className={`h-10 rounded-lg text-sm font-bold transition-all duration-300 border ${
                          amount === value && customValue.trim() === ""
                            ? "bg-heritage-gold text-foreground border-heritage-gold"
                            : "bg-muted text-foreground border-border hover:border-heritage-gold/50"
                        }`}
                      >
                        ${value}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 bg-muted rounded-lg p-2 border border-border mt-2">
                    <span className="ps-3 text-muted-foreground font-bold">$</span>
                    <input
                      type="number"
                      min={1}
                      step={1}
                      value={customValue}
                      onChange={(e) => setCustomValue(e.target.value)}
                      placeholder={t("أو أدخل مبلغاً مخصصاً", "or type a custom amount")}
                      aria-label={t("مبلغ التبرع المخصص بالدولار", "Custom donation amount in USD")}
                      dir="ltr"
                      className="flex-1 bg-transparent py-1.5 text-sm outline-none placeholder:text-muted-foreground/70"
                    />
                  </div>
                </div>
                {paypalHref ? (
                  <Button variant="gold" size="xl" asChild className="w-full max-w-sm mx-auto">
                    <a href={paypalHref} target="_blank" rel="noreferrer">
                      <CreditCard className="w-5 h-5" />
                      {paypalLabel}
                    </a>
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Button variant="gold" size="xl" className="w-full max-w-sm mx-auto" disabled>
                      <CreditCard className="w-5 h-5" />
                      {paypalLabel}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      {t(
                        "زر باي بال يُفعَّل بعد اعتماد الرابط الرسمي للمؤسسة.",
                        "The PayPal button activates once the official link is approved."
                      )}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* USDT Card */}
            <Card variant="heritage" className="p-8">
              <CardContent className="p-0 space-y-6 text-center">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {`USDT (${settings.donationUsdtNetwork})`}
                  </h2>
                  <p className="text-muted-foreground">
                    {t("عملة مستقرة عبر البلوكتشين", "Stablecoin via blockchain")}
                  </p>
                </div>
                <div className="bg-muted rounded-xl p-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    {t("عنوان المحفظة", "Wallet address")}
                  </p>
                  <div className="flex items-center gap-3 bg-background rounded-lg p-4">
                    <code className="flex-1 text-sm font-mono text-foreground truncate" dir="ltr">
                      {settings.donationUsdtAddress}
                    </code>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={copyUsdt}
                      aria-label={t("نسخ عنوان محفظة USDT", "Copy USDT wallet address")}
                    >
                      {copiedUsdt ? (
                        <Check className="w-4 h-4 text-heritage-gold-text" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t(
                    "أرسل المبلغ إلى العنوان أعلاه ثم أبلغنا عبر",
                    "Send the amount to the address above, then notify us via"
                  )}{" "}
                  <Link to="/contact" className="text-heritage-gold-text hover:underline">
                    {t("نموذج التواصل", "the contact form")}
                  </Link>{" "}
                  {t(
                    "لتسجيل تبرعك وإرسال شهادة التقدير.",
                    "to register your donation and receive a certificate."
                  )}
                </p>
              </CardContent>
            </Card>

            {/* Quick Pay Card */}
            <Card variant="heritage" className="p-8">
              <CardContent className="p-0 space-y-6 text-center">
                <h2 className="text-2xl font-bold text-foreground">{t("الدفع السريع", "Quick Pay")}</h2>
                <p className="text-muted-foreground">
                  {t("يمكنك التبرع عبر تطبيق كليك", "You can donate via the Click app")}
                </p>
                {settings.donationClickLink ? (
                  <Button variant="gold" size="xl" asChild className="w-full max-w-sm mx-auto">
                    <a href={settings.donationClickLink} target="_blank" rel="noreferrer">
                      <Heart className="w-5 h-5" />
                      {t("تبرع عبر كليك", "Donate via Click")}
                    </a>
                  </Button>
                ) : (
                  <Button variant="gold" size="xl" className="w-full max-w-sm mx-auto">
                    <Heart className="w-5 h-5" />
                    {t("تبرع عبر كليك", "Donate via Click")}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Note */}
            <div className="text-center p-6 bg-heritage-gold/10 rounded-2xl">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">{t("ملاحظة:", "Note:")}</strong>{" "}
                {t(
                  "بعد إتمام التبرع، يرجى إرسال إشعار التحويل عبر",
                  "After completing the donation, please send the transfer notice via"
                )}{" "}
                <Link to="/contact" className="text-heritage-gold-text hover:underline">
                  {t("نموذج التواصل", "the contact form")}
                </Link>{" "}
                {t(
                  "ليتم تسجيل تبرعكم وإرسال شهادة التقدير.",
                  "so your donation can be registered and an appreciation certificate sent."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
