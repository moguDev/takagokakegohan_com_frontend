"use client";
import { useEffect, useState } from "react";
import { RecipeCard } from "./RecipeCard";
import { Recipe } from "@/types";

export const RecipesCarousel = ({ recipes }: { recipes: Recipe[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrev = () => {
    if (currentIndex <= 0) {
      setCurrentIndex(recipes.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex >= recipes.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    if (currentIndex === recipes.length) {
      setTimeout(() => {
        setCurrentIndex(0);
      }, 500);
    }
  }, [currentIndex, recipes.length]);

  return (
    <div className="relative">
      <div className="carousel carousel-center bg-neutral rounded-box max-w-full space-x p-1">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className={`carousel-item transition-transform duration-500 ease-in-out`}
            style={{
              transform: `translateX(-${
                (currentIndex * 384) / recipes.length
              }%)`,
            }}
          >
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
};
