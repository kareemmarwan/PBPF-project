import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { safeSupabase } from "@/lib/supabase";
import type { AdminRow } from "@/lib/content";
import type { FieldDef, ResourceDef } from "./resources";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

type Draft = Record<string, string>;

export function ResourceEditor({ resource }: { resource: ResourceDef }) {
  const { t, language } = useLanguage();
  const qc = useQueryClient();
  const { toast } = useToast();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);

  const list = useQuery({
    queryKey: ["admin", resource.table],
    queryFn: async () => {
      const sb = safeSupabase()!;
      const { data, error } = await sb.from(resource.table).select("*").order("id");
      if (error) throw error;
      return (data ?? []) as unknown as AdminRow[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (payload: Draft) => {
      const sb = safeSupabase()!;
      const values: Record<string, string | number | null> = {};
      resource.fields.forEach((field) => {
        const raw = payload[field.key] ?? "";
        values[field.key] =
          field.type === "number"
            ? raw === "" ? null : Number(raw)
            : field.type === "date"
              ? raw === "" ? null : raw
              : raw === "" ? null : raw;
      });
      if (editingId === null) {
        const { error } = await sb.from(resource.table).insert(values);
        if (error) throw error;
      } else {
        const { error } = await sb.from(resource.table).update(values).eq("id", editingId);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", resource.table] });
      qc.invalidateQueries({ queryKey: ["content", resource.table] });
      setDraft(null);
      setEditingId(null);
      toast({ title: t("تم الحفظ بنجاح", "Saved successfully") });
    },
    onError: (error: Error) => {
      toast({ title: t("فشل الحفظ", "Save failed"), description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const sb = safeSupabase()!;
      const { error } = await sb.from(resource.table).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", resource.table] });
      qc.invalidateQueries({ queryKey: ["content", resource.table] });
      toast({ title: t("تم الحذف", "Deleted") });
    },
    onError: (error: Error) => {
      toast({ title: t("فشل الحذف", "Delete failed"), description: error.message, variant: "destructive" });
    },
  });

  const openNew = () => {
    setDraft({});
    setEditingId(null);
  };

  const openEdit = (row: AdminRow) => {
    const d: Draft = {};
    resource.fields.forEach((field) => {
      d[field.key] = String(row[field.key] ?? "");
    });
    setDraft(d);
    setEditingId(row.id);
  };

  const uploadFile = async (fieldKey: string, file: File) => {
    const sb = safeSupabase();
    if (!sb) return;
    setUploading(fieldKey);
    const path = `${resource.table}/${Date.now()}-${file.name}`;
    const { error } = await sb.storage.from("media").upload(path, file, { upsert: true });
    setUploading(null);
    if (error) {
      toast({ title: t("فشل رفع الصورة", "Upload failed"), description: error.message, variant: "destructive" });
      return;
    }
    const { data } = sb.storage.from("media").getPublicUrl(path);
    setDraft((prev) => (prev ? { ...prev, [fieldKey]: data.publicUrl } : prev));
  };

  const label = (field: FieldDef) => (language === "ar" ? field.labelAr : field.labelEn);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          {language === "ar" ? resource.titleAr : resource.titleEn}
          <span className="text-muted-foreground text-base mr-2">({list.data?.length ?? 0})</span>
        </h2>
        <Button onClick={openNew}>
          <Plus className="w-4 h-4" />
          {t("إضافة جديد", "Add new")}
        </Button>
      </div>

      {list.isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : list.error ? (
        <p className="text-destructive text-center py-10">
          {t("تعذر تحميل القائمة — تأكد من تنفيذ أمر إنشاء الجداول", "Could not load list — make sure the schema was created")}
        </p>
      ) : (list.data ?? []).length === 0 ? (
        <p className="text-muted-foreground text-center py-10">{t("لا توجد عناصر بعد", "No items yet")}</p>
      ) : (
        <div className="grid gap-3">
          {(list.data ?? []).map((row) => (
            <div key={row.id} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground truncate">{resource.primary(row)}</p>
                {resource.secondary && row && (
                  <p className="text-xs text-muted-foreground truncate">
                    {resource.secondary(row)}
                  </p>
                )}
              </div>
              <Button variant="outline" size="sm" onClick={() => openEdit(row)}>
                <Pencil className="w-4 h-4" />
                {t("تعديل", "Edit")}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  if (window.confirm(t("متأكد من الحذف؟", "Delete this item?"))) {
                    deleteMutation.mutate(row.id);
                  }
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <Dialog open={draft !== null} onOpenChange={(open) => !open && setDraft(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto" dir={language === "ar" ? "rtl" : "ltr"}>
          <DialogHeader>
            <DialogTitle>
              {editingId === null ? t("إضافة عنصر", "Add item") : t("تعديل عنصر", "Edit item")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid sm:grid-cols-2 gap-4 py-2">
            {(resource.fields ?? []).map((field) => (
              <div key={field.key} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
                <label className="block text-sm font-medium text-foreground mb-1.5">{label(field)}</label>
                {field.type === "textarea" ? (
                  <Textarea
                    rows={4}
                    value={draft?.[field.key] ?? ""}
                    onChange={(e) => setDraft((prev) => (prev ? { ...prev, [field.key]: e.target.value } : prev))}
                  />
                ) : field.type === "select" ? (
                  <select
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                    value={draft?.[field.key] ?? ""}
                    onChange={(e) => setDraft((prev) => (prev ? { ...prev, [field.key]: e.target.value } : prev))}
                  >
                    <option value="">—</option>
                    {(field.options ?? []).map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : field.type === "image" ? (
                  <div className="flex gap-2">
                    <Input
                      value={draft?.[field.key] ?? ""}
                      onChange={(e) => setDraft((prev) => (prev ? { ...prev, [field.key]: e.target.value } : prev))}
                      dir="ltr"
                    />
                    <label className="flex items-center gap-1.5 px-3 rounded-lg border border-input bg-background text-xs cursor-pointer shrink-0">
                      {uploading === field.key ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                      {t("رفع", "Upload")}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) void uploadFile(field.key, file);
                        }}
                      />
                    </label>
                  </div>
                ) : (
                  <Input
                    type={field.type === "date" ? "date" : field.type === "number" ? "number" : "text"}
                    value={draft?.[field.key] ?? ""}
                    onChange={(e) => setDraft((prev) => (prev ? { ...prev, [field.key]: e.target.value } : prev))}
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDraft(null)}>
              {t("إلغاء", "Cancel")}
            </Button>
            <Button onClick={() => draft && saveMutation.mutate(draft)} disabled={saveMutation.isPending}>
              {saveMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              {t("حفظ", "Save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
