import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

import { env } from "@/lib/config/env";
import type { Database } from "@/lib/supabase/types";
import { createSupabaseFetch } from "@/lib/supabase/public-dns-fetch";

let supabaseAdminClient: SupabaseClient<Database> | null = null;

export function getSupabaseAdmin(): SupabaseClient<Database> {
  if (!env.supabaseUrl || !env.supabaseServiceRoleKey) {
    throw new Error("Missing Supabase environment variables. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }

  if (!supabaseAdminClient) {
    supabaseAdminClient = createClient<Database>(
      env.supabaseUrl,
      env.supabaseServiceRoleKey,
      {
        global: {
          fetch: createSupabaseFetch(),
        },
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
  }

  return supabaseAdminClient;
}
