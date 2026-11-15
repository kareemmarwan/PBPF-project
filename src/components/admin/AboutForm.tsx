import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { safeSupabase } from "@/lib/supabase";
import { sanitizeInput } from "@/lib/sanitize";
import { Loader2, Plus } from "lucide-react";

type Draft = Record<string, string>;

type FieldType = "text" | "textarea" | "image";

interface FieldDef {
  key: string;
  labelAr: string;
  labelEn: string;
  type: FieldType;
  ltr?: boolean;
}

interface FieldGroup {
  titleAr: string;
  titleEn: string;
  fields: FieldDef[];
}

const groups: FieldGroup[] = [
  {
    titleAr: "الهيرو (أعلى الصفحة)",
    titleEn: "Hero (page top)",
    fields: [
      { key: "hero_badge_ar", labelAr: "الشارة (عربي)", labelEn: "Badge (AR)", type: "text" },
      { key: "hero_badge_en", labelAr: "الشارة (إنجليزي)", labelEn: "Badge (EN)", type: "text", ltr: true },
      { key: "hero_title_ar", labelAr: "العنوان (عربي)", labelEn: "Title (AR)", type: "text" },
      { key: "hero_title_en", labelAr: "العنوان (إنجليزي)", labelEn: "Title (EN)", type: "text", ltr: true },
      { key: "hero_title_accent_ar", labelAr: "الكلمة الذهبية في العنوان (عربي)", labelEn: "Golden word (AR)", type: "text" },
      { key: "hero_title_accent_en", labelAr: "الكلمة الذهبية في العنوان (إنجليزي)", labelEn: "Golden word (EN)", type: "text", ltr: true },
      { key: "hero_subtitle_ar", labelAr: "النص التعريفي (عربي)", labelEn: "Subtitle (AR)", type: "textarea" },
      { key: "hero_subtitle_en", labelAr: "النص التعريفي (إنجليزي)", labelEn: "Subtitle (EN)", type: "textarea", ltr: true },
    ],
  },
  {
    titleAr: "قصة المؤسسة",
    titleEn: "Foundation Story",
    fields: [
      { key: "story_badge_ar", labelAr: "شارة القسم (عربي)", labelEn: "Section badge (AR)", type: "text" },
      { key: "story_badge_en", labelAr: "شارة القسم (إنجليزي)", labelEn: "Section badge (EN)", type: "text", ltr: true },
      { key: "story_title_ar", labelAr: "عنوان القصة (عربي)", labelEn: "Story title (AR)", type: "text" },
      { key: "story_title_en", labelAr: "عنوان القصة (إنجليزي)", labelEn: "Story title (EN)", type: "text", ltr: true },
      { key: "story_title_accent_ar", labelAr: "الكلمة الذهبية في العنوان (عربي)", labelEn: "Golden word (AR)", type: "text" },
      { key: "story_title_accent_en", labelAr: "الكلمة الذهبية في العنوان (إنجليزي)", labelEn: "Golden word (EN)", type: "text", ltr: true },
      { key: "story_para1_ar", labelAr: "الفقرة الأولى (عربي)", labelEn: "Paragraph 1 (AR)", type: "textarea" },
      { key: "story_para1_en", labelAr: "الفقرة الأولى (إنجليزي)", labelEn: "Paragraph 1 (EN)", type: "textarea", ltr: true },
      { key: "story_para2_ar", labelAr: "الفقرة الثانية (عربي)", labelEn: "Paragraph 2 (AR)", type: "textarea" },
      { key: "story_para2_en", labelAr: "الفقرة الثانية (إنجليزي)", labelEn: "Paragraph 2 (EN)", type: "textarea", ltr: true },
      { key: "story_image_url", labelAr: "صورة القصة (رابط أو رفع)", labelEn: "Story image (URL or upload)", type: "image" },
      { key: "story_image_badge_ar", labelAr: "شارة الصورة (عربي)", labelEn: "Image badge (AR)", type: "text" },
      { key: "story_image_badge_en", labelAr: "شارة الصورة (إنجليزي)", labelEn: "Image badge (EN)", type: "text", ltr: true },
      { key: "stat1_value", labelAr: "الرقم الأول", labelEn: "Stat 1 value", type: "text", ltr: true },
      { key: "stat1_label_ar", labelAr: "وسم الرقم الأول (عربي)", labelEn: "Stat 1 label (AR)", type: "text" },
      { key: "stat1_label_en", labelAr: "وسم الرقم الأول (إنجليزي)", labelEn: "Stat 1 label (EN)", type: "text", ltr: true },
      { key: "stat2_value", labelAr: "الرقم الثاني", labelEn: "Stat 2 value", type: "text", ltr: true },
      { key: "stat2_label_ar", labelAr: "وسم الرقم الثاني (عربي)", labelEn: "Stat 2 label (AR)", type: "text" },
      { key: "stat2_label_en", labelAr: "وسم الرقم الثاني (إنجليزي)", labelEn: "Stat 2 label (EN)", type: "text", ltr: true },
      { key: "stat3_value", labelAr: "الرقم الثالث", labelEn: "Stat 3 value", type: "text", ltr: true },
      { key: "stat3_label_ar", labelAr: "وسم الرقم الثالث (عربي)", labelEn: "Stat 3 label (AR)", type: "text" },
      { key: "stat3_label_en", labelAr: "وسم الرقم الثالث (إنجليزي)", labelEn: "Stat 3 label (EN)", type: "text", ltr: true },
    ],
  },
  {
    titleAr: "رسالتنا ورؤيتنا",
    titleEn: "Mission & Vision",
    fields: [
      { key: "mission_ar", labelAr: "الرسالة (عربي)", labelEn: "Mission (AR)", type: "textarea" },
      { key: "mission_en", labelAr: "الرسالة (إنجليزي)", labelEn: "Mission (EN)", type: "textarea", ltr: true },
      { key: "vision_ar", labelAr: "الرؤية (عربي)", labelEn: "Vision (AR)", type: "textarea" },
      { key: "vision_en", labelAr: "الرؤية (إنجليزي)", labelEn: "Vision (EN)", type: "textarea", ltr: true },
    ],
  },
];

