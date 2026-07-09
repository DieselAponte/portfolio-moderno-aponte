import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { sentinelClient } from "@better-auth/infra/client"
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_SITE_URL!,
    plugins: [
        adminClient(),
        sentinelClient()
    ]
});