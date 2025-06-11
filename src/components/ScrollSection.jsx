"use client";
import React from "react";
import { ContainerScroll } from "./ui/Scroll";

export function ScrollSec() {
  return (
    <div className="flex flex-col overflow-hidden ">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Art
              </span>
            </h1>
          </>
        }
      >
        {/* <img
          src={`https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFydHxlbnwwfHwwfHx8MA%3D%3D`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false} /> */}
        <video
          src="../images/co.mp4"
          alt="art"
          autoPlay
          loop
          className="absolute inset-0 h-full w-full rounded-lg object-cover object-left-top"
        ></video>
      </ContainerScroll>
    </div>
  );
}
