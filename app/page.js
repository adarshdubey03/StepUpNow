import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import JoinCommunity from "@/components/JoinCommunity";
import Mentors from "@/components/Mentors";
import Testimonials from "@/components/Testimonials";
import FinalPitch from "@/components/FinalPitch";
import MentorSignup from "@/components/MentorSignup";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <JoinCommunity />
      <Mentors />
      <Testimonials />
      <MentorSignup />
      <FinalPitch />
    </>
  );
}
