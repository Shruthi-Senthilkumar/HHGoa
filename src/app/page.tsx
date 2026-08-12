import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/hero/Hero";

import { Process } from "@/components/sections/Process";
import { Statement } from "@/components/sections/Statement";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col w-full">
        <Hero />

        <Process />
        <Statement />
      </main>
      <Footer />
    </>
  );
}
