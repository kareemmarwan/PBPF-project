import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@/lib/content";
import { safeSupabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { t, isRTL } = useLanguage();
  const settings = useSettings();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sb = safeSupabase();
    if (!sb) {
      toast({ title: t("تسجيل الرسائل غير مهيأ بعد", "Message service not configured"), variant: "destructive" });
      return;
    }
    const { error } = await sb.from("messages").insert({
      name: formData.name,
      email: formData.email,
      message: formData.message,
    });
    if (error) {
      toast({ title: t("تعذر إرسال الرسالة", "Could not send message"), description: error.message, variant: "destructive" });
      return;
    }
    setFormData({ name: "", email: "", message: "" });
    toast({ title: t("تم إرسال رسالتك بنجاح", "Your message was sent successfully") });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-hero text-primary-foreground" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-heritage-gold/20 text-heritage-gold text-sm font-semibold rounded-full mb-6">
            {t("تواصل معنا", "Contact Us")}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            {t("نسعد", "We'd be delighted")} <span className="text-heritage-gold">{t("بتواصلكم", "by your message")}</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            {t(
              "لأي استفسار أو اقتراح، لا تترددوا في التواصل معنا",
              "For any inquiry or suggestion, feel free to reach out to us"
            )}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <Card variant="heritage" className="p-8">
              <CardContent className="p-0">
                <h2 className="text-2xl font-bold text-foreground mb-6">{t("أرسل رسالة", "Send a Message")}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t("الاسم الكامل", "Full Name")}
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t("أدخل اسمك", "Enter your name")}
                      className="h-12"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t("البريد الإلكتروني", "Email Address")}
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@email.com"
                      className="h-12"
                      dir="ltr"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t("الرسالة", "Message")}
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t("اكتب رسالتك هنا...", "Write your message here...")}
                      rows={5}
                      required
                    />
                  </div>
                  <Button variant="gold" size="lg" type="submit" className="w-full">
                    <Send className="w-4 h-4" />
                    {t("إرسال الرسالة", "Send Message")}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">{t("معلومات التواصل", "Contact Information")}</h2>
              <p className="text-muted-foreground">
                {t("يمكنكم التواصل معنا عبر القنوات التالية", "You can reach us through the following channels")}
              </p>
              <div className="space-y-4">
                <Card variant="elevated" className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-heritage-gold/10 text-heritage-gold flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{t("العنوان", "Address")}</h3>
                      <p className="text-muted-foreground text-sm">
                        {t(settings.addressAr, settings.addressEn)}
                      </p>
                    </div>
                  </div>
                </Card>
                <Card variant="elevated" className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-heritage-gold/10 text-heritage-gold flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{t("الهاتف", "Phone")}</h3>
                      <a
                        href={`tel:${settings.contactPhone}`}
                        className="text-muted-foreground text-sm hover:text-heritage-gold"
                        dir="ltr"
                      >
                        {settings.contactPhoneDisplay}
                      </a>
                    </div>
                  </div>
                </Card>
                <Card variant="elevated" className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-heritage-gold/10 text-heritage-gold flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{t("البريد الإلكتروني", "Email Address")}</h3>
                      <a
                        href={`mailto:${settings.contactEmail}`}
                        className="text-muted-foreground text-sm hover:text-heritage-gold"
                      >
                        {settings.contactEmail}
                      </a>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
