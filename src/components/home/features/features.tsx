import Background from "@/components/home/features/layout/background";
import Image from "next/image";
export default function Features() {
  return (
    <section className=" w-full h-full  relative flex flex-col justify-center items-center">
      <Background>
        <div className="w-full h-full flex justify-center items-start">
         <div className="relative mx-auto mt-10 w-[95%] max-w-[850px]">
          <Image
            src="https://res.cloudinary.com/c1831cid/image/upload/v1794287138/Whisper_Anonymous_Chat_Interface.png"
            alt="Whisper anonymous chat interface"
            width={1400}
            height={900}
            draggable={false}
            className="block h-auto w-full rounded-2xl object-contain"
          />
        </div>
        </div>
      </Background>
    </section>
  );
}