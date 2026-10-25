"use client";

import { useEffect, useRef } from "react";

/**
 * "SmartPharma" set in the display serif, revealed letter by letter, with a
 * slow green wave passing through it. On a desktop mouse the letters near the
 * cursor lift and grow slightly.
 *
 * The wrapper is exposed to assistive tech as a single image labelled with the
 * word, so screen readers announce "SmartPharma" once instead of letter by letter.
 */
export function AnimatedWordmark({ word = "SmartPharma" }: { word?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const cells = Array.from(root.querySelectorAll<HTMLElement>("[data-cell]"));
    const glyphs = cells.map((c) => c.querySelector<HTMLElement>(".wm-g"));
    let px = -1e5;
    let py = -1e5;
    let raf = 0;

    const apply = () => {
      raf = 0;
      const radius = Math.max(120, root.getBoundingClientRect().width / 4);
      cells.forEach((cell, i) => {
        const g = glyphs[i];
        if (!g) return;
        const r = cell.getBoundingClientRect();
        const d = Math.hypot(r.left + r.width / 2 - px, r.top + r.height / 2 - py);
        const t = Math.max(0, 1 - d / radius);
        const e = t * t * (3 - 2 * t); // smoothstep
        g.style.setProperty("--s", (1 + e * 0.12).toFixed(3));
        g.style.setProperty("--y", (e * 0.05).toFixed(3));
      });
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      px = e.clientX;
      py = e.clientY;
      schedule();
    };
    const onLeave = () => {
      px = -1e5;
      py = -1e5;
      schedule();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <span ref={ref} className="wm" role="img" aria-label={word}>
      {Array.from(word).map((ch, i) => (
        <span key={i} data-cell className="wm-l" style={{ ["--i" as string]: i }}>
          <span className="wm-g" style={{ ["--i" as string]: i }}>
            {ch}
          </span>
        </span>
      ))}
    </span>
  );
}
