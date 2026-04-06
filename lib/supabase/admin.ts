import "server-only";

import { createClient } from "@supabase/supabase-js";

import { env } from "@/lib/config/env";
import type { Database } from "@/lib/supabase/types";

let supabaseAdminClient: ReturnType<typeof createClient<Database, "public", any>> | null = null;

export function getSupabaseAdmin(): ReturnType<typeof createClient<Database, "public", any>> {
  if (!env.supabaseUrl || !env.supabaseServiceRoleKey) {
    throw new Error("Missing Supabase environment variables. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }

  if (!supabaseAdminClient) {
    supabaseAdminClient = createClient<Database, "public", any>(
      env.supabaseUrl,
      env.supabaseServiceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
  }

  return supabaseAdminClient;
}
