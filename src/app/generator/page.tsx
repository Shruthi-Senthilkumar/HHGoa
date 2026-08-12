import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/footer/Footer";
import { GeneratorWorkspace } from "@/components/generator/GeneratorWorkspace";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generator | HH Goa 2026",
};

export default function GeneratorPage() {
  return (
    <>
      <Header action="back" />
      <main className="flex-1 flex flex-col min-h-screen">
        <GeneratorWorkspace />
      </main>
      <Footer />
    </>
  );
}
