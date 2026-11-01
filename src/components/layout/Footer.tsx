import { Link } from "react-router-dom";
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@/lib/content";
const quickLinks = [
  { name: "الرئيسية", nameEn: "Home", href: "/" },
  { name: "من نحن", nameEn: "About Us", href: "/about" },
  { name: "مشاريعنا", nameEn: "Projects", href: "/projects" },
  { name: "تبرع الآن", nameEn: "Donate Now", href: "/#donate" },
];

const projectLinks = [
  { name: "فرن الخير", nameEn: "Bread of Goodness", href: "/projects#bakery" },
  { name: "تكية الطعام", nameEn: "Community Kitchen", href: "/projects#kitchen" },
  { name: "كفالة الأيتام", nameEn: "Orphan Sponsorship", href: "/projects#orphans" },
  { name: "المنح الدراسية", nameEn: "Scholarships", href: "/projects#education" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

export function Footer() {
  const { t, language, isRTL } = useLanguage();
  const settings = useSettings();

  return (
    <footer className="bg-primary text-primary-foreground" dir={isRTL ? "rtl" : "ltr"}>
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="space-y-6">
            <img
              src={language === "ar" ? "/assets/logofooterar.png" : "/assets/logofooteren.png"}
              alt={t(
                "مؤسسة جسور السلام الفلسطينية للعون والتنمية",
                "Palestinian Bridges of Peace Foundation for Relief and Development"
              )}
              className="h-14 sm:h-16 w-auto object-contain"
            />
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              {t(
                "مؤسسة ثقافية وإنسانية تسعى لخدمة المجتمع من خلال مشاريع خيرية متنوعة تلبي احتياجات الأسر المحتاجة والأيتام.",
                "A cultural and humanitarian organization striving to serve the community through various charitable projects that meet the needs of families in need and orphans."
              )}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-heritage-gold hover:text-foreground transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold">{t("روابط سريعة", "Quick Links")}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.nameEn}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-heritage-gold transition-colors text-sm"
                  >
                    {language === "ar" ? link.name : link.nameEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold">{t("مشاريعنا", "Our Projects")}</h3>
            <ul className="space-y-3">
              {projectLinks.map((link) => (
                <li key={link.nameEn}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-heritage-gold transition-colors text-sm"
                  >
                    {language === "ar" ? link.name : link.nameEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold">{t("تواصل معنا", "Contact Us")}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-heritage-gold flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  {t(settings.addressAr, settings.addressEn)}
                </span>
              </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-heritage-gold flex-shrink-0" />
                  <a
                    href={`tel:${settings.contactPhone}`}
                    className="text-primary-foreground/80 hover:text-heritage-gold transition-colors text-sm"
                    dir="ltr"
                  >
                    {settings.contactPhoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-heritage-gold flex-shrink-0" />
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="text-primary-foreground/80 hover:text-heritage-gold transition-colors text-sm"
                  >
                    {settings.contactEmail}
                  </a>
                </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} {t("مؤسسة جسور السلام الفلسطينية للعون والتنمية. جميع الحقوق محفوظة.", "Palestinian Bridges of Peace Foundation for Relief and Development. All rights reserved.")}
            </p>
            <div className="flex items-center gap-2 text-primary-foreground/60 text-sm">
              <span>{t("صُنع بـ", "Made with")}</span>
              <Heart className="w-4 h-4 text-heritage-gold fill-current" />
              <span>{t("لخدمة المجتمع", "to serve the community")}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4 pt-4 border-t border-primary-foreground/10">
            <Link to="/privacy" className="text-xs text-primary-foreground/50 hover:text-heritage-gold transition-colors">
              {t("سياسة الخصوصية", "Privacy Policy")}
            </Link>
            <Link to="/terms" className="text-xs text-primary-foreground/50 hover:text-heritage-gold transition-colors">
              {t("شروط الاستخدام", "Terms of Use")}
            </Link>
            <Link to="/cookies" className="text-xs text-primary-foreground/50 hover:text-heritage-gold transition-colors">
              {t("سياسة الكوكيز", "Cookie Policy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
