import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PageMeta {
  titleAr: string;
  titleEn: string;
  descAr?: string;
  descEn?: string;
}

export function usePageTitle({ titleAr, titleEn, descAr, descEn }: PageMeta) {
  const { language } = useLanguage();
  useEffect(() => {
    document.title = language === "ar" ? titleAr : titleEn;
    if (descAr && descEn) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", language === "ar" ? descAr : descEn);
    }
  }, [language, titleAr, titleEn, descAr, descEn]);
}
