"use client";
import { useEffect, useRef, useState } from "react";

interface AnimatedCircleProps {
  onAnimationEnd: () => void;
}

export const AnimatedCircle = ({ onAnimationEnd }: AnimatedCircleProps) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const [isDrop, setIsDrop] = useState<boolean>(false);

  useEffect(() => {
    const circle = circleRef.current;

    const handleAnimationEnd = (event: AnimationEvent) => {
      if (event.animationName === "drop") {
        circle?.classList.remove("animate-drop");
        circle?.classList.add("animate-expand");
        onAnimationEnd();
        setIsDrop(true);
      }
    };

    circle?.addEventListener("animationend", handleAnimationEnd);

    return () => {
      circle?.removeEventListener("animationend", handleAnimationEnd);
    };
  }, []);

  return (
    <div className="fixed top-0 h-screen w-screen z-[-1]">
      <div className="relative w-screen h-screen bg-white overflow-hidden">
        <div
          ref={circleRef}
          className="circle absolute top-[-100px] left-1/2 w-[100px] h-[100px] bg-gradient-triple rounded-full animate-drop shadow"
        ></div>
      </div>
    </div>
  );
};
