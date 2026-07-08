import { createAuthClient } from "better-auth/react";
import { sentinelClient } from "@better-auth/infra/client"
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    plugins: [
        adminClient(),
    ]
});
