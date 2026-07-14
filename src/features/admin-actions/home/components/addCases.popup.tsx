"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";

interface AddCasesPopupProps {
  onAdd: (data: {
    title: string;
    description: string;
    tags: string[];
    order_index: number;
  }) => Promise<void>;
  onCancel: () => void;
  currentCount: number;
}

export const AddCasesPopup = ({
  onAdd,
  onCancel,
  currentCount,
}: AddCasesPopupProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed) return;
    if (tags.length >= 8) {
      setError("Máximo 8 tags permitidos.");
      return;
    }
    if (tags.includes(trimmed)) {
      setError("Este tag ya existe.");
      return;
    }
    setTags([...tags, trimmed]);
    setTagInput("");
    setError("");
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("El título es obligatorio.");
      return;
    }
    if (!description.trim()) {
      setError("La descripción es obligatoria.");
      return;
    }

    setIsSaving(true);
    setError("");
    try {
      await onAdd({
        title: title.trim(),
        description: description.trim(),
        tags,
        order_index: currentCount + 1,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al añadir caso de estudio."
      );
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="glass-panel relative w-full max-w-lg rounded-2xl px-8 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-aperture-yellow">
            Añadiendo Caso de Estudio:
          </h3>
          <button
            onClick={onCancel}
            className="text-zinc-400 transition hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Title */}
          <div>
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Web Ecommerce"
              className="w-full rounded-lg border border-aperture-gray bg-aperture-dark/80 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-aperture-blue/60"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
              Descripción
              <span className="ml-2 text-zinc-600">
                ({description.length}/500)
              </span>
            </label>
            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value.slice(0, 500))
              }
              maxLength={500}
              rows={3}
              placeholder="Breve descripción del caso de estudio..."
              className="w-full resize-none rounded-lg border border-aperture-gray bg-aperture-dark/80 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-aperture-blue/60"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
              Tags
              <span className="ml-2 text-zinc-600">({tags.length}/8)</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ej: TypeScript, Next.js..."
                disabled={tags.length >= 8}
                className="flex-1 rounded-lg border border-aperture-gray bg-aperture-dark/80 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-aperture-blue/60 disabled:opacity-40"
              />
              <button
                onClick={addTag}
                disabled={tags.length >= 8 || !tagInput.trim()}
                className="flex items-center gap-1 rounded-lg border border-aperture-blue/40 bg-aperture-blue/10 px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-aperture-blue transition hover:bg-aperture-blue/20 disabled:opacity-40"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
            {tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((t, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 rounded-full border border-aperture-gray/70 bg-aperture-dark/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-aperture-blue"
                  >
                    {t}
                    <button
                      onClick={() => removeTag(i)}
                      className="text-zinc-500 transition hover:text-red-400"
                    >
                      <X className="h-2.5 w-2.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Error */}
          {error && <p className="text-xs text-red-400">{error}</p>}
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={onCancel}
            disabled={isSaving}
            className="flex-1 rounded-lg border border-aperture-gray px-4 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-zinc-300 transition hover:border-white/30 hover:text-white disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="flex-1 rounded-lg border border-aperture-blue/50 bg-aperture-blue/10 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-aperture-blue transition hover:bg-aperture-blue/20 hover:text-white disabled:opacity-50"
          >
            {isSaving ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-3 w-3 animate-spin rounded-full border border-aperture-blue border-t-transparent" />
                Añadiendo...
              </span>
            ) : (
              "Añadir"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
