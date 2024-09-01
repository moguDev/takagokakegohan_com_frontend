export type UserProfiles = {
  name: string;
  nickname: string;
  avatar: string | null;
};

export type Recipe = {
  id: number;
  user_id: number;
  title: string;
  body: string;
  cooking_time: number;
  image: { url: string | null };
  ingredients: { ingredient: string; amount: string; category: string }[];
};
