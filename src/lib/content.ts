import { useQuery } from "@tanstack/react-query";
import { heroImage } from "@/lib/media";
import fallbackProjectImg from "@/assets/project-bakery.jpg";
import heroWebp from "@/assets/hero.webp";
import heroSeaWebp from "@/assets/hero-sea.webp";
import heroWashingWebp from "@/assets/hero-washing.webp";
import heroJabaliyaWebp from "@/assets/hero-jabaliya.webp";
import heroMaisWebp from "@/assets/hero-mais.webp";
import heroMaisFatherWebp from "@/assets/hero-mais-father.webp";
import heroAdelFamilyWebp from "@/assets/hero-adel-family.webp";
import heroAdelInjuryWebp from "@/assets/hero-adel-injury.webp";
import { isSupabaseConfigured, safeSupabase } from "@/lib/supabase";
import { siteConfig } from "@/config/site";

export type AdminRow = { id: number } & Record<string, string | number | boolean | null>;

export interface NewsItem { id: number; titleAr: string; titleEn: string; excerptAr: string; excerptEn: string; categoryAr: string; categoryEn: string; date: string; }
export interface ProjectCard { id: string; titleAr: string; titleEn: string; descAr: string; descEn: string; beneficiariesAr: string; beneficiariesEn: string; image: string; }
export interface ProjectDetail { id: string; titleAr: string; titleEn: string; descAr: string; descEn: string; image: string; stats: { labelAr: string; labelEn: string; value: string }[]; }

export interface GalleryItem { id: number; src: string; altAr: string; altEn: string; category: string; }
export interface BookItem { id: number; titleAr: string; titleEn: string; descAr: string; descEn: string; year: string; pages: string; pdf: string; }
export interface StoryItem { id: number; titleAr: string; titleEn: string; excerptAr: string; excerptEn: string; }
export interface TestimonialItem { id: number; contentAr: string; contentEn: string; nameAr: string; nameEn: string; roleAr: string; roleEn: string; locationAr: string; locationEn: string; }
export interface ImpactItem { id: number; icon: string; value: string; labelAr: string; labelEn: string; descAr: string; descEn: string; }
export interface TeamMember { id: number; nameAr: string; nameEn: string; roleAr: string; roleEn: string; bioAr: string; bioEn: string; category: string; photo: string; sortIndex: number; }
export interface HeroImage { id: number; src: string; altAr: string; altEn: string; }
export interface HeroStat { id: number; value: string; labelAr: string; labelEn: string; icon: string; }
export interface SettingsValues { contactPhone: string; contactPhoneDisplay: string; contactEmail: string; addressAr: string; addressEn: string; donationIban: string; donationAccountNameAr: string; donationAccountNameEn: string; donationClickLink: string; donationPayPalLink: string; donationUsdtAddress: string; donationUsdtNetwork: string; heroBadgeAr: string; heroBadgeEn: string; heroTitleAr: string; heroTitleAccentAr: string; heroTitleLine2Ar: string; heroTitleEn: string; heroTitleAccentEn: string; heroTitleLine2En: string; heroSubtitleAr: string; heroSubtitleEn: string; }

const nf = (row: AdminRow, key: string): string => String(row[key] ?? "");

export interface ContentShape<T> {
  table: string;
  order?: string;
  map: (row: AdminRow) => T;
  fallback: T[];
  mandatoryFallback?: boolean;
  filter?: (item: T) => boolean;
}

function useContent<T>(shape: ContentShape<T>): T[] {
  const prefersFallback = Boolean(shape.mandatoryFallback);
  const empty: T[] = [];
  const query = useQuery({
    queryKey: ["content", shape.table],
    enabled: isSupabaseConfigured,
    queryFn: async () => {
      const sb = safeSupabase();
      if (!sb) return prefersFallback ? shape.fallback : empty;
      const { data, error } = await sb
        .from(shape.table)
        .select("*")
        .order(shape.order ?? "id");
      if (error || !data || (data.length === 0 && !prefersFallback)) {
        return prefersFallback ? shape.fallback : empty;
      }
      const mapped = (data as unknown as AdminRow[]).map(shape.map);
      const list = shape.filter ? mapped.filter(shape.filter) : mapped;
      if (list.length === 0 && !prefersFallback) return empty;
      return list.length > 0 ? list : shape.fallback;
    },
  });
  if (!isSupabaseConfigured) return prefersFallback ? shape.fallback : empty;
  return query.data ?? (prefersFallback ? shape.fallback : empty);
}

