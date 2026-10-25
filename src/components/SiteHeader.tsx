"use client";

import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/cn";

interface NavItem {
  id: string;
  label: string;
  href: string;
}

interface HeaderLink {
  href: string;
  external: boolean;
  isFallback: boolean;
}

interface SiteHeaderProps {
  nav: readonly NavItem[];
  demo: HeaderLink;
  github: HeaderLink;
  /** Verified award wording. Null hides the badge. */
  badge: string | null;
}

export function SiteHeader({ nav, demo, github, badge }: SiteHeaderProps) {
  const [active, setActive] = useState<string>("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Highlight the nav item for the section currently in view.
  useEffect(() => {
    const elements = nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0 || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [nav]);

  const openMenu = useCallback(() => {
    dialogRef.current?.showModal();
    setMenuOpen(true);
    document.documentElement.classList.add("menu-open");
  }, []);

  const closeMenu = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  // Keep state in sync with native close (Esc, backdrop click, form close).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setMenuOpen(false);
      document.documentElement.classList.remove("menu-open");
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  // Close the drawer if the viewport grows to desktop size.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) dialogRef.current?.close();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const onDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    // Clicks on the backdrop target the <dialog> element itself.
    if (e.target === e.currentTarget) closeMenu();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm supports-[backdrop-filter]:bg-white/90">
      <div className="container-page flex h-14 items-center justify-between gap-4 lg:h-16">
        <div className="flex items-center gap-3">
          <a href="#overview" aria-label="SmartPharma, back to top" className="inline-flex min-h-11 items-center rounded-ctrl">
            <Wordmark />
          </a>
          {badge && (
            <span className="hidden xl:block">
              <Badge tone="primary" icon={<Icon name="award" size={14} />}>
                {badge}
              </Badge>
            </span>
          )}
        </div>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {nav.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "t-fast inline-flex min-h-9 items-center rounded-ctrl px-2.5 text-body-md font-medium",
                      isActive
                        ? "bg-brand-50 text-brand-700"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-950",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden min-[1180px]:block">
            <ButtonLink href={demo.href} external={demo.external} variant="secondary" className="whitespace-nowrap">
              View demo
            </ButtonLink>
          </span>
          <span className="hidden lg:block">
            <ButtonLink
              href={github.href}
              external={github.external}
              variant="primary"
              className="whitespace-nowrap"
              title={github.isFallback ? "GitHub URL not yet added. Opens the Resources section." : undefined}
            >
              View GitHub
            </ButtonLink>
          </span>
          <button
            type="button"
            onClick={openMenu}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="t-fast inline-flex size-11 items-center justify-center rounded-ctrl border border-gray-200 text-gray-950 hover:bg-gray-50 lg:hidden"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile drawer: native <dialog> gives focus trapping, Esc to close and an inert page behind. */}
      <dialog
        ref={dialogRef}
        id="mobile-menu"
        aria-label="Site menu"
        onClick={onDialogClick}
        className="m-0 ml-auto h-dvh max-h-dvh w-[min(20rem,100vw)] max-w-none overflow-y-auto bg-white p-0 text-gray-950 shadow-2xl backdrop:bg-black/50 lg:hidden"
      >
        <div className="flex h-14 items-center justify-between border-b border-gray-200 px-4">
          <Wordmark />
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="t-fast inline-flex size-11 items-center justify-center rounded-ctrl border border-gray-200 hover:bg-gray-50"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile primary" className="p-4">
          {badge && (
            <Badge tone="primary" icon={<Icon name="award" size={14} />} className="mb-4">
              {badge}
            </Badge>
          )}
          <ul className="flex flex-col gap-1">
            {nav.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "t-fast flex min-h-11 items-center rounded-ctrl px-3 text-body-lg font-medium",
                      isActive ? "bg-brand-50 text-brand-700" : "text-gray-800 hover:bg-gray-100",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex flex-col gap-3 border-t border-gray-150 pt-6">
            <ButtonLink
              href={demo.href}
              external={demo.external}
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={closeMenu}
            >
              View demo
            </ButtonLink>
            <ButtonLink
              href={github.href}
              external={github.external}
              variant="primary"
              size="lg"
              className="w-full"
              onClick={closeMenu}
            >
              View GitHub
            </ButtonLink>
          </div>
        </nav>
      </dialog>
    </header>
  );
}
