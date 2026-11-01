import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CookieIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const STORAGE_KEY = "cookie-consent";

type ConsentValue = "all" | "essential";

function readStoredConsent(): ConsentValue | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "all" || value === "essential" ? value : null;
  } catch {
    return null;
  }
}

function writeConsent(value: ConsentValue) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    return;
  }
}

export function CookieConsent() {
  const { t, isRTL } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    if (readStoredConsent() === null) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const decide = (value: ConsentValue) => {
    writeConsent(value);
    setSettingsOpen(false);
    setVisible(false);
  };

  return (
    <>
      <div
        dir={isRTL ? "rtl" : "ltr"}
        role="region"
        aria-label={t("تنبيه ملفات تعريف الارتباط", "Cookie notice")}
        className="fixed inset-x-0 bottom-0 z-40 animate-in slide-in-from-bottom-6 fade-in duration-500"
      >
        <div className="container mx-auto px-4 pb-4 sm:pb-5">
          <div className="bg-card/95 backdrop-blur-md border border-heritage-gold/30 rounded-xl shadow-heritage p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <CookieIcon
                aria-hidden="true"
                className="w-8 h-8 text-heritage-gold flex-shrink-0 hidden sm:block"
              />
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {t(
                  "يستخدم هذا الموقع ملفات تعريف الارتباط (Cookies) لمنحك التجربة الأنسب عبر تذكّر تفضيلاتك وزياراتك المتكررة. بالنقر على «قبول» فإنك توافق على استخدام جميع ملفات الكوكيز.",
                  "This website uses cookies to give you the most relevant experience by remembering your preferences and repeat visits. By clicking “Accept”, you consent to the use of all the cookies."
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Button
                  variant="heritage-outline"
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => setSettingsOpen(true)}
                >
                  {t("إعدادات الكوكيز", "Cookie settings")}
                </Button>
                <Button
                  variant="gold"
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => decide("all")}
                >
                  {t("قبول", "Accept")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent
          dir={isRTL ? "rtl" : "ltr"}
          className="sm:max-w-md"
        >
          <DialogHeader className="text-start">
            <DialogTitle>{t("إعدادات الكوكيز", "Cookie Settings")}</DialogTitle>
            <DialogDescription>
              {t(
                "نستخدم ملفات تعريف الارتباط لتحسين تجربتك في التصفح. يمكنك اختيار المستوى الذي توافق عليه.",
                "We use cookies to improve your browsing experience. You can choose the level you consent to."
              )}
            </DialogDescription>
          </DialogHeader>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-heritage-gold flex-shrink-0" />
              <span>
                {t(
                  "الضرورية — مطلوبة لعمل الموقع، مفعّلة دائماً.",
                  "Essential — required for the site to work, always active."
                )}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-muted-foreground/60 flex-shrink-0" />
              <span>
                {t(
                  "التفضيلات — تذكّر خياراتك، مثل اختيار اللغة.",
                  "Preferences — remember your choices, such as your language selection."
                )}
              </span>
            </li>
          </ul>
          <div className="-mt-1">
            <Link to="/cookies" className="text-sm text-heritage-gold hover:underline font-medium">
              {t("الاطلاع على سياسة الكوكيز الكاملة", "Read the full cookie policy")}
            </Link>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="heritage-outline"
              size="sm"
              className="w-full sm:w-auto"
              onClick={() => decide("essential")}
            >
              {t("الضرورية فقط", "Essential only")}
            </Button>
            <Button
              variant="gold"
              size="sm"
              className="w-full sm:w-auto"
              onClick={() => decide("all")}
            >
              {t("قبول الكل", "Accept all")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