const newsFallback: NewsItem[] = [
  { id: 1, titleAr: "إطلاق حملة رمضان الخير 2024", titleEn: "Launch of Ramadan Goodness Campaign 2024", excerptAr: "تستعد المؤسسة لإطلاق حملتها السنوية لشهر رمضان المبارك والتي تستهدف توزيع 10,000 سلة غذائية على الأسر المحتاجة في مختلف المناطق.", excerptEn: "The foundation launches its annual Ramadan campaign targeting 10,000 food baskets for needy families.", categoryAr: "حملات", categoryEn: "Campaigns", date: "2024-02-15" },
  { id: 2, titleAr: "افتتاح فرن الخير الثاني", titleEn: "Opening of the Second Bread of Goodness Bakery", excerptAr: "تم افتتاح الفرن الثاني ضمن مشروع فرن الخير لخدمة المزيد من الأسر المحتاجة.", excerptEn: "The second bakery opened to serve more families in need.", categoryAr: "مشاريع", categoryEn: "Projects", date: "2024-01-20" },
  { id: 3, titleAr: "توقيع اتفاقية شراكة استراتيجية", titleEn: "Signing a Strategic Partnership Agreement", excerptAr: "وقعت المؤسسة اتفاقية شراكة مع إحدى الجهات الحكومية لتوسيع خدماتها.", excerptEn: "The foundation signed a partnership agreement with a government entity.", categoryAr: "شراكات", categoryEn: "Partnerships", date: "2024-01-10" },
  { id: 4, titleAr: "تكريم المتطوعين المتميزين", titleEn: "Honoring Outstanding Volunteers", excerptAr: "حفل تكريم للمتطوعين الذين ساهموا بجهودهم خلال العام الماضي.", excerptEn: "An honoring ceremony for last year's outstanding volunteers.", categoryAr: "فعاليات", categoryEn: "Events", date: "2023-12-25" },
  { id: 5, titleAr: "إصدار التقرير السنوي 2023", titleEn: "Release of the 2023 Annual Report", excerptAr: "تقرير يوثق أنشطة ومشاريع وإنجازات المؤسسة عام 2023.", excerptEn: "The annual report covering all foundation activities in 2023.", categoryAr: "تقارير", categoryEn: "Reports", date: "2023-12-15" },
];

const projectFallback: (ProjectCard & ProjectDetail)[] = [
  {
    id: "bakery",
    titleAr: "فرن الخير",
    titleEn: "Bread of Goodness",
    descAr: "مشروع فرن الخير يهدف إلى توفير الخبز الطازج يومياً للأسر المحتاجة.",
    descEn: "The Bread of Goodness project provides fresh bread daily to needy families.",
    image: fallbackProjectImg,
    beneficiariesAr: "2,000+ أسرة",
    beneficiariesEn: "2,000+ Families",
    stats: [
      { labelAr: "أسرة مستفيدة", labelEn: "Families served", value: "2,000+" },
      { labelAr: "رغيف يومياً", labelEn: "Loaves daily", value: "5,000" },
      { labelAr: "منطقة", labelEn: "Areas", value: "10" },
    ],
  },
  {
    id: "kitchen",
    titleAr: "تكية الطعام",
    titleEn: "Community Kitchen",
    descAr: "وجبات ساخنة يومية للعائلات والأفراد المحتاجين.",
    descEn: "Daily hot meals for families and individuals in need.",
    image: fallbackProjectImg,
    beneficiariesAr: "500+ وجبة يومياً",
    beneficiariesEn: "500+ Daily Meals",
    stats: [
      { labelAr: "وجبة يومياً", labelEn: "Meals daily", value: "500+" },
      { labelAr: "متطوع", labelEn: "Volunteers", value: "30" },
      { labelAr: "سنوات خدمة", labelEn: "Years of service", value: "3" },
    ],
  },
  {
    id: "orphans",
    titleAr: "كفالة الأيتام",
    titleEn: "Orphan Sponsorship",
    descAr: "برنامج شامل لرعاية الأيتام يشمل التعليم والصحة والاحتياجات الأساسية.",
    descEn: "Comprehensive orphan care covering education, health, and basic needs.",
    image: fallbackProjectImg,
    beneficiariesAr: "300+ يتيم",
    beneficiariesEn: "300+ Orphans",
    stats: [
      { labelAr: "يتيم مكفول", labelEn: "Sponsored orphans", value: "300+" },
      { labelAr: "كفيل", labelEn: "Sponsors", value: "200" },
      { labelAr: "برنامج", labelEn: "Programs", value: "5" },
    ],
  },
  {
    id: "education",
    titleAr: "المنح الدراسية",
    titleEn: "Scholarships",
    descAr: "دعم الطلاب المتفوقين من الأسر المحتاجة لإكمال تعليمهم.",
    descEn: "Supporting outstanding students from needy families.",
    image: fallbackProjectImg,
    beneficiariesAr: "150+ طالب",
    beneficiariesEn: "150+ Students",
    stats: [
      { labelAr: "طالب", labelEn: "Students", value: "150+" },
      { labelAr: "جامعة", labelEn: "Universities", value: "8" },
      { labelAr: "تخصص", labelEn: "Majors", value: "20+" },
    ],
  },
];

