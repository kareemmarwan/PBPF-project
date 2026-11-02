import type { AdminRow } from "@/lib/content";

export type FieldType = "text" | "textarea" | "date" | "number" | "image" | "select";

export interface FieldDef {
  key: string;
  labelAr: string;
  labelEn: string;
  type: FieldType;
  options?: string[];
}

export interface ResourceDef {
  key: string;
  table: string;
  titleAr: string;
  titleEn: string;
  icon: string;
  fields: FieldDef[];
  order?: string;
  primary: (row: AdminRow) => string;
  secondary?: (row: AdminRow) => string;
}

export const resources: ResourceDef[] = [
  {
    key: "news",
    table: "news",
    titleAr: "الأخبار",
    titleEn: "News",
    icon: "Newspaper",
    order: "event_date",
    fields: [
      { key: "title_ar", labelAr: "العنوان (عربي)", labelEn: "Title (AR)", type: "text" },
      { key: "title_en", labelAr: "العنوان (إنجليزي)", labelEn: "Title (EN)", type: "text" },
      { key: "excerpt_ar", labelAr: "المقتطف (عربي)", labelEn: "Excerpt (AR)", type: "textarea" },
      { key: "excerpt_en", labelAr: "المقتطف (إنجليزي)", labelEn: "Excerpt (EN)", type: "textarea" },
      { key: "content_ar", labelAr: "المحتوى (عربي)", labelEn: "Content (AR)", type: "textarea" },
      { key: "content_en", labelAr: "المحتوى (إنجليزي)", labelEn: "Content (EN)", type: "textarea" },
      { key: "category_ar", labelAr: "الفئة (عربي)", labelEn: "Category (AR)", type: "text" },
      { key: "category_en", labelAr: "الفئة (إنجليزي)", labelEn: "Category (EN)", type: "text" },
      { key: "event_date", labelAr: "التاريخ", labelEn: "Date", type: "date" },
      { key: "image_url", labelAr: "صورة (رابط أو رفع)", labelEn: "Image (URL or upload)", type: "image" },
    ],
    primary: (row) => String(row["title_ar"] ?? row["title_en"] ?? ""),
    secondary: (row) => `${String(row["category_ar"] ?? "")} · ${String(row["event_date"] ?? "")}`,
  },
  {
    key: "projects",
    table: "projects",
    titleAr: "المشاريع",
    titleEn: "Projects",
    icon: "HandHeart",
    fields: [
      { key: "slug", labelAr: "المعرّف (مثل bakery)", labelEn: "Slug (e.g. bakery)", type: "text" },
      { key: "title_ar", labelAr: "العنوان (عربي)", labelEn: "Title (AR)", type: "text" },
      { key: "title_en", labelAr: "العنوان (إنجليزي)", labelEn: "Title (EN)", type: "text" },
      { key: "desc_short_ar", labelAr: "وصف مختصر (بطاقة)", labelEn: "Short desc (card)", type: "textarea" },
      { key: "desc_short_en", labelAr: "وصف مختصر (إنجليزي)", labelEn: "Short desc (EN)", type: "textarea" },
      { key: "desc_long_ar", labelAr: "وصف مفصل", labelEn: "Long desc (AR)", type: "textarea" },
      { key: "desc_long_en", labelAr: "وصف مفصل (إنجليزي)", labelEn: "Long desc (EN)", type: "textarea" },
      { key: "beneficiaries_ar", labelAr: "شارة المستفيدين (عربي)", labelEn: "Beneficiaries badge (AR)", type: "text" },
      { key: "beneficiaries_en", labelAr: "شارة المستفيدين (إنجليزي)", labelEn: "Beneficiaries badge (EN)", type: "text" },
      { key: "stats", labelAr: "الإحصائيات JSON", labelEn: "Stats JSON", type: "textarea" },
      { key: "image_url", labelAr: "الصورة", labelEn: "Image", type: "image" },
    ],
    primary: (row) => String(row["title_ar"] ?? row["title_en"] ?? ""),
    secondary: (row) => String(row["slug"] ?? ""),
  },
  {
    key: "gallery",
    table: "gallery_images",
    titleAr: "معرض الصور",
    titleEn: "Gallery",
    icon: "Image",
    fields: [
      { key: "image_url", labelAr: "الصورة", labelEn: "Image", type: "image" },
      { key: "alt_ar", labelAr: "الوصف (عربي)", labelEn: "Alt (AR)", type: "text" },
      { key: "alt_en", labelAr: "الوصف (إنجليزي)", labelEn: "Alt (EN)", type: "text" },
      { key: "category", labelAr: "الفئة", labelEn: "Category", type: "select", options: ["مشاريع", "نشاطات", "فعاليات"] },
    ],
    primary: (row) => String(row["alt_ar"] ?? row["alt_en"] ?? ""),
    secondary: (row) => String(row["category"] ?? ""),
  },
  {
    key: "books",
    table: "books",
    titleAr: "الكتب",
    titleEn: "Books",
    icon: "BookOpen",
    fields: [
      { key: "title_ar", labelAr: "العنوان (عربي)", labelEn: "Title (AR)", type: "text" },
      { key: "title_en", labelAr: "العنوان (إنجليزي)", labelEn: "Title (EN)", type: "text" },
      { key: "desc_ar", labelAr: "الوصف (عربي)", labelEn: "Desc (AR)", type: "textarea" },
      { key: "desc_en", labelAr: "الوصف (إنجليزي)", labelEn: "Desc (EN)", type: "textarea" },
      { key: "year", labelAr: "السنة", labelEn: "Year", type: "text" },
      { key: "pages", labelAr: "عدد الصفحات", labelEn: "Pages", type: "number" },
      { key: "pdf_url", labelAr: "رابط ملف PDF", labelEn: "PDF URL", type: "text" },
    ],
    primary: (row) => String(row["title_ar"] ?? row["title_en"] ?? ""),
    secondary: (row) => `${String(row["year"] ?? "")} · ${String(row["pages"] ?? "")} p`,
  },
  {
    key: "stories",
    table: "stories",
    titleAr: "قصص النازحين",
    titleEn: "Stories",
    icon: "Quote",
    fields: [
      { key: "title_ar", labelAr: "العنوان (عربي)", labelEn: "Title (AR)", type: "text" },
      { key: "title_en", labelAr: "العنوان (إنجليزي)", labelEn: "Title (EN)", type: "text" },
      { key: "excerpt_ar", labelAr: "المقتطف (عربي)", labelEn: "Excerpt (AR)", type: "textarea" },
      { key: "excerpt_en", labelAr: "المقتطف (إنجليزي)", labelEn: "Excerpt (EN)", type: "textarea" },
    ],
    primary: (row) => String(row["title_ar"] ?? row["title_en"] ?? ""),
    secondary: (row) => String(row["excerpt_ar"] ?? ""),
  },
  {
    key: "testimonials",
    table: "testimonials",
    titleAr: "شهادات المستفيدين",
    titleEn: "Testimonials",
    icon: "MessageSquareQuote",
    fields: [
      { key: "content_ar", labelAr: "النص (عربي)", labelEn: "Content (AR)", type: "textarea" },
      { key: "content_en", labelAr: "النص (إنجليزي)", labelEn: "Content (EN)", type: "textarea" },
      { key: "name_ar", labelAr: "الاسم (عربي)", labelEn: "Name (AR)", type: "text" },
      { key: "name_en", labelAr: "الاسم (إنجليزي)", labelEn: "Name (EN)", type: "text" },
      { key: "role_ar", labelAr: "الصفة (عربي)", labelEn: "Role (AR)", type: "text" },
      { key: "role_en", labelAr: "الصفة (إنجليزي)", labelEn: "Role (EN)", type: "text" },
      { key: "location_ar", labelAr: "المدينة (عربي)", labelEn: "Location (AR)", type: "text" },
      { key: "location_en", labelAr: "المدينة (إنجليزي)", labelEn: "Location (EN)", type: "text" },
    ],
    primary: (row) => String(row["name_ar"] ?? row["name_en"] ?? ""),
    secondary: (row) => String(row["role_ar"] ?? ""),
  },
  {
    key: "impact",
    table: "impact_stats",
    titleAr: "أرقام الأثر",
    titleEn: "Impact Stats",
    icon: "ChartColumn",
    fields: [
      { key: "icon", labelAr: "الأيقونة", labelEn: "Icon", type: "select", options: ["Users", "Utensils", "Heart", "GraduationCap", "Home", "Gift"] },
      { key: "value", labelAr: "القيمة", labelEn: "Value", type: "text" },
      { key: "label_ar", labelAr: "الوسم (عربي)", labelEn: "Label (AR)", type: "text" },
      { key: "label_en", labelAr: "الوسم (إنجليزي)", labelEn: "Label (EN)", type: "text" },
      { key: "desc_ar", labelAr: "وصف مختصر (عربي)", labelEn: "Short desc (AR)", type: "text" },
      { key: "desc_en", labelAr: "وصف مختصر (إنجليزي)", labelEn: "Short desc (EN)", type: "text" },
    ],
    primary: (row) => `${String(row["value"] ?? "")} ${String(row["label_ar"] ?? "")}`,
    secondary: (row) => String(row["desc_ar"] ?? ""),
  },
  {
    key: "team",
    table: "team_members",
    titleAr: "أعضاء المؤسسة",
    titleEn: "Team Members",
    icon: "Users",
    order: "sort_index",
    fields: [
      { key: "name_ar", labelAr: "الاسم (عربي)", labelEn: "Name (AR)", type: "text" },
      { key: "name_en", labelAr: "الاسم (إنجليزي)", labelEn: "Name (EN)", type: "text" },
      { key: "role_ar", labelAr: "المنصب (عربي)", labelEn: "Role (AR)", type: "text" },
      { key: "role_en", labelAr: "المنصب (إنجليزي)", labelEn: "Role (EN)", type: "text" },
      { key: "bio_ar", labelAr: "نبذة (عربي)", labelEn: "Bio (AR)", type: "textarea" },
      { key: "bio_en", labelAr: "نبذة (إنجليزي)", labelEn: "Bio (EN)", type: "textarea" },
      { key: "category", labelAr: "الفئة", labelEn: "Category", type: "select", options: ["مجلس الإدارة", "فريق العمل", "متطوعون"] },
      { key: "photo_url", labelAr: "الصورة (اختيارية)", labelEn: "Photo (optional)", type: "image" },
      { key: "sort_index", labelAr: "ترتيب العرض", labelEn: "Sort order", type: "number" },
    ],
    primary: (row) => String(row["name_ar"] ?? row["name_en"] ?? ""),
    secondary: (row) => String(row["role_ar"] ?? ""),
  },
  {
    key: "hero-images",
    table: "hero_images",
    titleAr: "صور الهيرو",
    titleEn: "Hero Images",
    icon: "Images",
    order: "sort_index",
    fields: [
      { key: "image_url", labelAr: "الصورة", labelEn: "Image", type: "image" },
      { key: "alt_ar", labelAr: "الوصف (عربي)", labelEn: "Alt (AR)", type: "text" },
      { key: "alt_en", labelAr: "الوصف (إنجليزي)", labelEn: "Alt (EN)", type: "text" },
      { key: "sort_index", labelAr: "ترتيب الدورة", labelEn: "Cycle order", type: "number" },
    ],
    primary: (row) => String(row["alt_ar"] ?? row["alt_en"] ?? ""),
    secondary: (row) => String(row["image_url"] ?? ""),
  },
  {
    key: "hero-stats",
    table: "hero_stats",
    titleAr: "إحصائيات الهيرو",
    titleEn: "Hero Stats",
    icon: "ChartColumn",
    order: "sort_index",
    fields: [
      { key: "value", labelAr: "القيمة (مثل 10,000+)", labelEn: "Value (e.g. 10,000+)", type: "text" },
      { key: "label_ar", labelAr: "الوسم (عربي)", labelEn: "Label (AR)", type: "text" },
      { key: "label_en", labelAr: "الوسم (إنجليزي)", labelEn: "Label (EN)", type: "text" },
      { key: "sort_index", labelAr: "الترتيب", labelEn: "Sort order", type: "number" },
    ],
    primary: (row) => `${String(row["value"] ?? "")} ${String(row["label_ar"] ?? "")}`,
    secondary: (row) => String(row["label_en"] ?? ""),
  },
];

export const resourceMap = new Map(resources.map((r) => [r.key, r]));
