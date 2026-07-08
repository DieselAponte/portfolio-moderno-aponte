import { betterAuth } from "better-auth";
//import { dash } from "@better-auth/infra"
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
    database: {
        provider: "postgresql",
        url: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/postgres"
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
