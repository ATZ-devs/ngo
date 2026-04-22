import "server-only";

import { Resolver } from "node:dns/promises";
import { Agent } from "undici";

const SUPABASE_HOST_SUFFIX = ".supabase.co";
const PUBLIC_DNS_SERVERS = ["1.1.1.1", "1.0.0.1", "8.8.8.8", "8.8.4.4"];

type SupabaseFetchInit = RequestInit & {
  dispatcher?: Agent;
};

const publicDnsResolver = new Resolver();
publicDnsResolver.setServers(PUBLIC_DNS_SERVERS);

async function resolveSupabaseHost(hostname: string): Promise<string> {
  const addresses = await publicDnsResolver.resolve4(hostname);

  if (!addresses.length) {
    throw new Error(`Unable to resolve Supabase host: ${hostname}`);
  }

  return addresses[0];
}

const publicDnsAgent = new Agent({
  connect: {
    lookup(hostname, options, callback) {
      void resolveSupabaseHost(hostname)
        .then((address) => {
          if (options?.all) {
            callback(null, [{ address, family: 4 }]);
            return;
          }

          callback(null, address, 4);
        })
        .catch((error) => {
          callback(error as NodeJS.ErrnoException, "", 4);
        });
    },
  },
});

export function createSupabaseFetch(): typeof fetch {
  return async (input: RequestInfo | URL, init?: RequestInit) => {
    const requestUrl =
      input instanceof Request
        ? new URL(input.url)
        : new URL(input.toString());

    if (!requestUrl.hostname.endsWith(SUPABASE_HOST_SUFFIX)) {
      return globalThis.fetch(input, init);
    }

    const requestInit: SupabaseFetchInit = {
      ...(init ?? {}),
      dispatcher: publicDnsAgent,
    };

    return globalThis.fetch(input, requestInit as RequestInit);
  };
}