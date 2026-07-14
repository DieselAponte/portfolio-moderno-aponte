"use client";

import { useGuestbookAuth } from "../../../features/guestbook/hooks/useGuestbookAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGuestbook } from "../../../features/guestbook/hooks/useGuestbook";

export default function AdminUsersPage() {
    const { user, isLoading: authLoading } = useGuestbookAuth();
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);

    const { notes, isLoading: notesLoading } = useGuestbook();

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (!authLoading) {
            if (!user) {
                router.push("/guestbook");
            } else {
                timeoutId = setTimeout(() => {
                    setIsAdmin(user?.role === "admin");
                    setIsCheckingAdmin(false);
                }, 0);
            }
        }
        return () => clearTimeout(timeoutId);
    }, [user, authLoading, router]);

    if (authLoading || isCheckingAdmin) {
        return <div className="p-8 text-white">Loading admin panel...</div>;
    }

    if (!isAdmin) {
        return <div className="p-8 text-white">Access Denied. You must be an administrator.</div>;
    }

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-white pt-24 px-8 pb-8">
            <h1 className="text-3xl font-bold mb-8">Admin Users & Publications Panel</h1>
            <div className="space-y-8">

                <div className="border border-aperture-gray/50 rounded-lg p-6 bg-aperture-dark/50">
                    <h2 className="text-xl font-semibold mb-4 text-aperture-blue">Guestbook Notes Overview</h2>

                    {notesLoading ? (
                        <p className="text-zinc-400">Loading notes...</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10 text-aperture-yellow text-sm">
                                        <th className="p-3">Author</th>
                                        <th className="p-3">Email</th>
                                        <th className="p-3">Message</th>
                                        <th className="p-3">Date</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notes.map(note => (
                                        <tr key={note.id} className="border-b border-white/5 hover:bg-white/5">
                                            <td className="p-3 text-sm">{note.author}</td>
                                            <td className="p-3 text-sm text-zinc-400">{note.email || 'N/A'}</td>
                                            <td className="p-3 text-sm text-zinc-300 max-w-xs truncate" title={note.message}>{note.message}</td>
                                            <td className="p-3 text-sm text-zinc-500">{new Date(note.created_at).toLocaleDateString()}</td>
                                            <td className="p-3">
                                                <button className="text-red-400 hover:text-red-300 text-xs uppercase tracking-widest font-bold">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {notes.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="p-4 text-center text-zinc-500">No notes found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
