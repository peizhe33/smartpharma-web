import { Architecture } from "@/components/sections/Architecture";
import { Demo } from "@/components/sections/Demo";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Impact } from "@/components/sections/Impact";
import { Problem } from "@/components/sections/Problem";
import { Resources } from "@/components/sections/Resources";
import { Stack } from "@/components/sections/Stack";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Validation } from "@/components/sections/Validation";
import { Workflow } from "@/components/sections/Workflow";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Problem />
      <Workflow />
      <Demo />
      <Architecture />
      <Validation />
      <Stack />
      <Impact />
      <Resources />
      <FinalCta />
    </>
  );
}
