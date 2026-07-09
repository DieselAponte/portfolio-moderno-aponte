"use server";

import { getSupabaseClient } from "../../../lib/supabase";
import { z } from "zod";

export type ContactSubmission = {
	id: string;
	service: string;
	email: string;
	project: string;
	created_at: string;
};

export type ContactSubmissionInsert = {
	service: string;
	email: string;
	project: string;
};

const contactSchema = z.object({
	service: z.string().min(1, "Please select a service."),
	email: z.string().email("Please enter a valid email address."),
	project: z.string().min(10, "Please describe your project (at least 10 characters)."),
});

export type ContactFormState = {
	success: boolean;
	error: string | null;
	fieldErrors: Record<string, string[]>;
};

export const submitContactForm = async (
	_prevState: ContactFormState,
	formData: FormData,
): Promise<ContactFormState> => {
	const raw = {
		service: formData.get("service") as string,
		email: formData.get("email") as string,
		project: formData.get("project") as string,
	};

	const parsed = contactSchema.safeParse(raw);

	if (!parsed.success) {
		return {
			success: false,
			error: "Please fix the errors below.",
			fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
		};
	}

	const client = getSupabaseClient();
	const { error } = await client
		.from("contact_submissions")
		.insert([parsed.data]);

	if (error) {
		console.error("Error submitting contact form:", error);
		return {
			success: false,
			error: "Something went wrong. Please try again later.",
			fieldErrors: {},
		};
	}

	return {
		success: true,
		error: null,
		fieldErrors: {},
	};
};
