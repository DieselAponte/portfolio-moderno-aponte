"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface ConfirmDeletePopupProps {
  itemTitle: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export const ConfirmDeletePopup = ({
  itemTitle,
  onConfirm,
  onCancel,
}: ConfirmDeletePopupProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
    } catch (err) {
      console.error("Error deleting:", err);
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="glass-panel relative w-full max-w-md rounded-2xl border border-red-500/30 px-8 py-8">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 text-zinc-400 transition hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Warning Icon */}
        <div className="mb-5 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-red-500/40 bg-red-500/10">
            <span className="text-2xl">⚠</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-center font-mono text-sm uppercase tracking-[0.2em] text-red-400">
          Confirmar Eliminación
        </h3>

        {/* Message */}
        <p className="mb-8 text-center text-sm leading-6 text-zinc-300">
          ¿Estás seguro de que quieres eliminar{" "}
          <span className="font-semibold text-white">&quot;{itemTitle}&quot;</span>?
          Esta acción no se puede deshacer.
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 rounded-lg border border-aperture-gray px-4 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-zinc-300 transition hover:border-white/30 hover:text-white disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-red-400 transition hover:bg-red-500/20 hover:text-red-300 disabled:opacity-50"
          >
            {isDeleting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-3 w-3 animate-spin rounded-full border border-red-400 border-t-transparent" />
                Eliminando...
              </span>
            ) : (
              "Eliminar"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
