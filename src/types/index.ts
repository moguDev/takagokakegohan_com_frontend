export type UserProfiles = {
  name: string;
  nickname: string;
  avatar: { url: string | null };
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
};

export type Ingredient = {
  name: string;
  amount: string;
  category?: Category;
};

export type Step = {
  stemNumber?: number;
  instruction: string;
  image?: FileList | null;
};

export type Category = "卵" | "米" | "調味料" | "食材";
