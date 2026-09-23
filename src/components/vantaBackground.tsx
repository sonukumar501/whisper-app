"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

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
    if (!vantaEffect.current && vantaRef.current) {
      import("vanta/dist/vanta.birds.min").then((importedModule) => {
        if (vantaEffect.current || !vantaRef.current) return;
        const isMobile = window.matchMedia("(max-width:768px)").matches;
        const BIRDS = importedModule.default ?? importedModule;
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
          quantity: isMobile ? 5 : 8,
          backgroundColor: 0xffffff,
        });
      });
    }
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <div ref={vantaRef} className={className ?? "fixed inset-0 -z-10"}>
      {children}
    </div>
  );
}
