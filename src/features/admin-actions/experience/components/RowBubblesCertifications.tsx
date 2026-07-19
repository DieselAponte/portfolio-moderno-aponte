"use client";

import { Plus } from "lucide-react";
import type { ExperienceCertification } from "../../../experience/types";

interface RowBubblesCertificationsProps {
  certifications: ExperienceCertification[];
  onAdd: () => void;
  onEdit: (cert: ExperienceCertification) => void;
}

export const RowBubblesCertifications = ({
  certifications,
  onAdd,
  onEdit,
}: RowBubblesCertificationsProps) => {
  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <h3 className="text-lg font-semibold text-aperture-yellow">
          Certificaciones:
        </h3>
        <button
          onClick={onAdd}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-aperture-blue/40 bg-aperture-blue/10 text-aperture-blue transition hover:bg-aperture-blue/20 hover:text-white"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      {certifications.length === 0 ? (
        <p className="font-mono text-xs text-zinc-500">
          No hay certificaciones registradas.
        </p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {certifications.map((cert) => (
            <button
              key={cert.id}
              onClick={() => onEdit(cert)}
              className="group relative rounded-full border border-aperture-yellow/40 bg-aperture-yellow/10 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.35em] text-aperture-yellow transition hover:bg-aperture-yellow hover:text-black"
            >
              {cert.title}
              <div className="pointer-events-none absolute -top-12 left-1/2 w-max -translate-x-1/2 rounded-md border border-white/10 bg-black/80 px-3 py-1 text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-200 opacity-0 transition group-hover:opacity-100">
                {cert.meta || "Click para editar"}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
