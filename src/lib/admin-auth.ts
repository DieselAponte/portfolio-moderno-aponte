"use server";

import { auth } from "./auth";
import { headers } from "next/headers";

/**
 * Checks if the current request is authenticated as an admin user.
 * Throws an error if the user is not authenticated or does not have the admin role.
 */
export const checkAdminAuth = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || session.user.role !== "admin") {
        throw new Error("Unauthorized");
    }
};
