"use client";

import { createContext, useContext, ReactNode, useMemo, useCallback } from "react";
import { authClient } from "../../lib/auth-client";

type SessionData = typeof authClient.$Infer.Session;

export interface AuthContextValue {
  session: SessionData["session"] | null;
  user: SessionData["user"] | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (provider: "github" | "google") => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: sessionData, isPending: isLoading } = authClient.useSession();
  
  const session = sessionData?.session ?? null;
  const user = sessionData?.user ?? null;

  const signIn = useCallback(async (provider: "github" | "google") => {
    const { error } = await authClient.signIn.social({
      provider,
    });
    if (error) {
      throw new Error(error.message || "Failed to sign in");
    }
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await authClient.signOut();
    if (error) {
      throw new Error(error.message || "Failed to sign out");
    }
  }, []);

  const value = useMemo(
    () => ({
      session,
      user,
      isLoading,
      isAuthenticated: Boolean(session),
      signIn,
      signOut,
    }),
    [session, user, isLoading, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
