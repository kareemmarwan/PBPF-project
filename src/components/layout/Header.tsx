import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, Globe, Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@/lib/content";

const navigation = [
  { name: "الرئيسية", nameEn: "Home", href: "/" },
  { name: "من نحن", nameEn: "About Us", href: "/about" },
  { name: "مشاريعنا", nameEn: "Projects", href: "/projects" },
  { name: "الأخبار", nameEn: "News", href: "/news" },
  { name: "المعرض", nameEn: "Gallery", href: "/gallery" },
  { name: "الكتب والقصص", nameEn: "Books", href: "/books" },
  { name: "تواصل معنا", nameEn: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, t, isRTL } = useLanguage();
  const settings = useSettings();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md shadow-heritage"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Top Bar */}
      <div
        className={`hidden md:block bg-white overflow-hidden transition-all duration-300 border-b border-heritage-gold/40 ${
          isScrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-11 items-center justify-between gap-4">
            <div className="hidden md:flex items-center gap-1 text-sm">
              <a
                href={`tel:${settings.contactPhone}`}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md text-foreground/80 hover:text-heritage-wine transition-colors"
                aria-label={t("اتصال هاتفي", "Call us")}
              >
                <Phone className="w-3.5 h-3.5 text-heritage-steel" />
                <span dir="ltr" className="font-medium">{settings.contactPhoneDisplay}</span>
              </a>
              <span className="h-4 w-px bg-border" />
              <a
                href={`mailto:${settings.contactEmail}`}
                className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-md text-foreground/80 hover:text-heritage-wine transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-heritage-steel" />
                <span dir="ltr">{settings.contactEmail}</span>
              </a>
              <span className="hidden lg:block h-4 w-px bg-border" />
              <span className="hidden xl:flex items-center gap-1.5 px-2 py-1 text-foreground/70">
                <MapPin className="w-3.5 h-3.5 text-heritage-steel" />
                {t(settings.addressAr, settings.addressEn)}
              </span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="h-7 gap-1.5 rounded-md px-2 hover:bg-transparent hover:text-heritage-wine"
              aria-label={t("تغيير اللغة", "Change language")}
            >
              <Globe className="w-3.5 h-3.5 text-heritage-steel" />
              <span className="text-xs font-medium" dir={language === "ar" ? "ltr" : "rtl"}>
                {language === "ar" ? "English" : "العربي"}
              </span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={language === "ar" ? "/assets/logonavar.png" : "/assets/logonaven.png"}
              alt={t(
                "مؤسسة جسور السلام الفلسطينية للعون والتنمية",
                "Palestinian Bridges of Peace Foundation for Relief and Development"
              )}
              className="h-9 sm:h-10 lg:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`animated-underline px-3 xl:px-4 py-2 text-sm whitespace-nowrap transition-all duration-200 ${
                  location.pathname === item.href
                    ? "is-active text-primary font-semibold"
                    : "text-foreground"
                }`}
              >
                {language === "ar" ? item.name : item.nameEn}
              </Link>
            ))}
          </nav>

          {/* Action Cluster: fallback language when scrolled + contact/donate pill + mobile controls */}
          <div className="flex items-center gap-2">
            {isScrolled && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="hidden md:flex h-9 w-9 rounded-full p-0 justify-center hover:bg-heritage-wine hover:text-primary-foreground"
                aria-label={t("تغيير اللغة", "Change language")}
                title={t("تغيير اللغة", "Change language")}
              >
                <Globe className="w-4 h-4 text-heritage-steel" />
              </Button>
            )}

            <div className="hidden lg:flex rounded-full border border-heritage-gold/60 overflow-hidden">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/contact" className="rounded-none px-3 py-2 hover:bg-heritage-wine hover:text-primary-foreground">
                  <Phone className="w-4 h-4" />
                  {t("اتصل بنا", "Contact Us")}
                </Link>
              </Button>
              <span className="w-px bg-heritage-gold/60" />
              <Button variant="gold" size="sm" asChild>
                <Link to="/#donate" className="rounded-none px-3 py-2">
                  <Heart className="w-4 h-4" />
                  {t("تبرع لنا", "Donate")}
                </Link>
              </Button>
            </div>

            <div className="lg:hidden flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="rounded-full px-3 gap-1.5 md:hidden hover:bg-heritage-wine hover:text-primary-foreground"
                aria-label={t("تغيير اللغة", "Change language")}
              >
                <Globe className="w-4 h-4 text-heritage-steel" />
                <span className="text-sm font-medium" dir={language === "ar" ? "ltr" : "rtl"}>
                  {language === "ar" ? "English" : "العربي"}
                </span>
              </Button>
              <button
                className="p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={t("القائمة", "Menu")}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {language === "ar" ? item.name : item.nameEn}
                </Link>
              ))}
              <Button variant="gold" size="lg" className="mt-2" asChild>
                <Link to="/#donate">
                  <Heart className="w-4 h-4" />
                  {t("تبرع الآن", "Donate Now")}
                </Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
