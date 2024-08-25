"use client";
import { Hero } from "@/components/Hero";
import { axiosInstance } from "@/lib/axiosInstance";
import { useEffect } from "react";

const checkStatus: () => Promise<void> = async () => {
  try {
    const res = await axiosInstance.get("status");
    console.log(res);
  } catch (error) {
    console.log(`error: ${error}`);
  }
};

export default function Home() {
  useEffect(() => {
    checkStatus();
  }, []);
  return (
    <>
      <Hero />
    </>
  );
}
