"use client";

import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import GlowButton from "./GlowButton";
import ScrambleText from "./ScrambleText";

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [startAnim, setStartAnim] = useState(false);

  // 🔥 trigger when section visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartAnim(true);
        }
      },
      { threshold: 0.6 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* grid lines */}
      <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] opacity-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="border-r border-black/20 h-full" />
        ))}
      </div>

      <Container className="relative z-10 text-center">
        <div className="bg-black text-white rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
          {/* neon */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#FF0033] to-transparent" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#FF0033] rounded-full blur-[120px] opacity-30" />

          {/* TITLE */}
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-6">
            <ScrambleText text="You are in " start={startAnim} />
            <span className="text-[#FF0033]">
              <ScrambleText text="BKL !" start={startAnim} />
            </span>
          </h2>

          {/* SUBTEXT */}
          <p className="text-gray-400 max-w-xl mx-auto mb-10 text-lg">
            Transparent systems build strong industries. <br />
            Secure land. Strong future.
          </p>

          <div className="flex justify-center">
            <GlowButton className="px-10 py-4 text-lg">
              Initialize System
            </GlowButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
