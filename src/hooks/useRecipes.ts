"use client";
import { useState } from "react";

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([
    { title: "たまごかけごはん" },
    { title: "たまごかけごはん" },
    { title: "たまごかけごはん" },
    { title: "たまごかけごはん" },
    { title: "たまごかけごはん" },
  ]);

  return { recipes };
};
