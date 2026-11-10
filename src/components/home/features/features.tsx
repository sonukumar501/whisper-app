"use client";
import Background from "@/components/home/features/layout/background";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger,useGSAP)
export default function Features() {
  const bentoRef = useRef(null);
  useGSAP(() => {
    gsap.from(".feature-card", {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: {
        grid: [2,3],
        from: 0,

        amount: 1,
      },
      ease: "power2.out",
      scrollTrigger: {
        trigger: bentoRef.current,
        start: "top 90%",
         toggleActions: "restart none restart none",
      },
    });
  },{ scope: bentoRef });
  return (
    <section className=" w-full h-full  relative flex flex-col justify-center items-center">
      <Background>
        <div
          ref={bentoRef} 
          className="w-full h-full pt-10 flex flex-col justify-center items-center gap-1"
        >
          <div className=" w-[85%] h-[300px] flex justify-between">
            <div className="feature-card w-[33%]  h-full bg-indigo-300"></div>
            <div className="feature-card w-[33%]  h-full bg-indigo-300"></div>
            <div className="feature-card w-[33%]  h-full bg-indigo-300"></div>
          </div>
          <div className=" w-[85%] h-[300px] flex justify-between">
            <div className="feature-card w-[33%]  h-full bg-indigo-300"></div>
            <div className="feature-card w-[33%]  h-full bg-indigo-300"></div>
            <div className="feature-card w-[33%]  h-full bg-indigo-300"></div>
          </div>
        </div>
      </Background>
    </section>
  );
}
