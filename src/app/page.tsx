import { Hero } from "@/components/Hero";
import { TopContents } from "./TopContents";
import { SearchBar } from "@/components/SearchBar";

export default function Home() {
  return (
    <main>
      <Hero />
      <SearchBar />
      <TopContents />
    </main>
  );
}
