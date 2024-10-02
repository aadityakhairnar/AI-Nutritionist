"use client";
import { TypewriterEffect } from "../components/ui/typewriter-effect";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";
import Link from "next/link";
export default function TypewriterEffectDemo() {
  const words = [
    {
      text: "Create",
    },
    {
      text: "Your",
    },
    {
      text: "Custom",
    },
    {
      text: "Diet",
    },
    {
      text: "Plan",
    },
    {
      text: "Today",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem] ">
      <p className="text-neutral-600 dark:text-neutral-200 text-base  mb-10">
      Your Personalized Journey to Better Health Starts Here
      </p>
      <TypewriterEffect words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        <Link href="/form">
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
          >
          <span>Get Started</span>
        </HoverBorderGradient>
        </Link>
      </div>
    </div>
  );
}
