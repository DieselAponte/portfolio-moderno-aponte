import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
    database: {
        provider: "postgresql",
        url: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/postgres" // use NEXT_PUBLIC_SUPABASE_URL and similar if needed, or normal DATABASE_URL
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }
    },
    plugins: [
        admin()
    ]
});
