import { Hero } from "@/components/home/Hero";
import { Innovations } from "@/components/home/Innovations";
import { WhyUs } from "@/components/home/WhyUs";
import { TrustPartners } from "@/components/home/TrustPartners";
import { FrequentTests } from "@/components/home/FrequentTests";

export default function Home() {
  return (
    <>
      <Hero />
      <FrequentTests />
      <WhyUs />
      <Innovations />
      <TrustPartners />
      
    </>
  );
}