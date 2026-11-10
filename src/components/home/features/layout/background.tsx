"use client";
// import { gsap } from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/all";
import { useRef, type ReactNode } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

// gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function BackgroundBeamsWithCollisionDemo({
  children,
}: {
  children: ReactNode;
}) {

  const headingRef = useRef(null);
  // useGSAP(() => {
  //   gsap.from(headingRef.current, {
  //     y: -80,
  //     duration: 1,
  //     opacity: 0,
  //     ease: "power3.inOut",
  //     scrollTrigger: {
  //       trigger: headingRef.current,
  //       start: "top 80%",
  //       toggleActions: "play none none reverse",
  //     },
  //   });
  // }, []);

  return (
    <BackgroundBeamsWithCollision>
      <div className=" w-full h-screen flex flex-col mt-30 [font-family:var(--font-grotesk-sans)]">
        <h2
          ref={headingRef}
          className="leading-18 text-2xl relative z-20 md:text-4xl lg:text-6xl font-semibold  mt-18 fon-sans t text-center text-black  dark:text-white  tracking-tight w-full align-middle "
        >
          More Than Just <br />
          Messaging. <br />
          <div className="relative flex gap-2 mx-auto w-max filter-[drop-shadow(0px_1px_3px_rgba(27,37,80,0.14))]">
            <div className="left-0 top-px bg-clip-text bg-no-repeat text-transparent bg-linear-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              <span className="text-[#303036]">A Space to</span>
            </div>
            <div className="relative flex flex-col bg-clip-text text-transparent bg-no-repeat bg-linear-to-r from-purple-500 via-violet-500 to-pink-500 py-2">
              <div className="w-full h-2 flex justify-between bg-indigo-200/10 ">
                <div className="bg-indigo-200 w-2 rounded-full mr-2"></div>
                <div className="bg-indigo-200 w-2 rounded-full"></div>
              </div>
              <span className=" bg-indigo-200/10 text-indigo-500 pl-2 pr-2">
                Talk Freely
              </span>
              <div className="w-full h-2 flex justify-between bg-indigo-200/10 ">
                <div className="bg-indigo-200 w-2 rounded-full"></div>
                <div className="bg-indigo-200 w-2 rounded-full"></div>
              </div>
            </div>
          </div>
        </h2>
        <p className="mx-auto max-w-2xl text-center tracking-tight leading-relaxed text-gray-500 line-clamp-4 mt-2">
          Real conversations. No identities. No expectations. Just a place to
          connect, express yourself, and discover the people behind the screen.
        </p>
      </div>
      {children}
    </BackgroundBeamsWithCollision>
  );
}
