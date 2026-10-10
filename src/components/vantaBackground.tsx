"use client";

import { useEffect, useRef } from "react";

interface VantaBackgroundProps {
  children: React.ReactNode;
  className: string;
}

export default function VantaBackground({
  children,
  className,
}: VantaBackgroundProps) {
  const vantaRef = useRef(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduce-motion:reduce)").matches) return;
    let cancelled = false;
    const init = async () => {
      // Load both lazily so neither is in the main bundle
      const [THREE, vantaModule] = await Promise.all([
        import("three"),
        import("vanta/dist/vanta.birds.min"),
      ]);
      if (cancelled || !vantaRef.current || vantaEffect.current) return;
      const isMobile = window.matchMedia("(max-width:786px)").matches;
      const BIRDS = (vantaModule as any).default ?? vantaModule;
      vantaEffect.current = BIRDS({
        el: vantaRef.current,
        THREE,
        mouseControls: !isMobile,
        touchControls: true,
        minHeight: 200,
        minWidth: 200,
        scale: 1.0,
        scaleMobile: 1.0,
        birdSize: isMobile ? 0.7 : 1,
        wingSpan: isMobile ? 20 : 30,
        speedLimit: isMobile ? 2 : 5,
        separation: isMobile ? 35 : 50,
        alignment: isMobile ? 15 : 20,
        cohesion: 20,
        quantity: isMobile ? 3 : 5, // lower = much cheaper on GPU
        backgroundColor: 0xffffff,
      });
    };
    // Wait until the browser is idle, after the page is interactive
    const start = () => {
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(init, { timeout: 1000 });
      } else {
        setTimeout(init, 800);
      }
    };
    if (document.readyState == "complete") start();
    else window.addEventListener("load", start, { once: true });
    return ()=>{
      cancelled = true;
      window.removeEventListener("load",start);
      vantaEffect.current?.destroy();
      vantaEffect.current = null;
    }
  }, []);

  return (
    <div ref={vantaRef} className={className ?? "fixed inset-0 -z-10 "}>
      {children}
    </div>
  );
}
