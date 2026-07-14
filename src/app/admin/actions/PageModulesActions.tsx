"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Home, Route, Hammer, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useGuestbookAuth } from "../../../features/guestbook/hooks/useGuestbookAuth";

interface ModuleCard {
  label: string;
  href: string;
  icon: React.ReactNode;
  accentColor: string;
}

const modules: ModuleCard[] = [
  {
    label: "Home",
    href: "/admin/actions/home",
    icon: <Home className="h-10 w-10" />,
    accentColor: "text-aperture-blue",
  },
  {
    label: "Experience",
    href: "/admin/actions/experience",
    icon: <Route className="h-10 w-10" />,
    accentColor: "text-aperture-yellow",
  },
  {
    label: "Projects",
    href: "/admin/actions/projects",
    icon: <Hammer className="h-10 w-10" />,
    accentColor: "text-aperture-orange",
  },
  {
    label: "Blog",
    href: "/admin/actions/blog",
    icon: <MessageCircle className="h-10 w-10" />,
    accentColor: "text-emerald-400",
  },
];

export default function PageModulesActions() {
  const { user, isLoading: authLoading } = useGuestbookAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);

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
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.5em] text-aperture-blue">
            Admin // Panel de Acciones
          </p>
          <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">
            MÓDULOS
          </h1>
          <p className="mt-3 text-sm text-zinc-400">
            Selecciona un módulo para gestionar su contenido.
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {modules.map((mod) => (
            <Link key={mod.label} href={mod.href}>
              <div className="glass-panel group flex aspect-square cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.03] hover:border-white/20 hover:shadow-[0_0_30px_rgba(86,204,242,0.08)]">
                <div
                  className={`${mod.accentColor} transition-transform duration-300 group-hover:scale-110`}
                >
                  {mod.icon}
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-300 transition-colors group-hover:text-white">
                  {mod.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
