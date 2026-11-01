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

create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  contact_phone text default '+966500000000',
  contact_phone_display text default '+966 50 000 0000',
  contact_email text default 'info@arabheritage.org',
  address_ar text default 'المملكة العربية السعودية',
  address_en text default 'Saudi Arabia',
  donation_iban text default 'SA00 0000 0000 0000 0000 0000',
  donation_click_link text default '',
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
alter table public.messages enable row level security;
alter table public.site_settings enable row level security;

create policy "content public read" on public.news for select using (true);
create policy "content public read" on public.projects for select using (true);
create policy "content public read" on public.gallery_images for select using (true);
create policy "content public read" on public.books for select using (true);
create policy "content public read" on public.stories for select using (true);
create policy "content public read" on public.testimonials for select using (true);
create policy "content public read" on public.impact_stats for select using (true);
create policy "content public read" on public.site_settings for select using (true);

create policy "content admin all" on public.news for all to authenticated using (true) with check (true);
create policy "content admin all" on public.projects for all to authenticated using (true) with check (true);
create policy "content admin all" on public.gallery_images for all to authenticated using (true) with check (true);
create policy "content admin all" on public.books for all to authenticated using (true) with check (true);
create policy "content admin all" on public.stories for all to authenticated using (true) with check (true);
create policy "content admin all" on public.testimonials for all to authenticated using (true) with check (true);
create policy "content admin all" on public.impact_stats for all to authenticated using (true) with check (true);
create policy "content admin all" on public.site_settings for all to authenticated using (true) with check (true);

create policy "messages anon insert" on public.messages for insert to anon with check (true);
create policy "messages admin all" on public.messages for all to authenticated using (true) with check (true);
```

ملاحظة: في أول تنفيذ ربما ظهرَ خلل نتيجة سابقة من نفس النص — راجع الرسالة فقط.

## 4) إنشاء المستخدم المدير

Authentication → Users → **Add user** (Email + كلمة مرور قوية) → Confirm (Auto Confirm ON).

## 5) تخزين الصور (Bucket)

Storage → Create bucket → الاسم: **media** → Public = ON.

## 6) بذور البيانات (اختياري)

```sql
insert into public.projects (slug, title_ar, title_en, desc_short_ar, desc_short_en, beneficiaries_ar, beneficiaries_en, stats, image_url) values
  ('bakery', 'فرن الخير', 'Bread of Goodness', 'توفير الخبز الطازج يومياً للأسر المحتاجة في المناطق الأكثر احتياجاً', 'Providing fresh bread daily to needy families', '2,000+ أسرة', '2,000+ Families',
   '[{"label_ar":"أسرة مستفيدة","label_en":"Families served","value":"2,000+"},{"label_ar":"رغيف يومياً","label_en":"Loaves daily","value":"5,000"},{"label_ar":"منطقة","label_en":"Areas","value":"10"}]'::jsonb, null);
```

## 7) المشكلة الشائعة

- إذا ظهر "policy already exists": عدّل الواسم في SQL بأسماء مختلفة.
- إذا ظهر "permission denied": تأكد أنّ المفاتيح صحيحة وأنّ RLS نسخة القواعد أعلاه.
