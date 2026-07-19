"use client";

import { Plus } from "lucide-react";
import type { ExperienceCarouselItem } from "../../../experience/types";

interface RowItemsCarouselProps {
  items: ExperienceCarouselItem[];
  onAdd: () => void;
  onEdit: (item: ExperienceCarouselItem) => void;
}

export const RowItemsCarousel = ({
  items,
  onAdd,
  onEdit,
}: RowItemsCarouselProps) => {
  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <h3 className="text-lg font-semibold text-aperture-yellow">
          Items Actuales del Carousel
        </h3>
        <button
          onClick={onAdd}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-aperture-blue/40 bg-aperture-blue/10 text-aperture-blue transition hover:bg-aperture-blue/20 hover:text-white"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      {items.length === 0 ? (
        <p className="font-mono text-xs text-zinc-500">
          No hay items de carousel registrados.
        </p>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="glass-panel flex w-[260px] flex-shrink-0 gap-4 rounded-xl p-4"
            >
              {/* Image Preview */}
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-aperture-gray/50 bg-aperture-dark/80">
                {item.image_path ? (
                  <img
                    src={item.image_path}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[8px] font-mono uppercase tracking-[0.2em] text-zinc-600">
                    Sin imagen
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div>
                  <p className="truncate text-sm font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="truncate text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">
                    {item.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => onEdit(item)}
                  className="mt-2 self-start rounded-md border border-aperture-blue/40 bg-aperture-blue/10 px-3 py-1 text-[9px] font-mono uppercase tracking-[0.2em] text-aperture-blue transition hover:bg-aperture-blue/20 hover:text-white"
                >
                  Editar Item
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
