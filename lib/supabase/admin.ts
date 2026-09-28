import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
// Fallback ke anon key jika developer belum mensetting service role key di .env
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy-key";

// Supabase Admin client hanya boleh dipanggil dari server (Node.js/Next.js API Routes).
// Menggunakan Service Role Key untuk bypass Row Level Security (RLS) dengan aman.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