const galleryFallback: GalleryItem[] = [
  { id: 1, src: heroImage, altAr: "توزيع الخبز", altEn: "Bread Distribution", category: "مشاريع" },
  { id: 2, src: fallbackProjectImg, altAr: "فرن الخير", altEn: "Bread of Goodness", category: "مشاريع" },
  { id: 3, src: fallbackProjectImg, altAr: "تكية الطعام", altEn: "Community Kitchen", category: "نشاطات" },
  { id: 4, src: fallbackProjectImg, altAr: "التعليم", altEn: "Education", category: "فعاليات" },
  { id: 5, src: fallbackProjectImg, altAr: "كفالة الأيتام", altEn: "Orphan Sponsorship", category: "مشاريع" },
  { id: 6, src: fallbackProjectImg, altAr: "توزيع الوجبات", altEn: "Meal Distribution", category: "نشاطات" },
];

const booksFallback: BookItem[] = [
  { id: 1, titleAr: "قصص من الأمل", titleEn: "Stories of Hope", descAr: "مجموعة قصص ملهمة من حياة النازحين تحكي معاناتهم وأملهم في غد أفضل", descEn: "Inspiring stories from the lives of displaced people", year: "2023", pages: "150", pdf: "" },
  { id: 2, titleAr: "رحلة الصمود", titleEn: "Journey of Resilience", descAr: "توثيق لرحلة عائلات نازحة وكيف استطاعوا إعادة بناء حياتهم", descEn: "Documentation of displaced families' journey of rebuilding", year: "2022", pages: "200", pdf: "" },
];

const storiesFallback: StoryItem[] = [
  { id: 1, titleAr: "حكاية أم أحمد", titleEn: "Um Ahmed's Story", excerptAr: "أم أحمد، امرأة فقدت زوجها ونزحت مع أطفالها الخمسة، لكنها لم تفقد الأمل...", excerptEn: "Um Ahmed lost her husband and took refuge with her five children, yet never lost hope..." },
  { id: 2, titleAr: "حلم محمد الصغير", titleEn: "Little Mohammed's Dream", excerptAr: "محمد طفل في الثامنة، حلمه أن يصبح طبيباً ليعالج أطفال بلده...", excerptEn: "Eight-year-old Mohammed dreams of becoming a doctor to treat the children of his homeland..." },
  { id: 3, titleAr: "معلمة في المخيم", titleEn: "A Teacher in the Camp", excerptAr: "سارة معلمة لم تتوقف عن التدريس رغم النزوح، أنشأت فصلاً في خيمتها...", excerptEn: "Sara kept teaching despite displacement and opened a classroom in her tent..." },
];

