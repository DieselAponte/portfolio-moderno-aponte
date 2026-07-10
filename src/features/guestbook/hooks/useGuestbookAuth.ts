"use client";

import { useAuth } from "../../../components/providers/AuthProvider";

export const useGuestbookAuth = () => {
	return useAuth();
};