export function AboutForm() {
  const { t } = useLanguage();
  const qc = useQueryClient();
  const { toast } = useToast();
  const [values, setValues] = useState<Draft | null>(null);
  const [uploading, setUploading] = useState(false);

  const load = useQuery({
    queryKey: ["admin", "about_page"],
    queryFn: async () => {
      const sb = safeSupabase()!;
      const { data, error } = await sb.from("about_page").select("*").eq("id", 1).maybeSingle();
      if (error) throw error;
      return data as unknown as Record<string, string | number | boolean | null> | null;
    },
  });

  useEffect(() => {
    if (load.isSuccess && values === null) {
      setValues(
        load.data
          ? Object.fromEntries(Object.entries(load.data).map(([key, value]) => [key, String(value ?? "")]))
          : {},
      );
    }
  }, [load.isSuccess, load.data, values]);

  const save = useMutation({
    mutationFn: async (payload: Draft) => {
      const sb = safeSupabase()!;
      const clean: Record<string, string | null> = {};
      groups.forEach((group) =>
        group.fields.forEach((field) => {
          const raw = sanitizeInput(payload[field.key] ?? "").trim();
          clean[field.key] = raw === "" ? null : raw;
        }),
      );
      const { error } = await sb.from("about_page").upsert({ id: 1, ...clean });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["content", "about_page"] });
      qc.invalidateQueries({ queryKey: ["admin", "about_page"] });
      toast({ title: t("تم حفظ صفحة من نحن", "About page saved") });
    },
    onError: (error: Error) => {
      toast({ title: t("فشل الحفظ", "Save failed"), description: error.message, variant: "destructive" });
    },
  });

  const uploadImage = async (file: File) => {
    const sb = safeSupabase();
    if (!sb) return;
    setUploading(true);
    const path = `about_page/${Date.now()}-${file.name}`;
    const { error } = await sb.storage.from("media").upload(path, file, { upsert: true });
    setUploading(false);
    if (error) {
      toast({ title: t("فشل رفع الصورة", "Upload failed"), description: error.message, variant: "destructive" });
      return;
    }
    const { data } = sb.storage.from("media").getPublicUrl(path);
    setValues((prev) => (prev ? { ...prev, story_image_url: data.publicUrl } : prev));
  };

  if (load.isLoading || values === null) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-8">
      {groups.map((group) => (
        <section key={group.titleEn} className="space-y-4">
          <h3 className="text-lg font-bold text-heritage-wine border-b border-border pb-2">
            {t(group.titleAr, group.titleEn)}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {group.fields.map((field) => (
              <div key={field.key} className={field.type !== "text" ? "sm:col-span-2" : ""}>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {t(field.labelAr, field.labelEn)}
                </label>
                {field.type === "textarea" ? (
                  <Textarea
                    rows={4}
                    dir={field.ltr ? "ltr" : undefined}
                    value={values[field.key] ?? ""}
                    onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                  />
                ) : field.type === "image" ? (
                  <div className="flex gap-2">
                    <Input
                      dir="ltr"
                      value={values[field.key] ?? ""}
                      onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                    />
                    <label className="flex items-center gap-1.5 px-3 rounded-lg border border-input bg-background text-xs cursor-pointer shrink-0">
                      {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                      {t("رفع", "Upload")}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) void uploadImage(file);
                        }}
                      />
                    </label>
                  </div>
                ) : (
                  <Input
                    dir={field.ltr ? "ltr" : undefined}
                    value={values[field.key] ?? ""}
                    onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
      <Button onClick={() => save.mutate(values)} disabled={save.isPending}>
        {save.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
        {t("حفظ صفحة من نحن", "Save About page")}
      </Button>
    </div>
  );
}
