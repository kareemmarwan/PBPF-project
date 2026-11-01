import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL ?? "";
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = Boolean(url && anonKey);

let client: SupabaseClient | null = null;

if (isSupabaseConfigured) {
  client = createClient(url, anonKey);
}

export function getSupabase(): SupabaseClient {
  if (!client) {
    throw new Error("Supabase is not configured");
  }
  return client;
}

export function safeSupabase(): SupabaseClient | null {
  return client;
}
