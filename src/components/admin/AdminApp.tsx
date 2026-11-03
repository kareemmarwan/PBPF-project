import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { isSupabaseConfigured, safeSupabase } from "@/lib/supabase";
import { siteConfig } from "@/config/site";
import type { Session } from "@supabase/supabase-js";
import { ResourceEditor } from "./ResourceEditor";
import { resourceMap, resources } from "./resources";
import { usePageTitle } from "@/hooks/use-page-title";
import {
  LayoutDashboard, Newspaper, HandHeart, Image as ImageIcon, Images, BookOpen, Quote,
  MessageSquareQuote, ChartColumn, Settings, Inbox, LogOut, Loader2, Globe, LockKeyhole,
  Table2, Trash2, Users,
} from "lucide-react";

const sectionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  overview: LayoutDashboard,
  news: Newspaper,
  projects: HandHeart,
  gallery: ImageIcon,
  books: BookOpen,
  stories: Quote,
  testimonials: MessageSquareQuote,
  impact: ChartColumn,
  team: Users,
  "hero-images": Images,
  "hero-stats": ChartColumn,
  messages: Inbox,
  settings: Settings,
};

function useAdminSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const sb = safeSupabase();
    if (!sb) {
      setReady(true);
      return;
    }
    void sb.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = sb.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => sub?.subscription.unsubscribe();
  }, []);
  return { session, ready };
}

function useCount(table: string): number {
  const query = useQuery({
    queryKey: ["count", table],
    queryFn: async () => {
      const sb = safeSupabase()!;
      const { count, error } = await sb.from(table).select("*", { count: "exact", head: true });
      if (error) throw error;
      return count ?? 0;
    },
  });
  return query.data ?? 0;
}

function Overview() {
  const { t } = useLanguage();
  const tables: { key: string; labelAr: string; labelEn: string }[] = [
    { key: "news", labelAr: "الأخبار", labelEn: "News" },
    { key: "projects", labelAr: "المشاريع", labelEn: "Projects" },
    { key: "gallery_images", labelAr: "صور المعرض", labelEn: "Gallery" },
    { key: "books", labelAr: "الكتب", labelEn: "Books" },
    { key: "testimonials", labelAr: "الشهادات", labelEn: "Testimonials" },
    { key: "messages", labelAr: "الرسائل", labelEn: "Messages" },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {tables.map((table) => (
        <CountCard key={table.key} table={table} tLabel={t(table.labelAr, table.labelEn)} />
      ))}
    </div>
  );
}

function CountCard({ table, tLabel }: { table: { key: string }; tLabel: string }) {
  const count = useCount(table.key);
  return (
    <Card variant="elevated" className="p-6 text-center">
      <CardContent className="p-0 space-y-1">
        <div className="text-3xl font-bold text-heritage-wine">{count}</div>
        <div className="text-sm text-muted-foreground">{tLabel}</div>
      </CardContent>
    </Card>
  );
}

