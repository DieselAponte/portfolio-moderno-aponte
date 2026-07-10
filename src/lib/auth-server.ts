import { headers } from "next/headers";
import { auth } from "./auth";

/**
 * Retrieves the Better-Auth session from the server context (Server Components, API Routes, Server Actions).
 * Returns null if no valid session is found.
 */
export const getServerSession = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        return session;
    } catch (error) {
        console.error("Failed to get server session:", error);
        return null;
    }
};

/**
 * Ensures a valid session exists. Throws an error if the user is not authenticated.
 * Use this to protect Server Actions and API Routes.
 */
export const requireServerSession = async () => {
    const sessionData = await getServerSession();
    
    if (!sessionData || !sessionData.session) {
        throw new Error("Authentication required.");
    }
    
    return sessionData;
};
