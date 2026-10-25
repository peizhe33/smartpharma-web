"use client";

import { useEffect, useRef } from "react";

/**
 * Animated green backdrop for the hero.
 *
 * - Three large orbs drift on their own (pure CSS, always on).
 * - Three "followers" chase the mouse, each with a different lag, so they trail
 *   the cursor like a soft comet. When the mouse leaves they glide back home.
 *
 * JavaScript only writes two CSS variables per follower. It does nothing on
 * touch screens or when the user prefers reduced motion, and it only runs while
 * the hero is on screen. The backdrop is decorative (aria-hidden) and sits
 * behind the content at very low contrast, so text legibility is unaffected.
 */

interface Follower {
  /** Lerp speed per frame: smaller = lazier. */
  k: number;
  /** Offset from the cursor, as a fraction of the hero width/height. */
  ox: number;
  oy: number;
  x: number;
  y: number;
  el: HTMLElement | null;
}

export function HeroBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const aRef = useRef<HTMLDivElement>(null);
  const bRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const section = root?.parentElement;
    if (!root || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const followers: Follower[] = [
      { k: 0.16, ox: 0, oy: 0, x: 0, y: 0, el: spotRef.current },
      { k: 0.07, ox: -0.12, oy: 0.1, x: 0, y: 0, el: aRef.current },
      { k: 0.035, ox: 0.14, oy: -0.09, x: 0, y: 0, el: bRef.current },
    ];

    let width = section.clientWidth;
    let height = section.clientHeight;
    let targetX = width / 2;
    let targetY = height / 2;
    let inView = true;
    let raf = 0;

    const home = () => ({ x: width / 2, y: height / 2 });

    // Start every follower at rest in the middle.
    const h = home();
    followers.forEach((f) => {
      f.x = h.x + f.ox * width;
      f.y = h.y + f.oy * height;
    });

    const paint = () => {
      followers.forEach((f) => {
        f.el?.style.setProperty("--x", f.x.toFixed(1));
        f.el?.style.setProperty("--y", f.y.toFixed(1));
      });
    };

    const tick = () => {
      let moving = false;
      followers.forEach((f) => {
        const tx = targetX + f.ox * width;
        const ty = targetY + f.oy * height;
        f.x += (tx - f.x) * f.k;
        f.y += (ty - f.y) * f.k;
        if (Math.abs(tx - f.x) > 0.4 || Math.abs(ty - f.y) > 0.4) moving = true;
      });
      paint();
      raf = moving && inView ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    paint();

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || !inView) return;
      const r = section.getBoundingClientRect();
      targetX = Math.min(Math.max(e.clientX - r.left, 0), r.width);
      targetY = Math.min(Math.max(e.clientY - r.top, 0), r.height);
      root.dataset.active = "true";
      kick();
    };
    const onLeave = () => {
      root.dataset.active = "false";
      targetX = width / 2;
      targetY = height / 2;
      kick();
    };
    const onResize = () => {
      width = section.clientWidth;
      height = section.clientHeight;
      targetX = Math.min(targetX, width);
      targetY = Math.min(targetY, height);
      kick();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries.some((e) => e.isIntersecting);
        if (inView) kick();
      },
      { threshold: 0 },
    );
    observer.observe(section);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" data-active="false" className="backdrop pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Ambient drifting greens */}
      <div className="orb orb-a -top-[18%] -left-[10%] h-[70%] w-[min(60vw,720px)]" style={{ ["--c" as string]: "rgb(186 230 210 / 0.5)" }} />
      <div className="orb orb-b top-[18%] -right-[12%] h-[62%] w-[min(52vw,640px)]" style={{ ["--c" as string]: "rgb(165 225 218 / 0.42)" }} />
      <div className="orb orb-c -bottom-[24%] left-[28%] h-[64%] w-[min(60vw,720px)]" style={{ ["--c" as string]: "rgb(205 235 198 / 0.48)" }} />

      {/* Cursor followers */}
      <div ref={aRef} className="follower size-[340px]" style={{ ["--x" as string]: 520, ["--y" as string]: 440 }}>
        <div className="orb" style={{ ["--c" as string]: "rgb(110 210 190 / 0.28)" }} />
      </div>
      <div ref={bRef} className="follower size-[420px]" style={{ ["--x" as string]: 760, ["--y" as string]: 300 }}>
        <div className="orb" style={{ ["--c" as string]: "rgb(150 220 180 / 0.32)" }} />
      </div>
      <div ref={spotRef} className="follower follower-spot size-[520px]" style={{ ["--x" as string]: 640, ["--y" as string]: 360 }}>
        <div className="orb" style={{ ["--c" as string]: "rgb(80 190 155 / 0.24)" }} />
      </div>

      {/* Fade into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}