function SettingsForm() {
  const { t } = useLanguage();
  const qc = useQueryClient();
  const { toast } = useToast();
  const [values, setValues] = useState<Record<string, string> | null>(null);

  const load = useQuery({
    queryKey: ["admin", "site_settings"],
    queryFn: async () => {
      const sb = safeSupabase()!;
      const { data, error } = await sb.from("site_settings").select("*").eq("id", 1).maybeSingle();
      if (error) throw error;
      return data as unknown as Record<string, string | number | boolean | null> | null;
    },
  });

  useEffect(() => {
    if (load.data) {
      setValues({
        contact_phone: String(load.data.contact_phone ?? ""),
        contact_phone_display: String(load.data.contact_phone_display ?? ""),
        contact_email: String(load.data.contact_email ?? ""),
        address_ar: String(load.data.address_ar ?? ""),
        address_en: String(load.data.address_en ?? ""),
        donation_iban: String(load.data.donation_iban ?? ""),
        donation_account_name_ar: String(load.data.donation_account_name_ar ?? ""),
        donation_account_name_en: String(load.data.donation_account_name_en ?? ""),
        donation_click_link: String(load.data.donation_click_link ?? ""),
        hero_badge_ar: String(load.data.hero_badge_ar ?? ""),
        hero_badge_en: String(load.data.hero_badge_en ?? ""),
        hero_title_ar: String(load.data.hero_title_ar ?? ""),
        hero_title_accent_ar: String(load.data.hero_title_accent_ar ?? ""),
        hero_title_line2_ar: String(load.data.hero_title_line2_ar ?? ""),
        hero_title_en: String(load.data.hero_title_en ?? ""),
        hero_title_accent_en: String(load.data.hero_title_accent_en ?? ""),
        hero_title_line2_en: String(load.data.hero_title_line2_en ?? ""),
        hero_subtitle_ar: String(load.data.hero_subtitle_ar ?? ""),
        hero_subtitle_en: String(load.data.hero_subtitle_en ?? ""),
      });
    }
  }, [load.data]);

  const save = useMutation({
    mutationFn: async (payload: Record<string, string>) => {
      const sb = safeSupabase()!;
      const { error } = await sb.from("site_settings").upsert({ id: 1, ...payload });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["content", "site_settings"] });
      qc.invalidateQueries({ queryKey: ["admin", "site_settings"] });
      toast({ title: t("تم حفظ الإعدادات", "Settings saved") });
    },
    onError: (error: Error) => {
      toast({ title: t("فشل الحفظ", "Save failed"), description: error.message, variant: "destructive" });
    },
  });

  if (!values) return null;
  const fields: { key: string; labelAr: string; labelEn: string; ltr?: boolean }[] = [
    { key: "contact_phone", labelAr: "الهاتف (للروابط)", labelEn: "Phone (raw)", ltr: true },
    { key: "contact_phone_display", labelAr: "الهاتف (للعرض)", labelEn: "Phone (display)", ltr: true },
    { key: "contact_email", labelAr: "البريد الإلكتروني", labelEn: "Email", ltr: true },
    { key: "address_ar", labelAr: "العنوان (عربي)", labelEn: "Address (AR)" },
    { key: "address_en", labelAr: "العنوان (إنجليزي)", labelEn: "Address (EN)" },
    { key: "donation_iban", labelAr: "رقم الآيبان", labelEn: "IBAN", ltr: true },
    { key: "donation_account_name_ar", labelAr: "اسم الحساب (عربي)", labelEn: "Account name (AR)" },
    { key: "donation_account_name_en", labelAr: "اسم الحساب (إنجليزي)", labelEn: "Account name (EN)", ltr: true },
    { key: "donation_click_link", labelAr: "رابط التبرع السريع (كليك)", labelEn: "Quick pay link", ltr: true },
    { key: "hero_badge_ar", labelAr: "الشارة (عربي)", labelEn: "Badge (AR)" },
    { key: "hero_badge_en", labelAr: "الشارة (إنجليزي)", labelEn: "Badge (EN)", ltr: true },
    { key: "hero_title_ar", labelAr: "العنوان الضخم (عربي)", labelEn: "Main title (AR)" },
    { key: "hero_title_accent_ar", labelAr: "الكلمة الذهبية (عربي)", labelEn: "Golden word (AR)" },
    { key: "hero_title_line2_ar", labelAr: "سطر العنوان الثاني (عربي)", labelEn: "Title line 2 (AR)" },
    { key: "hero_title_en", labelAr: "العنوان الضخم (إنجليزي)", labelEn: "Main title (EN)", ltr: true },
    { key: "hero_title_accent_en", labelAr: "الكلمة الذهبية (إنجليزي)", labelEn: "Golden word (EN)", ltr: true },
    { key: "hero_title_line2_en", labelAr: "سطر العنوان الثاني (إنجليزي)", labelEn: "Title line 2 (EN)", ltr: true },
    { key: "hero_subtitle_ar", labelAr: "النص التعريفي (عربي)", labelEn: "Subtitle (AR)" },
    { key: "hero_subtitle_en", labelAr: "النص التعريفي (إنجليزي)", labelEn: "Subtitle (EN)", ltr: true },
  ];
  return (
    <div className="max-w-2xl space-y-4">
      {fields.map((f) => (
        <div key={f.key}>
          <label className="block text-sm font-medium text-foreground mb-1.5">{t(f.labelAr, f.labelEn)}</label>
          <Input
            dir={f.ltr ? "ltr" : undefined}
            value={values[f.key] ?? ""}
            onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
          />
        </div>
      ))}
      <Button onClick={() => save.mutate(values)} disabled={save.isPending}>
        {save.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
        {t("حفظ الإعدادات", "Save settings")}
      </Button>
    </div>
  );
}