const testimonialsFallback: TestimonialItem[] = [
  { id: 1, contentAr: "بفضل الله ثم بفضل مؤسسة جسور السلام الفلسطينية، استطاعت عائلتي الحصول على الطعام يومياً. نشكركم من أعماق قلوبنا.", contentEn: "Thanks to God and then to the Palestinian Bridges of Peace Foundation, my family gets food daily.", nameAr: "أم محمد", nameEn: "Um Mohammed", roleAr: "مستفيدة من تكية الطعام", roleEn: "Community Kitchen Beneficiary", locationAr: "الرياض", locationEn: "Riyadh" },
  { id: 2, contentAr: "المنحة الدراسية التي حصلت عليها غيرت مسار حياتي. الآن أنا طالب جامعي وأحلم بأن أساهم في خدمة مجتمعي.", contentEn: "The scholarship changed my life; now I study at university and dream of serving my community.", nameAr: "أحمد الخالد", nameEn: "Ahmed Al-Khaled", roleAr: "طالب منحة دراسية", roleEn: "Scholarship Student", locationAr: "جدة", locationEn: "Jeddah" },
  { id: 3, contentAr: "برنامج كفالة الأيتام يقدم دعماً شاملاً لأطفالنا. ليس فقط الدعم المادي، بل الاهتمام والرعاية الحقيقية.", contentEn: "The orphan program provides comprehensive support — real care, not just financial aid.", nameAr: "فاطمة العلي", nameEn: "Fatima Al-Ali", roleAr: "أم أيتام", roleEn: "Orphan's Mother", locationAr: "الدمام", locationEn: "Dammam" },
];

const impactFallback: ImpactItem[] = [
  { id: 1, icon: "Users", value: "10,000+", labelAr: "مستفيد", labelEn: "Beneficiaries", descAr: "من مختلف المناطق", descEn: "From various regions" },
  { id: 2, icon: "Utensils", value: "500,000+", labelAr: "وجبة", labelEn: "Meals", descAr: "تم توزيعها", descEn: "Distributed" },
  { id: 3, icon: "Heart", value: "300+", labelAr: "يتيم مكفول", labelEn: "Sponsored Orphans", descAr: "في رعايتنا", descEn: "Under our care" },
  { id: 4, icon: "GraduationCap", value: "150+", labelAr: "منحة دراسية", labelEn: "Scholarships", descAr: "تم تقديمها", descEn: "Provided" },
  { id: 5, icon: "Home", value: "2,000+", labelAr: "أسرة", labelEn: "Families", descAr: "نخدمها شهرياً", descEn: "Served monthly" },
  { id: 6, icon: "Gift", value: "15+", labelAr: "مشروع", labelEn: "Projects", descAr: "قيد التنفيذ", descEn: "In progress" },
];

const settingsFallback: SettingsValues = {
  contactPhone: siteConfig.contact.phone,
  contactPhoneDisplay: siteConfig.contact.phoneDisplay,
  contactEmail: siteConfig.contact.email,
  addressAr: "المملكة العربية السعودية",
  addressEn: "Saudi Arabia",
  donationIban: siteConfig.donation.iban,
  donationAccountNameAr: siteConfig.donation.accountName.ar,
  donationAccountNameEn: siteConfig.donation.accountName.en,
  donationClickLink: siteConfig.donation.clickLink,
  donationPayPalLink: siteConfig.donation.payPalLink,
  donationUsdtAddress: siteConfig.donation.usdtAddress,
  donationUsdtNetwork: siteConfig.donation.usdtNetwork,
  heroBadgeAr: "مؤسسة ثقافية وإنسانية",
  heroBadgeEn: "Cultural & Humanitarian Foundation",
  heroTitleAr: "معاً نبني",
  heroTitleAccentAr: "مستقبلاً",
  heroTitleLine2Ar: "أفضل للجميع",
  heroTitleEn: "Together We Build",
  heroTitleAccentEn: "a Better",
  heroTitleLine2En: "Future for All",
  heroSubtitleAr: "نسعى في مؤسسة جسور السلام الفلسطينية لتقديم يد العون للمحتاجين والأيتام من خلال مشاريع إنسانية مستدامة تحقق الأثر الإيجابي في المجتمع",
  heroSubtitleEn: "At the Palestinian Bridges of Peace Foundation, we strive to extend a helping hand to those in need and orphans through sustainable humanitarian projects that create a positive impact in the community",
};

