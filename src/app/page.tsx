"use client";
import { Hero } from "@/components/Hero";
import { useState } from "react";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="bg-white bg-opacity-50 h-52 border-y border-gray-100">
        <p className="font-semibold p-2">人気たまごかけごはん</p>
      </div>
    </>
  );
}
