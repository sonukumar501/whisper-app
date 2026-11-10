"use client";
import Navbar from "./layout/header";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import SocialProofChips from "./layout/socialProofChips";

export default function Hero() {
  const anonymousRef = useRef(null);
  useGSAP(() => {
    gsap.from(anonymousRef.current, {
      filter: "blur(20px)",
      duration: 1.5,
      ease: "elastic.out",
    });
  }, []);

  return (
    <section className="grid grid-cols-1 w-screen min-h-screen relative">
      {/* navbar */}
      <Navbar />

      <div className="w-full min-h-[calc(100svh-80px)] grid grid-cols-2 items-end  ">
        {/* right section */}

        <div className=" flex items-center justify-start flex-col mb-22">
          <h1 className="text-6xl font-semibold leading-[1.05] tracking-tight">
            Talk Freely.
            <br />
            Stay{" "}
            <span ref={anonymousRef} className="text-violet-500">
              {" "}
              Anonymous
            </span>
          </h1>
          <p className=" tracking-tight leading-relaxed text-gray-600 mt-4 ml-1 font-sans  ">
            Connect with new people, share what’s on your mind, and have real
            <br />
            conversations — without revealing who you are
          </p>
          <div className="w-full flex justify-start mt-8 ">
            <button className="bg-indigo-500 text-md font-semibold text-white shadow-lg p-2 pl-4 pr-4 ml-34 rounded-md flex items-center gap-2">
              Start Chatting <FaArrowRight />
            </button>
            <button className="text-md font-semibold border text-black shadow-lg pl-4 pr-4  ml-4 rounded-md">
              Explore Features
            </button>
          </div>

          {/* Supporting content */}

          <div className="mt-8 flex items-center gap-3 w-full pl-32">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-600">
              <span className="text-xl">✦</span>
            </span>

            <div>
              <p className="text-sm font-semibold text-gray-900">
                A space to be yourself.
              </p>
              <p className="mt-1 text-sm text-gray-500">
                No pressure. Just real conversations.
              </p>
            </div>
          </div>
        </div>

        {/* left section */}
        <div className="w-165 relative flex justify-center h-full items-start mb-2 ">
          <Image
            src="https://res.cloudinary.com/c1831cid/image/upload/v1791352895/hero-chat-white.jpg"
            draggable={false}
            fill
            alt="Whisper chat illustration"
            className="object-contain object-top translate-y-24"
            sizes="(max-width: 768px) 100vw, 50vw"
            preload
          />
        </div>
        <div className="col-span-full h-32 w-full bg-indigo-200/10 flex justify-around  shadow-xs shadow-gray-200 items-center">
          <SocialProofChips />
        </div>
      </div>
    </section>
  );
}