const teamFallback: TeamMember[] = [
  { id: 1, nameAr: "د. أحمد العتيبي", nameEn: "Dr. Ahmed Al-Otaibi", roleAr: "رئيس مجلس الإدارة", roleEn: "Board Chairman", bioAr: "خبرة تزيد عن 20 عاماً في العمل الخيري والتنموي", bioEn: "Over 20 years of experience in charity and development work", category: "مجلس الإدارة", photo: "", sortIndex: 1 },
  { id: 2, nameAr: "أ. فاطمة الشمري", nameEn: "Fatima Al-Shammari", roleAr: "نائب الرئيس", roleEn: "Vice Chairman", bioAr: "متخصصة في إدارة المشاريع الإنسانية والتطوعية", bioEn: "Specialist in humanitarian and volunteer project management", category: "مجلس الإدارة", photo: "", sortIndex: 2 },
  { id: 3, nameAr: "م. خالد المالكي", nameEn: "Eng. Khaled Al-Malki", roleAr: "المدير التنفيذي", roleEn: "Executive Director", bioAr: "خبير في التخطيط الاستراتيجي وإدارة المؤسسات غير الربحية", bioEn: "Expert in strategic planning and nonprofit management", category: "مجلس الإدارة", photo: "", sortIndex: 3 },
  { id: 4, nameAr: "د. نورة القحطاني", nameEn: "Dr. Noura Al-Qahtani", roleAr: "مستشار", roleEn: "Advisor", bioAr: "أكاديمية ومتخصصة في الدراسات الاجتماعية", bioEn: "Academic specialized in social studies", category: "مجلس الإدارة", photo: "", sortIndex: 4 },
];

const heroImagesFallback: HeroImage[] = [
  { id: 1, src: heroWebp, altAr: "أطفال في منطقة نزوح ينتظرون بجرّات الماء", altEn: "Children with water jugs in a displacement area" },
  { id: 2, src: heroSeaWebp, altAr: "أطفال يضحكون على شاطئ البحر", altEn: "Children laughing and playing on the seashore" },
  { id: 3, src: heroWashingWebp, altAr: "سيدة تغسل ملابس أسرتها بين الأنقاض", altEn: "A woman washing her family's laundry amid rubble" },
  { id: 4, src: heroJabaliyaWebp, altAr: "مشهد واسع لمخيم جبليا بعد الدمار", altEn: "A wide view of Jabaliya camp after destruction" },
  { id: 5, src: heroMaisWebp, altAr: "طفلة من أهالي جبليا قبل منزلٍ متهدم", altEn: "A girl from Jabaliya in front of a half-destroyed home" },
  { id: 6, src: heroMaisFatherWebp, altAr: "بنت مع والدها يطبخ على نار بين الأنقاض", altEn: "A girl with her father cooking over a fire amid rubble" },
  { id: 7, src: heroAdelFamilyWebp, altAr: "أسرة من جبليا أمام منزلها المدمّر", altEn: "A family from Jabaliya stands before their destroyed home" },
  { id: 8, src: heroAdelInjuryWebp, altAr: "قدم طفل مجروح بضماد بين الأنقاض", altEn: "An injured child's bandaged foot amid rubble" },
];

const heroStatsFallback: HeroStat[] = [
  { id: 1, value: "10,000+", labelAr: "مستفيد", labelEn: "Beneficiaries", icon: "Users" },
  { id: 2, value: "15+", labelAr: "مشروع", labelEn: "Projects", icon: "HandHeart" },
  { id: 3, value: "50+", labelAr: "متطوع", labelEn: "Volunteers", icon: "Heart" },
  { id: 4, value: "5", labelAr: "سنوات خدمة", labelEn: "Years", icon: "Gift" },
];