function MessagesView() {
  const { t } = useLanguage();
  const qc = useQueryClient();
  const { toast } = useToast();
  const list = useQuery({
    queryKey: ["admin", "messages"],
    queryFn: async () => {
      const sb = safeSupabase()!;
      const { data, error } = await sb.from("messages").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as { id: number; name: string; email: string; message: string; is_read: boolean; created_at: string }[];
    },
  });

  const act = useMutation({
    mutationFn: async ({ id, action }: { id: number; action: "read" | "delete" }) => {
      const sb = safeSupabase()!;
      const { error } = action === "delete"
        ? await sb.from("messages").delete().eq("id", id)
        : await sb.from("messages").update({ is_read: true }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "messages"] });
      qc.invalidateQueries({ queryKey: ["count", "messages"] });
      toast({ title: t("تم", "Done") });
    },
    onError: (error: Error) => {
      toast({ title: t("فشل", "Failed"), description: error.message, variant: "destructive" });
    },
  });

  return (
    <div className="space-y-4 max-w-3xl">
      {list.isLoading && <Loader2 className="w-6 h-6 animate-spin" />}
      {list.error && <p className="text-destructive">{t("تعذر تحميل الرسائل", "Could not load messages")}</p>}
      {(list.data ?? []).length === 0 && <p className="text-muted-foreground">{t("لا رسائل حتى الآن", "No messages yet")}</p>}
      {(list.data ?? []).map((msg) => (
        <Card key={msg.id} variant={msg.is_read ? "flat" : "heritage"}>
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div>
                <p className="font-bold text-foreground">{msg.name}</p>
                <p className="text-sm text-muted-foreground" dir="ltr">{msg.email}</p>
              </div>
              <div className="flex gap-2">
                {!msg.is_read && (
                  <Button variant="outline" size="sm" onClick={() => act.mutate({ id: msg.id, action: "read" })}>
                    {t("تحديد كمقروءة", "Mark read")}
                  </Button>
                )}
                <Button variant="destructive" size="sm" onClick={() => { if (window.confirm(t("حذف الرسالة؟", "Delete message?"))) act.mutate({ id: msg.id, action: "delete" }); }}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">{msg.message}</p>
            <p className="text-xs text-muted-foreground" dir="ltr">{msg.created_at}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function LoginView() {
  const { t, toggleLanguage } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sb = safeSupabase();
    if (!sb) return;
    setPending(true);
    const { error } = await sb.auth.signInWithPassword({ email, password });
    setPending(false);
    if (error) {
      toast({ title: t("فشل تسجيل الدخول", "Sign in failed"), description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4" dir="rtl">
      <Card variant="heritage" className="w-full max-w-md p-8">
        <CardContent className="p-0 space-y-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-heritage-wine/10 text-heritage-wine mx-auto flex items-center justify-center">
            <LockKeyhole className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">{t("لوحة التحكم", "Admin Dashboard")}</h1>
            <p className="text-sm text-muted-foreground mt-1">{t("دخول مدير الموقع", "Administrator sign in")}</p>
          </div>
          <form onSubmit={submit} className="space-y-4 text-right">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t("البريد الإلكتروني", "Email")}</label>
              <Input type="email" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t("كلمة المرور", "Password")}</label>
              <Input type="password" dir="ltr" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button variant="gold" size="lg" type="submit" className="w-full" disabled={pending}>
              {pending && <Loader2 className="w-4 h-4 animate-spin" />}
              {t("تسجيل الدخول", "Sign in")}
            </Button>
          </form>
          <Button variant="ghost" size="sm" onClick={toggleLanguage}>
            <Globe className="w-4 h-4" />
            {t("English", "عربي")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function SetupView() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4" dir="rtl">
      <Card variant="elevated" className="max-w-xl w-full p-8">
        <CardContent className="p-0 space-y-4 text-center">
          <div className="w-14 h-14 rounded-2xl bg-heritage-gold/10 text-heritage-gold mx-auto flex items-center justify-center">
            <Table2 className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-bold">{t("Supabase غير مهيأ بعد", "Supabase not configured")}</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t(
              "أضف المتغيرين VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY في ملف .env.local، وأنشئ الجداول بإملاء الملف SUPABASE-SETUP.md",
              "Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local and create the tables using SUPABASE-SETUP.md"
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminApp() {
  const { t, language, toggleLanguage, isRTL } = useLanguage();
  usePageTitle({ titleAr: "لوحة التحكم", titleEn: "Admin Dashboard" });
  const { session, ready } = useAdminSession();
  const [section, setSection] = useState("overview");

  const sections: { key: string; labelAr: string; labelEn: string; adminOnly?: boolean }[] = [
    { key: "overview", labelAr: "نظرة عامة", labelEn: "Overview" },
    ...resources.map((r) => ({ key: r.key, labelAr: r.titleAr, labelEn: r.titleEn })),
    { key: "messages", labelAr: "رسائل التواصل", labelEn: "Messages" },
    { key: "settings", labelAr: "إعدادات الموقع", labelEn: "Settings" },
  ];

  if (!isSupabaseConfigured) return <SetupView />;
  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/40">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!session) return <LoginView />;

  const signOut = async () => {
    await safeSupabase()!.auth.signOut();
  };

  const sidebarLabel = (s: { key: string; labelAr: string; labelEn: string }) => (language === "ar" ? s.labelAr : s.labelEn);

  return (
    <div className="min-h-screen bg-muted/40" dir={isRTL ? "rtl" : "ltr"}>
      <header className="bg-card border-b border-border px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={language === "ar" ? "/assets/logonavar.png" : "/assets/logonaven.png"}
              alt=""
              className="h-9 w-auto object-contain"
            />
            <span className="text-sm font-bold text-foreground shrink-0">{t("لوحة التحكم", "Admin")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={toggleLanguage} aria-label={t("تغيير اللغة", "Change language")}>
              <Globe className="w-4 h-4" />
              {language === "ar" ? "EN" : "ع"}
            </Button>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4" />
              {t("خروج", "Sign out")}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 grid lg:grid-cols-[240px,1fr] gap-6">
        <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-1">
          {sections.map((s) => {
            const Icon = sectionIcons[s.key] ?? LayoutDashboard;
            return (
              <button
                key={s.key}
                onClick={() => setSection(s.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  section === s.key ? "bg-heritage-wine text-primary-foreground" : "text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="w-4 h-4" />
                {sidebarLabel(s)}
              </button>
            );
          })}
        </nav>

        <main className="min-w-0">
          {section === "overview" && <Overview />}
          {section === "messages" && <MessagesView />}
          {section === "settings" && <SettingsForm />}
          {resourceMap.has(section) && (
            <ResourceEditor key={section} resource={resourceMap.get(section)!} />
          )}
          {section !== "overview" && section !== "messages" && section !== "settings" && !resourceMap.has(section) && (
            <p className="text-muted-foreground">{t("قسم غير متوفر", "Section unavailable")}</p>
          )}
        </main>
      </div>
    </div>
  );
}
