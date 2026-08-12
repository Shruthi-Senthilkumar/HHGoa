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
    <section className="py-24 md:py-32 border-b border-border bg-bg-surface">
      <Container>
        <div className="flex flex-col md:flex-row md:items-start gap-12 md:gap-24">
          
          <div className="md:w-1/3 shrink-0">
            <Heading level="h2" className="uppercase sticky top-24 text-[clamp(3.5rem,10vw,6rem)] leading-[0.85] tracking-tight">
              HOW IT<br />WORKS
            </Heading>
          </div>

          <div className="md:w-2/3 flex flex-col gap-12 md:gap-16">
            {steps.map((step) => (
              <div key={step.num} className="group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-12 border-t border-border pt-8 first:border-t-0 first:pt-0 md:first:border-t md:first:pt-8">
                <Text mono size="lg" variant="secondary" className="group-hover:text-color-accent transition-colors">
                  {step.num}
                </Text>
                <div className="space-y-4">
                  <Heading level="h3" size="3xl" className="uppercase leading-none">
                    {step.title}
                  </Heading>
                  <Text size="lg" variant="secondary" className="max-w-md">
                    {step.desc}
                  </Text>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </Container>
    </section>
  );
}