export function useNews(): NewsItem[] {
  return useContent<NewsItem>({
    table: "news",
    order: "date",
    map: (row) => ({
      id: row.id,
      titleAr: nf(row, "title_ar"),
      titleEn: nf(row, "title_en"),
      excerptAr: nf(row, "excerpt_ar"),
      excerptEn: nf(row, "excerpt_en"),
      categoryAr: nf(row, "category_ar"),
      categoryEn: nf(row, "category_en"),
      date: nf(row, "event_date"),
    }),
    fallback: newsFallback,
  });
}

export function useMiniProjects(): ProjectCard[] {
  return useContent<ProjectCard>({
    table: "projects",
    map: (row) => ({
      id: nf(row, "slug") || String(row.id),
      titleAr: nf(row, "title_ar"),
      titleEn: nf(row, "title_en"),
      descAr: nf(row, "desc_short_ar"),
      descEn: nf(row, "desc_short_en"),
      beneficiariesAr: nf(row, "beneficiaries_ar"),
      beneficiariesEn: nf(row, "beneficiaries_en"),
      image: nf(row, "image_url") || fallbackProjectImg,
    }),
    fallback: projectFallback,
  });
}

export function useProjectsDetails(): ProjectDetail[] {
  return useContent<ProjectDetail>({
    table: "projects",
    map: (row) => ({
      id: nf(row, "slug") || String(row.id),
      titleAr: nf(row, "title_ar"),
      titleEn: nf(row, "title_en"),
      descAr: nf(row, "desc_long_ar") || nf(row, "desc_short_ar"),
      descEn: nf(row, "desc_long_en") || nf(row, "desc_short_en"),
      image: nf(row, "image_url") || fallbackProjectImg,
      stats: parseStats(row["stats"]),
    }),
    fallback: projectFallback,
  });
}

