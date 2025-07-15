"use client";
import Image from "next/image";
import { useScroll } from "motion/react";
import Lenis from "lenis";
import { useEffect } from "react";
import "lenis/dist/lenis.css";
import AboutPage from "@/components/About/AboutPage";
import ServicesPage from "@/components/Services/ServicesPage";
import HomePage from "@/components/Home/HomePage";
import ContactPage from "@/components/Contact/ContactPage";
import FlyingDots from "@/components/ui/FlyingDots";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Main() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  });
  const { scrollYProgress } = useScroll();
  return (
    <>
    <Header />
      <main className="">
        <Image
          alt="Background"
          src="/bgs/bg13.webp"
          fill
          priority // ✅ لأنها أهم صورة
          quality={100}
          className="object-cover -z-10"
        />
        <FlyingDots />
        <HomePage progress={scrollYProgress} />
        <AboutPage progress={scrollYProgress} />
        <ServicesPage progress={scrollYProgress} />
        <ContactPage />
      </main>
      <Footer />
    </>
  );
}
