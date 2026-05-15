"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Book a Call", href: "/book-a-call" },
];

const moreItems: NavItem[] = [{ label: "Guestbook", href: "/guestbook" }];

const joinClassNames = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

const isActivePath = (pathname: string, href: string) => {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
};

export default function CentralNavBar() {
  const pathname = usePathname();
  const hasMoreActive = moreItems.some((item) =>
    isActivePath(pathname, item.href),
  );

  return (
    <nav className="fixed left-1/2 top-6 z-50 w-[min(92vw,980px)] -translate-x-1/2">
      <div className="relative overflow-visible rounded-[999px] border border-white/10 bg-black/70 px-4 py-3 backdrop-blur">
        <div className="absolute inset-0 opacity-[0.1] bg-[linear-gradient(to_bottom,transparent_0%,transparent_50%,black_51%,transparent_52%)] bg-[length:100%_4px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(86,204,242,0.2),transparent_60%)]" />
        <div className="relative flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={joinClassNames(
                  "relative px-3 py-2 text-[11px] font-mono uppercase tracking-[0.35em] text-zinc-300 transition",
                  "after:absolute after:-bottom-1 after:left-1/2 after:h-[2px] after:w-8 after:-translate-x-1/2 after:bg-aperture-blue after:content-[''] after:transition after:duration-300 after:scale-x-0",
                  active
                    ? "text-aperture-blue after:scale-x-100"
                    : "hover:text-aperture-blue",
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="group relative">
            <button
              type="button"
              className={joinClassNames(
                "relative px-3 py-2 text-[11px] font-mono uppercase tracking-[0.35em] text-zinc-300 transition",
                "after:absolute after:-bottom-1 after:left-1/2 after:h-[2px] after:w-8 after:-translate-x-1/2 after:bg-aperture-blue after:content-[''] after:transition after:duration-300 after:scale-x-0",
                hasMoreActive
                  ? "text-aperture-blue after:scale-x-100"
                  : "hover:text-aperture-blue",
              )}
            >
              More
            </button>

            <div className="absolute left-1/2 top-full z-50 mt-3 w-44 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="rounded-xl border border-white/10 bg-black/90 p-2 shadow-[0_18px_50px_rgba(0,0,0,0.4)] backdrop-blur">
                {moreItems.map((item) => {
                  const active = isActivePath(pathname, item.href);

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={joinClassNames(
                        "flex items-center justify-between rounded-lg px-3 py-2 text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-300 transition",
                        active
                          ? "bg-aperture-blue/20 text-aperture-blue"
                          : "hover:bg-white/5 hover:text-aperture-blue",
                      )}
                    >
                      {item.label}
                      <span className="text-xs text-zinc-500">//</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
