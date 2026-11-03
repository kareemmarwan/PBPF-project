# SUPABASE-SETUP.md — تهيئة قاعدة البيانات للوحة التحكم

> اتبع الخطوات التالية مرة واحدة. لوحة التحكم `/admin` لن تعمل قبل إنجازها.

## 1) إنشاء المشروع

1. افتح https://supabase.com وأنشئ "New Project" مجاني.
2. احفظ خيار Area/Europe-Gulf المفترض.

## 2) تمرير البيانات إلى الموقع

أنشئ ملف `‌.env.local` في الجذر وأضف:

```
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ... (مفتاح anon public)
```

بعدها أعد تشغيل `npm run dev`.

## 3) إنشاء الجداول (SQL)

انسخ SQL التالي كاملاً وألصقه في Supabase → SQL Editor → New query → Run.

```sql
-- ===== جداول المحتوى =====
create table if not exists public.news (
  id bigint generated always as identity primary key,
  title_ar text not null default '',
  title_en text not null default '',
  excerpt_ar text default '',
  excerpt_en text default '',
  content_ar text default '',
  content_en text default '',
  category_ar text default '',
  category_en text default '',
  event_date date,
  image_url text,
  created_at timestamptz default now()
);

create table if not exists public.projects (
  id bigint generated always as identity primary key,
  slug text not null default '',
  title_ar text default '',
  title_en text default '',
  desc_short_ar text default '',
  desc_short_en text default '',
  desc_long_ar text default '',
  desc_long_en text default '',
  beneficiaries_ar text default '',
  beneficiaries_en text default '',
  stats jsonb default '[]'::jsonb,
  image_url text,
  created_at timestamptz default now()
);

create table if not exists public.gallery_images (
  id bigint generated always as identity primary key,
  image_url text,
  alt_ar text default '',
  alt_en text default '',
  category text default 'مشاريع',
  created_at timestamptz default now()
);

create table if not exists public.books (
  id bigint generated always as identity primary key,
  title_ar text default '',
  title_en text default '',
  desc_ar text default '',
  desc_en text default '',
  year text default '',
  pages int,
  pdf_url text,
  created_at timestamptz default now()
);

create table if not exists public.stories (
  id bigint generated always as identity primary key,
  title_ar text default '',
  title_en text default '',
  excerpt_ar text default '',
  excerpt_en text default '',
  created_at timestamptz default now()
);

create table if not exists public.testimonials (
  id bigint generated always as identity primary key,
  content_ar text default '',
  content_en text default '',
  name_ar text default '',
  name_en text default '',
  role_ar text default '',
  role_en text default '',
  location_ar text default '',
  location_en text default '',
  created_at timestamptz default now()
);

create table if not exists public.impact_stats (
  id bigint generated always as identity primary key,
  icon text default 'Users',
  value text default '',
  label_ar text default '',
  label_en text default '',
  desc_ar text default '',
  desc_en text default '',
  created_at timestamptz default now()
);

create table if not exists public.messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.team_members (
  id bigint generated always as identity primary key,
  name_ar text default '',
  name_en text default '',
  role_ar text default '',
  role_en text default '',
  bio_ar text default '',
  bio_en text default '',
  category text default 'مجلس الإدارة',
  photo_url text,
  sort_index int default 0,
  created_at timestamptz default now()
);

create table if not exists public.hero_images (
  id bigint generated always as identity primary key,
  image_url text,
  alt_ar text default '',
  alt_en text default '',
  sort_index int default 0,
  created_at timestamptz default now()
);

create table if not exists public.hero_stats (
  id bigint generated always as identity primary key,
  value text default '',
  label_ar text default '',
  label_en text default '',
  sort_index int default 0,
  created_at timestamptz default now()
);

create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  contact_phone text default '+966500000000',
  contact_phone_display text default '+966 50 000 0000',
  contact_email text default 'info@arabheritage.org',
  address_ar text default 'المملكة العربية السعودية',
  address_en text default 'Saudi Arabia',
  donation_iban text default 'SA00 0000 0000 0000 0000 0000',
  donation_account_name_ar text default 'مؤسسة جسور السلام الفلسطينية للعون والتنمية',
  donation_account_name_en text default 'Palestinian Bridges of Peace Foundation for Relief and Development',
  donation_click_link text default '',
  donation_paypal_link text default '',
  donation_usdt_address text default '',
  donation_usdt_network text default 'TRC20',
  hero_badge_ar text default 'مؤسسة ثقافية وإنسانية',
  hero_badge_en text default 'Cultural & Humanitarian Foundation',
  hero_title_ar text default 'معاً نبني',
  hero_title_accent_ar text default 'مستقبلاً',
  hero_title_line2_ar text default 'أفضل للجميع',
  hero_title_en text default 'Together We Build',
  hero_title_accent_en text default 'a Better',
  hero_title_line2_en text default 'Future for All',
  hero_subtitle_ar text default '',
  hero_subtitle_en text default '',
  updated_at timestamptz default now()
);

insert into public.site_settings (id) values (1) on conflict (id) do nothing;

-- ===== RLS + الصلاحيات =====
alter table public.news enable row level security;
alter table public.projects enable row level security;
alter table public.gallery_images enable row level security;
alter table public.books enable row level security;
alter table public.stories enable row level security;
alter table public.testimonials enable row level security;
alter table public.impact_stats enable row level security;
alter table public.team_members enable row level security;
alter table public.hero_images enable row level security;
alter table public.hero_stats enable row level security;
alter table public.messages enable row level security;
alter table public.site_settings enable row level security;

create policy "content public read" on public.news for select using (true);
create policy "content public read" on public.projects for select using (true);
create policy "content public read" on public.gallery_images for select using (true);
create policy "content public read" on public.books for select using (true);
create policy "content public read" on public.stories for select using (true);
create policy "content public read" on public.testimonials for select using (true);
create policy "content public read" on public.impact_stats for select using (true);
create policy "content public read" on public.team_members for select using (true);
create policy "content public read" on public.hero_images for select using (true);
create policy "content public read" on public.hero_stats for select using (true);
create policy "content public read" on public.site_settings for select using (true);

create policy "content admin all" on public.news for all to authenticated using (true) with check (true);
create policy "content admin all" on public.projects for all to authenticated using (true) with check (true);
create policy "content admin all" on public.gallery_images for all to authenticated using (true) with check (true);
create policy "content admin all" on public.books for all to authenticated using (true) with check (true);
create policy "content admin all" on public.stories for all to authenticated using (true) with check (true);
create policy "content admin all" on public.testimonials for all to authenticated using (true) with check (true);
create policy "content admin all" on public.impact_stats for all to authenticated using (true) with check (true);
create policy "content admin all" on public.team_members for all to authenticated using (true) with check (true);
create policy "content admin all" on public.hero_images for all to authenticated using (true) with check (true);
create policy "content admin all" on public.hero_stats for all to authenticated using (true) with check (true);
create policy "content admin all" on public.site_settings for all to authenticated using (true) with check (true);

create policy "messages anon insert" on public.messages for insert to anon with check (true);
create policy "messages admin all" on public.messages for all to authenticated using (true) with check (true);
```

