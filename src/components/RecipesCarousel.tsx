import { useEffect, useState } from "react";
import { RecipeCard } from "./RecipeCard";

type RecipesCarouselProps = {
  recipes: { title: string }[];
};

export const RecipesCarousel = ({ recipes }: RecipesCarouselProps) => {
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
            className={`carousel-item lg:w-96 w-3/4 transition-transform duration-500 ease-in-out`}
            style={{
              transform: `translateX(-${
                (currentIndex * 384) / recipes.length
              }%)`,
            }}
          >
            <RecipeCard id={1} title={recipe.title} cooking_time={60} />
          </div>
        ))}
      </div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow"
        onClick={handlePrev}
      >
        &#9664;
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow"
        onClick={handleNext}
      >
        &#9654;
      </button>
    </div>
  );
};
