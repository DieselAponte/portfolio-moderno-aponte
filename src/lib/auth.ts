import { betterAuth } from "better-auth";
import { dash } from "@better-auth/infra"
import { admin } from "better-auth/plugins";
import { Pool } from "pg";

export const auth = betterAuth({
  emailAndPassword: { enabled: false },
  database: new Pool({
    connectionString: process.env.SUPABASE_URL,
  }),
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
    dash(),
    admin()
  ]
});