ملاحظة: في أول تنفيذ ربما ظهرَ خلل نتيجة سابقة من نفس النص — راجع الرسالة فقط.

### 3.1) ترقية قاعدة قائمة (إن نفّذت النص قبل إضافة الجداول الجديدة)

عند وجود النسخة الأقدم فقط، شغّل هذا الملحق — آمن للتكرار ويتجاوز الموجود مسبقاً:

```sql
create table if not exists public.team_members (
  id bigint generated always as identity primary key,
  name_ar text default '', name_en text default '',
  role_ar text default '', role_en text default '',
  bio_ar text default '', bio_en text default '',
  category text default 'مجلس الإدارة',
  photo_url text, sort_index int default 0,
  created_at timestamptz default now()
);

create table if not exists public.hero_images (
  id bigint generated always as identity primary key,
  image_url text, alt_ar text default '', alt_en text default '',
  sort_index int default 0, created_at timestamptz default now()
);

create table if not exists public.hero_stats (
  id bigint generated always as identity primary key,
  value text default '', label_ar text default '', label_en text default '',
  sort_index int default 0, created_at timestamptz default now()
);

alter table public.site_settings add column if not exists donation_paypal_link text default '';
alter table public.site_settings add column if not exists donation_account_name_ar text default 'مؤسسة جسور السلام الفلسطينية للعون والتنمية';
alter table public.site_settings add column if not exists donation_account_name_en text default 'Palestinian Bridges of Peace Foundation for Relief and Development';
alter table public.site_settings add column if not exists donation_usdt_address text default '';
alter table public.site_settings add column if not exists donation_usdt_network text default 'TRC20';
alter table public.site_settings add column if not exists hero_badge_ar text default '';
alter table public.site_settings add column if not exists hero_badge_en text default '';
alter table public.site_settings add column if not exists hero_title_ar text default '';
alter table public.site_settings add column if not exists hero_title_accent_ar text default '';
alter table public.site_settings add column if not exists hero_title_line2_ar text default '';
alter table public.site_settings add column if not exists hero_title_en text default '';
alter table public.site_settings add column if not exists hero_title_accent_en text default '';
alter table public.site_settings add column if not exists hero_title_line2_en text default '';
alter table public.site_settings add column if not exists hero_subtitle_ar text default '';
alter table public.site_settings add column if not exists hero_subtitle_en text default '';

alter table public.team_members enable row level security;
alter table public.hero_images enable row level security;
alter table public.hero_stats enable row level security;

do $$ begin
  create policy "content public read" on public.team_members for select using (true);
  create policy "content public read" on public.hero_images for select using (true);
  create policy "content public read" on public.hero_stats for select using (true);
  create policy "content admin all" on public.team_members for all to authenticated using (true) with check (true);
  create policy "content admin all" on public.hero_images for all to authenticated using (true) with check (true);
  create policy "content admin all" on public.hero_stats for all to authenticated using (true) with check (true);
exception when duplicate_object then null; end $$;
```

