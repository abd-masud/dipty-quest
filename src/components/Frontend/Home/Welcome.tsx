"use client";

import Image from "next/image";
import WelcomeLogo from "../../../../public/images/welcome.png";

export const Welcome = () => {
  return (
    <main className="max-w-screen-xl mx-auto flex items-center px-4">
      <div className="md:grid block grid-cols-2 md:py-32 py-10">
        <div className="my-auto">
          <div className="flex items-start mb-5">
            <div className="h-2 w-2 md:mt-[10px] mt-[7px] rounded-full bg-[#FBB614]"></div>
            <h2 className="md:text-[20px] text-[#0F0D26] font-semibold ml-2">
              A journey towards achieving light and knowledge
            </h2>
          </div>
          <h1 className="md:text-[60px] text-[35px] font-semibold md:leading-[70px] leading-[50px]">
            Think Vast, Perform Tirelessly and
            <span className="text-[#FBB614]"> Never Lose Hope</span>
          </h1>
          <p className="md:text-[24px] text-[18px] text-[#0F0D26] font-[400] md:my-8 my-6">
            Greetings from a new educational age! Discover your potential,
            explore our team of professionals and develop with us.
          </p>
        </div>
        <div className="mx-auto mt-10 md:mt-0">
          <Image
            height={550}
            width={525}
            src={WelcomeLogo}
            alt={"WelcomeLogo"}
            priority
          />
        </div>
      </div>
    </main>
  );
};
