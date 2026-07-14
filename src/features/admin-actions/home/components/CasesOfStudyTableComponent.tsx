"use client";

import type { HomeCaseOfStudy } from "../../../home/types";

interface CasesOfStudyTableComponentProps {
  cases: HomeCaseOfStudy[];
  onEdit: (caseItem: HomeCaseOfStudy) => void;
}

export const CasesOfStudyTableComponent = ({
  cases,
  onEdit,
}: CasesOfStudyTableComponentProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10 text-aperture-yellow text-sm">
            <th className="p-3 font-mono text-xs uppercase tracking-[0.2em]">
              Título
            </th>
            <th className="p-3 font-mono text-xs uppercase tracking-[0.2em] text-right w-32">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {cases.map((caseItem) => (
            <tr
              key={caseItem.id}
              className="border-b border-white/5 transition hover:bg-white/5"
            >
              <td className="p-3 text-sm text-zinc-300">{caseItem.title}</td>
              <td className="p-3 text-right">
                <button
                  onClick={() => onEdit(caseItem)}
                  className="rounded-lg border border-aperture-blue/40 bg-aperture-blue/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-aperture-blue transition hover:bg-aperture-blue/20 hover:text-white"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
          {cases.length === 0 && (
            <tr>
              <td
                colSpan={2}
                className="p-6 text-center font-mono text-xs text-zinc-500"
              >
                No hay casos de estudio registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
