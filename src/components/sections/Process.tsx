import React from "react";
import { Container } from "../layout/Container";
import { Heading } from "../typography/Heading";
import { Text } from "../typography/Text";

const steps = [
  {
    num: "01",
    title: "UPLOAD",
    desc: "Choose your photo.",
  },
  {
    num: "02",
    title: "BUILD",
    desc: "Add your name, role and builder details.",
  },
  {
    num: "03",
    title: "SHARE",
    desc: "Download your frame and share it.",
  }
];

export function Process() {
  return (
    <section className="py-24 md:py-32 border-b border-[#075936]/20 bg-[#f6f3eb]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-start gap-12 md:gap-24">
          
          <div className="md:w-1/3 shrink-0">
            <Heading level="h2" className="uppercase sticky top-24 text-[clamp(3rem,8vw,5rem)] leading-[0.88] tracking-tight !text-[#04391e]">
              HOW IT<br /><span className="text-[#e60067]">WORKS</span>
            </Heading>
          </div>

          <div className="md:w-2/3 flex flex-col gap-8 md:gap-12">
            {steps.map((step) => (
              <div key={step.num} className="group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 border-t-2 border-[#075936]/15 pt-8 first:border-t-0 first:pt-0">
                <span className="font-mono text-2xl font-bold text-[#e60067] bg-[#ffcd00] px-3 py-1 self-start shadow-sm">
                  {step.num}
                </span>
                <div className="space-y-2">
                  <h3 className="font-display font-extrabold text-3xl md:text-4xl uppercase leading-none text-[#04391e] group-hover:text-[#075936] transition-colors">
                    {step.title}
                  </h3>
                  <p className="font-sans text-lg text-[#33503c] max-w-md font-medium">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </Container>
    </section>
  );
}
