import Navbar from "../layout/header";
import Image from "next/image";
export default function Hero() {
  return (
    <section className="grid grid-cols-1  w-screen min-h-screen">
      <div className="">
        <Navbar />
      </div>

      <div className="w-full min-h-[calc(100vh-80px)] grid grid-cols-2">
        <div className="flex items-center justify-start flex-col mt-28">
          <h1 className="text-6xl font-semibold leading-[1.05] tracking-tight">
            Talk Freely.
            <br />
            Stay Anonymous
          </h1>
          <p className=" tracking-tight leading-relaxed text-gray-600 mt-4">
            Connect with new people, share what’s on your mind, and have real
            <br />
            conversations — without revealing who you are
          </p>
        </div>
        <div className="w-165 relative flex justify-center h-full items-start ">
          <Image
            src="https://res.cloudinary.com/c1831cid/image/upload/v1791352895/hero-chat-white.jpg"
            fill
            alt="Whisper chat illustration"
            className="object-contain object-top translate-y-24"
          />
        </div>
      </div>
    </section>
  );
}