function parseStats(raw: string | number | boolean | null): { labelAr: string; labelEn: string; value: string }[] {
  if (typeof raw !== "string" || !raw.trim()) return [{ labelAr: "", labelEn: "", value: "" }, { labelAr: "", labelEn: "", value: "" }, { labelAr: "", labelEn: "", value: "" }];
  try {
    const parsed = JSON.parse(raw) as { label_ar?: string; label_en?: string; value?: string }[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((s) => ({ labelAr: s.label_ar ?? "", labelEn: s.label_en ?? "", value: s.value ?? "" }));
  } catch {
    return [];
  }
}

export function useGallery(): GalleryItem[] {
  return useContent<GalleryItem>({
    table: "gallery_images",
    map: (row) => ({
      id: row.id,
      src: nf(row, "image_url") || heroImage,
      altAr: nf(row, "alt_ar"),
      altEn: nf(row, "alt_en"),
      category: nf(row, "category") || "مشاريع",
    }),
    fallback: galleryFallback,
  });
}

export function useBooks(): BookItem[] {
  return useContent<BookItem>({
    table: "books",
    map: (row) => ({
      id: row.id,
      titleAr: nf(row, "title_ar"),
      titleEn: nf(row, "title_en"),
      descAr: nf(row, "desc_ar"),
      descEn: nf(row, "desc_en"),
      year: nf(row, "year"),
      pages: nf(row, "pages"),
    }),
    fallback: booksFallback,
  });
}

export function useStories(): StoryItem[] {
  return useContent<StoryItem>({
    table: "stories",
    map: (row) => ({
      id: row.id,
      titleAr: nf(row, "title_ar"),
      titleEn: nf(row, "title_en"),
      excerptAr: nf(row, "excerpt_ar"),
      excerptEn: nf(row, "excerpt_en"),
    }),
    fallback: storiesFallback,
  });
}

export function useTestimonials(): TestimonialItem[] {
  return useContent<TestimonialItem>({
    table: "testimonials",
    map: (row) => ({
      id: row.id,
      contentAr: nf(row, "content_ar"),
      contentEn: nf(row, "content_en"),
      nameAr: nf(row, "name_ar"),
      nameEn: nf(row, "name_en"),
      roleAr: nf(row, "role_ar"),
      roleEn: nf(row, "role_en"),
      locationAr: nf(row, "location_ar"),
      locationEn: nf(row, "location_en"),
    }),
    fallback: testimonialsFallback,
  });
}

export function useImpact(): ImpactItem[] {
  return useContent<ImpactItem>({
    table: "impact_stats",
    map: (row) => ({
      id: row.id,
      icon: nf(row, "icon") || "Users",
      value: nf(row, "value"),
      labelAr: nf(row, "label_ar"),
      labelEn: nf(row, "label_en"),
      descAr: nf(row, "desc_ar"),
      descEn: nf(row, "desc_en"),
    }),
    fallback: impactFallback,
  });
}

export function useTeamMembers(): TeamMember[] {
  return useContent<TeamMember>({
    table: "team_members",
    order: "sort_index",
    map: (row) => ({
      id: row.id,
      nameAr: nf(row, "name_ar"),
      nameEn: nf(row, "name_en"),
      roleAr: nf(row, "role_ar"),
      roleEn: nf(row, "role_en"),
      bioAr: nf(row, "bio_ar"),
      bioEn: nf(row, "bio_en"),
      category: nf(row, "category") || "مجلس الإدارة",
      photo: nf(row, "photo_url"),
      sortIndex: Number(row["sort_index"] ?? 0),
    }),
    fallback: teamFallback,
  });
}

export function useHeroImages(): HeroImage[] {
  return useContent<HeroImage>({
    table: "hero_images",
    order: "sort_index",
    mandatoryFallback: true,
    map: (row) => ({
      id: row.id,
      src: nf(row, "image_url"),
      altAr: nf(row, "alt_ar"),
      altEn: nf(row, "alt_en"),
    }),
    filter: (image) => Boolean(image.src),
    fallback: heroImagesFallback,
  });
}

export function useHeroStats(): HeroStat[] {
  return useContent<HeroStat>({
    table: "hero_stats",
    order: "sort_index",
    map: (row) => ({
      id: row.id,
      value: nf(row, "value"),
      labelAr: nf(row, "label_ar"),
      labelEn: nf(row, "label_en"),
      icon: nf(row, "icon") || "Users",
    }),
    fallback: heroStatsFallback,
  });
}

export function useSettings(): SettingsValues {
  const query = useQuery({
    queryKey: ["content", "site_settings"],
    enabled: isSupabaseConfigured,
    queryFn: async () => {
      const sb = safeSupabase();
      if (!sb) return null;
      const { data, error } = await sb.from("site_settings").select("*").eq("id", 1).maybeSingle();
      if (error || !data) return null;
      const row = data as unknown as AdminRow;
      return {
        contactPhone: nf(row, "contact_phone"),
        contactPhoneDisplay: nf(row, "contact_phone_display"),
        contactEmail: nf(row, "contact_email"),
        addressAr: nf(row, "address_ar"),
        addressEn: nf(row, "address_en"),
        donationIban: nf(row, "donation_iban"),
        donationAccountNameAr: nf(row, "donation_account_name_ar"),
        donationAccountNameEn: nf(row, "donation_account_name_en"),
        donationClickLink: nf(row, "donation_click_link"),
        donationPayPalLink: nf(row, "donation_paypal_link"),
        donationUsdtAddress: nf(row, "donation_usdt_address"),
        donationUsdtNetwork: nf(row, "donation_usdt_network"),
        heroBadgeAr: nf(row, "hero_badge_ar"),
        heroBadgeEn: nf(row, "hero_badge_en"),
        heroTitleAr: nf(row, "hero_title_ar"),
        heroTitleAccentAr: nf(row, "hero_title_accent_ar"),
        heroTitleLine2Ar: nf(row, "hero_title_line2_ar"),
        heroTitleEn: nf(row, "hero_title_en"),
        heroTitleAccentEn: nf(row, "hero_title_accent_en"),
        heroTitleLine2En: nf(row, "hero_title_line2_en"),
        heroSubtitleAr: nf(row, "hero_subtitle_ar"),
        heroSubtitleEn: nf(row, "hero_subtitle_en"),
      } satisfies SettingsValues;
    },
  });
  if (!query.data) return settingsFallback;
  const filled = query.data;
  const result: SettingsValues = { ...settingsFallback };
  (Object.keys(settingsFallback) as (keyof SettingsValues)[]).forEach((key) => {
    if (filled[key]) result[key] = filled[key];
  });
  return result;
}
