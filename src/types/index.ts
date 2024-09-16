export type UserProfiles = {
  name: string;
  nickname: string;
  avatar: { url: string | null };
  rank?: string;
  introduction: string;
};

export type Recipe = {
  id: number;
  title: string;
  body: string;
  cookingTime: number;
  image: { url: string | null };
  recipeIngredients: Ingredient[];
  steps: Step[];
  user: UserProfiles;
  status: RecipeStatus;
  bookmarkCount: number;
  likeCount: number;
};

export type Ingredient = {
  ingredientName: string;
  amount: string;
  ingredientNumber?: number;
};

export type Step = {
  stepNumber?: number;
  instruction: string;
  image?: FileList | null;
};

export type RecipeStatus = "draft" | "published";
