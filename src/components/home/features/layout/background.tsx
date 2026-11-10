"use client";

import { useRef, type ReactNode } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

// gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function BackgroundBeamsWithCollisionDemo({
  children,
}: {
  children: ReactNode;
}) {
  const headingRef = useRef(null);

  return (
    <BackgroundBeamsWithCollision>
      <div className="w-full flex flex-col items-start mt-0 font-[var(--font-grotesk-sans)]">
        <h2
          ref={headingRef}
          className="relative w-full z-10 mt-12 pl-28 text-2xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-4xl text-neutral-700 dark:text-white "
        >
          More Than Just Messaging.
          <span className="mt-2 flex flex-wrap items-center justify-start gap-2">
            <span className="text-neutral-700">A Space to</span>

            <span className="relative flex flex-col bg-clip-text text-transparent bg-linear-to-r from-purple-500 via-violet-500 to-pink-500">
              <span className="flex h-1.5 w-full justify-between bg-indigo-200/10">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-200" />
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-200" />
              </span>

              <span className="bg-indigo-200/10 px-2 py-1 text-indigo-500">
                Talk Freely
              </span>

              <span className="flex h-1.5 w-full justify-between bg-indigo-200/10">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-200" />
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-200" />
              </span>
            </span>
          </span>
        </h2>
        <p className="pl-28 mt-4 max-w-2xl  leading-relaxed tracking-tight text-gray-500">
          Real conversations. No identities. No expectations. Just a place to
          connect, express yourself, and discover the people behind the screen.
        </p>
      </div>

      {children}
    </BackgroundBeamsWithCollision>
  );
}
