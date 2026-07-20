"use client";

interface AddInfoEducationProps {
    data: { titulo: string; descripcion: string; institution: string; obtainedDate: string };
    onChange: (data: { titulo: string; descripcion: string; institution: string; obtainedDate: string }) => void;
    onContinue: () => void;
    error: string;
}

export const AddInfoEducation = ({ data, onChange, onContinue, error }: AddInfoEducationProps) => {
    return (
        <div className="space-y-5">
            <div>
                <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                    Titulo:
                </label>
                <input
                    type="text"
                    value={data.titulo}
                    onChange={(e) => onChange({ ...data, titulo: e.target.value })}
                    placeholder="Ej: Ingeniería de Sistemas"
                    className="w-full rounded-lg border border-aperture-gray bg-aperture-dark/80 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-aperture-blue/60"
                />
            </div>

            <div>
                <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                    Descripción:
                </label>
                <textarea
                    value={data.descripcion}
                    onChange={(e) => onChange({ ...data, descripcion: e.target.value })}
                    placeholder="Describe tu experiencia educativa..."
                    rows={4}
                    className="w-full rounded-lg border border-aperture-gray bg-aperture-dark/80 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-aperture-blue/60 resize-none"
                />
            </div>

            <div>
                <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                    Institución:
                </label>
                <input
                    type="text"
                    value={data.institution}
                    onChange={(e) => onChange({ ...data, institution: e.target.value })}
                    placeholder="Ej: Universidad de Lima"
                    className="w-full rounded-lg border border-aperture-gray bg-aperture-dark/80 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-aperture-blue/60"
                />
            </div>

            <div>
                <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                    Fecha de Obtención:
                </label>
                <input
                    type="date"
                    value={data.obtainedDate}
                    onChange={(e) => onChange({ ...data, obtainedDate: e.target.value })}
                    className="w-full rounded-lg border border-aperture-gray bg-aperture-dark/80 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-aperture-blue/60"
                />
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}

            <div className="flex justify-end pt-2">
                <button
                    type="button"
                    onClick={onContinue}
                    className="rounded-lg border border-aperture-blue/50 bg-aperture-blue/10 px-6 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-aperture-blue transition hover:bg-aperture-blue/20 hover:text-white"
                >
                    Continuar
                </button>
            </div>
        </div>
    );
};
