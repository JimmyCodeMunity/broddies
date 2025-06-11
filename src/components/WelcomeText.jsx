import React from "react";
import { Cover } from "./ui/Cover";
import { BackgroundBeamsWithCollision } from "./ui/Collision";
import { ContainerTextFlip } from "./ui/TextFlip";

export function WelcomeText() {
  return (
    <div className="md:py-20 py-14 relative overflow-hidden">
      {/* Video Background */}

      {/* Content */}
      <div className="flex flex-col space-y-5 text-center justify-center items-center relative z-20">
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          Buy amazing Art <br /> at <Cover>Broddie's Collection</Cover>
        </h1>
        <ContainerTextFlip />
        {/* <img
          src="../images/broddie.jpeg"
          className="overflow-hidden md:hidden block h-[500px] w-[500px] rounded-xl"
          alt=""
        /> */}
      </div>
    </div>
  );
}
