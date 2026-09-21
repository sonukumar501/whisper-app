"use client";

import {useEffect, useRef } from "react";
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
        const BIRDS = importedModule.default ?? importedModule;
        vantaEffect.current = BIRDS({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: true,
          minHeight: 200,
          minWidth: 200,
          scale: 1.0,
          scaleMobile: 1.0,
          birdSize: 1,
          wingSpan: 30,
          speedLimit: 5,
          separation: 50,
          alignment: 20,
          cohesion: 20,
          quantity: 8,
          backgroundColor: 0xffffff,
        })
      });
    }
    return ()=>{
      if(vantaEffect.current){
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    }
  }, []);

  return (
    <div ref={vantaRef} className={className ?? "fixed inset-0 -z-10"}>
      {children}
    </div>
  );
}
