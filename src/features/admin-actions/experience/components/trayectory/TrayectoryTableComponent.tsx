"use client";

import { Plus, Pencil } from "lucide-react";
import type { FullPublication, PublicationType } from "../../../../experience/types";

const TYPE_LABELS: Record<string, string> = {
    EDUCATION: "Educación",
    PROJECT: "Proyecto",
    EXPERIENCE: "Experiencia",
};

const TYPE_COLORS: Record<string, string> = {
    EDUCATION: "text-aperture-blue",
    PROJECT: "text-aperture-yellow",
    EXPERIENCE: "text-green-400",
};

interface TrayectoryTableComponentProps {
    publicaciones: FullPublication[];
    onAdd: () => void;
    onEdit: (pub: FullPublication) => void;
}

export const TrayectoryTableComponent = ({
    publicaciones,
    onAdd,
    onEdit,
}: TrayectoryTableComponentProps) => {
    return (
        <div>
            <div className="mb-6 flex items-center gap-3">
                <h3 className="text-lg font-semibold text-aperture-yellow">
                    Trayectoria
                </h3>
                <button
                    onClick={onAdd}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-aperture-blue/40 bg-aperture-blue/10 text-aperture-blue transition hover:bg-aperture-blue/20 hover:text-white"
                >
                    <Plus className="h-3.5 w-3.5" />
                </button>
            </div>

            {publicaciones.length === 0 ? (
                <p className="font-mono text-xs text-zinc-500">
                    No hay publicaciones de trayectoria registradas.
                </p>
            ) : (
                <div className="overflow-hidden rounded-lg border border-aperture-gray/40">
                    {/* Table Header */}
                    <div className="grid grid-cols-[1fr_180px_100px] border-b border-aperture-gray/30 bg-aperture-dark/60 px-4 py-3">
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                            Título
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                            Tipo de Publicación
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500 text-center">
                            Acción
                        </span>
                    </div>

                    {/* Table Rows */}
                    {publicaciones.map((pub) => (
                        <div
                            key={pub.id}
                            className="grid grid-cols-[1fr_180px_100px] items-center border-b border-aperture-gray/20 px-4 py-3 transition last:border-b-0 hover:bg-white/[0.02]"
                        >
                            <span className="truncate text-sm text-white">
                                {pub.title}
                            </span>
                            <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${TYPE_COLORS[pub.type]}`}>
                                {TYPE_LABELS[pub.type]}
                            </span>
                            <div className="flex justify-center">
                                <button
                                    onClick={() => onEdit(pub)}
                                    className="flex items-center gap-1.5 rounded-md border border-aperture-blue/40 bg-aperture-blue/10 px-3 py-1 text-[9px] font-mono uppercase tracking-[0.2em] text-aperture-blue transition hover:bg-aperture-blue/20 hover:text-white"
                                >
                                    <Pencil className="h-2.5 w-2.5" />
                                    Editar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