## 4) إنشاء المستخدم المدير

Authentication → Users → **Add user** (Email + كلمة مرور قوية) → Confirm (Auto Confirm ON).

## 5) تخزين الصور (Bucket)

Storage → Create bucket → الاسم: **media** (حروف صغيرة) → Public = ON.

الرِّفع من اللوحة يحتاج سياسات `storage.objects` — Public يسمح بالقراءة فقط. شغّل في SQL Editor (آمن للتكرار):

```sql
do $$ begin
  create policy "media admin write" on storage.objects
    for insert to authenticated with check (bucket_id = 'media');
  create policy "media admin update" on storage.objects
    for update to authenticated using (bucket_id = 'media') with check (bucket_id = 'media');
  create policy "media admin delete" on storage.objects
    for delete to authenticated using (bucket_id = 'media');
  create policy "media public read" on storage.objects
    for select using (bucket_id = 'media');
exception when duplicate_object then null; end $$;
```

## 6) بذور البيانات (اختياري)

```sql
insert into public.projects (slug, title_ar, title_en, desc_short_ar, desc_short_en, beneficiaries_ar, beneficiaries_en, stats, image_url) values
  ('bakery', 'فرن الخير', 'Bread of Goodness', 'توفير الخبز الطازج يومياً للأسر المحتاجة في المناطق الأكثر احتياجاً', 'Providing fresh bread daily to needy families', '2,000+ أسرة', '2,000+ Families',
   '[{"label_ar":"أسرة مستفيدة","label_en":"Families served","value":"2,000+"},{"label_ar":"رغيف يومياً","label_en":"Loaves daily","value":"5,000"},{"label_ar":"منطقة","label_en":"Areas","value":"10"}]'::jsonb, null);
```

## 7) المشكلة الشائعة

- إذا ظهر "policy already exists": عدّل الواسم في SQL بأسماء مختلفة.
- إذا ظهر "permission denied": تأكد أنّ المفاتيح صحيحة وأنّ RLS نسخة القواعد أعلاه.
