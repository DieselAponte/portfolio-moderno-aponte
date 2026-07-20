"use client";

import { PublicationType } from "../../../../experience/types";

const TYPE_OPTIONS = [
    {
        type: PublicationType.EDUCATION,
        label: "Education",
        description: "Formación académica y certificaciones",
        color: "aperture-blue",
    },
    {
        type: PublicationType.PROJECT,
        label: "Project",
        description: "Proyectos personales y profesionales",
        color: "aperture-yellow",
    },
    {
        type: PublicationType.EXPERIENCE,
        label: "Experience",
        description: "Experiencia profesional y laboral",
        color: "green-400",
    },
];

interface SelectTypeNivelPublicacionProps {
    selected: PublicationType | null;
    onSelect: (type: PublicationType) => void;
    onContinue: () => void;
}

export const SelectTypeNivelPublicacion = ({
    selected,
    onSelect,
    onContinue,
}: SelectTypeNivelPublicacionProps) => {
    return (
        <div className="space-y-8">
            <h4 className="font-mono text-sm uppercase tracking-[0.2em] text-aperture-yellow">
                Elige qué tipo de Publicación vas a hacer
            </h4>

            <div className="flex flex-wrap gap-4">
                {TYPE_OPTIONS.map((opt) => {
                    const isActive = selected === opt.type;
                    return (
                        <button
                            key={opt.type}
                            type="button"
                            onClick={() => onSelect(opt.type)}
                            className={`flex-1 min-w-[160px] rounded-xl border-2 p-5 text-left transition ${
                                isActive
                                    ? `border-${opt.color}/60 bg-${opt.color}/10`
                                    : "border-aperture-gray/30 bg-aperture-dark/30 hover:border-zinc-500"
                            }`}
                        >
                            <p className={`font-mono text-xs uppercase tracking-[0.25em] ${
                                isActive ? `text-${opt.color}` : "text-zinc-400"
                            }`}>
                                {opt.label}
                            </p>
                            <p className="mt-1 text-[10px] text-zinc-500">
                                {opt.description}
                            </p>
                        </button>
                    );
                })}
            </div>

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={onContinue}
                    disabled={!selected}
                    className="rounded-lg border border-aperture-blue/50 bg-aperture-blue/10 px-6 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-aperture-blue transition hover:bg-aperture-blue/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                    Continuar
                </button>
            </div>
        </div>
    );
};
