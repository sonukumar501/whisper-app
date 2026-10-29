"use client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);
function MessagingShowCase() {
  const headingRef = useRef(null);
  useGSAP(() => {
    gsap.from(headingRef.current, {
      clipPath: "inset(0 0 100% 0)",duration:0.7,
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  });
  return (
    <div className="w-screen h-screen flex justify-center">
      <div>
        <h1 ref={headingRef} className="font-md text-5xl font-sans">
          Conversations without any pressure
        </h1>
      </div>
    </div>
  );
}

export default MessagingShowCase;
