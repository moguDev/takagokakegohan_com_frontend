export type UserProfiles = {
  name: string;
  nickname: string;
  avatar: { url: string | null };
  rank?: string;
};

export type Recipe = {
  id: number;
  title: string;
  body: string;
  cooking_time: number;
  image: { url: string | null };
  ingredients: Ingredient[];
  steps: Step[];
  user: UserProfiles;
  status: RecipeStatus;
  bookmarkCount: number;
};

export type Ingredient = {
  name: string;
  amount: string;
};

export type Step = {
  stemNumber?: number;
  instruction: string;
  image?: FileList | null;
};

export type RecipeStatus = "draft" | "published";
