import { GeneratorProvider } from "@/context/GeneratorContext";

export default function GeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GeneratorProvider>{children}</GeneratorProvider>;
}
