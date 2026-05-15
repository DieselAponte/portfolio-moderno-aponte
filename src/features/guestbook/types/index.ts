export type GuestbookNote = {
	id: string;
	author: string;
	message: string;
	email: string | null;
	site_url: string | null;
	github_url: string | null;
	avatar_url: string | null;
	created_at: string;
	user_id: string | null;
};

export type GuestbookNoteInsert = {
	author: string;
	message: string;
	email?: string | null;
	site_url?: string | null;
	github_url?: string | null;
	avatar_url?: string | null;
	user_id?: string | null;
};

export type GuestbookDatabase = {
	public: {
		Tables: {
			guestbook_notes: {
				Row: GuestbookNote;
				Insert: GuestbookNoteInsert;
				Update: Partial<GuestbookNoteInsert>;
			};
		};
	};
};
