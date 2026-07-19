"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useGuestbookAuth } from "../../guestbook/hooks/useGuestbookAuth";
import type { ExperienceCertification, ExperienceCarouselItem } from "../../experience/types";

import { RowBubblesCertifications } from "./components/RowBubblesCertifications";
import { AddBubbleCertPopup } from "./components/AddBubbleCert.popup";
import { EditBubbleCertPopup } from "./components/EditBubbleCert.popup";
import { RowItemsCarousel } from "./components/RowItemsCarousel";
import { AddItemsCarouselPopup } from "./components/AddItemsCarousel.popup";
import { EditItemsCarouselPopup } from "./components/EditItemsCarousel.popup";
import { ConfirmDeletePopup } from "../shared/components/ConfirmDelete.popup";

import {
  addCertification,
  updateCertification,
  deleteCertification,
  addCarouselItem,
  updateCarouselItem,
  deleteCarouselItem,
  deleteCarouselImage,
  uploadCarouselImage,
} from "../../experience/services/experience.service";

type PopupState =
  | { type: "none" }
  | { type: "addCert" }
  | { type: "editCert"; cert: ExperienceCertification }
  | { type: "deleteCert"; cert: ExperienceCertification }
  | { type: "addCarousel" }
  | { type: "editCarousel"; item: ExperienceCarouselItem }
  | { type: "deleteCarousel"; item: ExperienceCarouselItem };

interface ExperienceCRUDContainerProps {
  certifications: ExperienceCertification[];
  carouselItems: ExperienceCarouselItem[];
}

export const ExperienceCRUDContainer = ({
  certifications,
  carouselItems,
}: ExperienceCRUDContainerProps) => {
  const router = useRouter();
  const { user, isLoading: authLoading } = useGuestbookAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  const [popup, setPopup] = useState<PopupState>({ type: "none" });

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

  const closePopup = () => setPopup({ type: "none" });

  // --- Certification Handlers ---
  const handleAddCert = async (data: {
    title: string;
    meta: string;
    url?: string;
    order_index: number;
  }) => {
    await addCertification(data);
    closePopup();
    router.refresh();
  };

  const handleUpdateCert = async (
    id: string,
    updates: Partial<ExperienceCertification>
  ) => {
    await updateCertification(id, updates);
    closePopup();
    router.refresh();
  };

  const handleDeleteCert = async (cert: ExperienceCertification) => {
    await deleteCertification(cert.id);
    closePopup();
    router.refresh();
  };

  // --- Carousel Handlers ---
  const handleUploadImage = async (file: File): Promise<string> => {
    return await uploadCarouselImage(file);
  };

  const handleAddCarousel = async (data: {
    title: string;
    subtitle: string;
    image_path: string;
    order_index: number;
  }) => {
    await addCarouselItem(data);
    closePopup();
    router.refresh();
  };

  const handleUpdateCarousel = async (
    id: string,
    updates: Partial<ExperienceCarouselItem>
  ) => {
    await updateCarouselItem(id, updates);
    closePopup();
    router.refresh();
  };

  const handleDeleteCarousel = async (item: ExperienceCarouselItem) => {
    if (item.image_path) {
      await deleteCarouselImage(item.image_path);
    }
    await deleteCarouselItem(item.id);
    closePopup();
    router.refresh();
  };

  // --- Loading / Auth States ---
  if (authLoading || isCheckingAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0c]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-aperture-blue border-t-transparent" />
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
            Verificando acceso...
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0c]">
        <div className="glass-panel rounded-2xl px-8 py-10 text-center">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-red-400">
            Acceso Denegado
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            Debes ser administrador para acceder a este panel.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] px-6 pb-12 pt-28">
      <div className="mx-auto max-w-5xl">
        {/* Back button + Header */}
        <div className="mb-10">
          <Link
            href="/admin/actions"
            className="mb-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 transition hover:text-aperture-blue"
          >
            <ArrowLeft className="h-3 w-3" />
            Volver a módulos
          </Link>
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.5em] text-aperture-yellow">
              Admin // Experience Module
            </p>
            <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">
              GESTIÓN EXPERIENCE
            </h1>
          </div>
        </div>

        {/* =========================================== */}
        {/* Section 1: Certifications & Carousel Items  */}
        {/* =========================================== */}

        {/* Certifications */}
        <div className="mb-12 rounded-xl border border-aperture-gray/50 bg-aperture-dark/50 p-6">
          <RowBubblesCertifications
            certifications={certifications}
            onAdd={() => setPopup({ type: "addCert" })}
            onEdit={(cert) => setPopup({ type: "editCert", cert })}
          />
        </div>

        {/* Carousel Items */}
        <div className="mb-12 rounded-xl border border-aperture-gray/50 bg-aperture-dark/50 p-6">
          <RowItemsCarousel
            items={carouselItems}
            onAdd={() => setPopup({ type: "addCarousel" })}
            onEdit={(item) => setPopup({ type: "editCarousel", item })}
          />
        </div>

        {/* =========================================== */}
        {/* Section 2: Trayectoria (Próximo Sprint)     */}
        {/* =========================================== */}
        <div className="mb-12 rounded-xl border border-aperture-gray/30 bg-aperture-dark/30 p-8">
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-600">
              Sección 2 // Trayectoria
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              La gestión de la trayectoria estará disponible en el próximo sprint.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================== */}
      {/* Popups                                       */}
      {/* =========================================== */}

      {popup.type === "addCert" && (
        <AddBubbleCertPopup
          onAdd={handleAddCert}
          onCancel={closePopup}
          currentCount={certifications.length}
        />
      )}

      {popup.type === "editCert" && (
        <EditBubbleCertPopup
          cert={popup.cert}
          onSave={handleUpdateCert}
          onDelete={() =>
            setPopup({ type: "deleteCert", cert: popup.cert })
          }
          onCancel={closePopup}
        />
      )}

      {popup.type === "deleteCert" && (
        <ConfirmDeletePopup
          itemTitle={popup.cert.title}
          onConfirm={() => handleDeleteCert(popup.cert)}
          onCancel={closePopup}
        />
      )}

      {popup.type === "addCarousel" && (
        <AddItemsCarouselPopup
          onAdd={handleAddCarousel}
          onUploadImage={handleUploadImage}
          onCancel={closePopup}
          currentCount={carouselItems.length}
        />
      )}

      {popup.type === "editCarousel" && (
        <EditItemsCarouselPopup
          item={popup.item}
          onSave={handleUpdateCarousel}
          onUploadImage={handleUploadImage}
          onDelete={() =>
            setPopup({ type: "deleteCarousel", item: popup.item })
          }
          onCancel={closePopup}
        />
      )}

      {popup.type === "deleteCarousel" && (
        <ConfirmDeletePopup
          itemTitle={popup.item.title}
          onConfirm={() => handleDeleteCarousel(popup.item)}
          onCancel={closePopup}
        />
      )}
    </div>
  );
};
