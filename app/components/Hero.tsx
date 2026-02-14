"use client"
import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import Container from './Container'
import { ArrowUpRight, X } from 'lucide-react'
import gsap from 'gsap'
import '../styles/GlassEffects.css'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out"
      })
      gsap.from(".hero-card", {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "expo.out",
        stagger: 0.2
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="w-full relative">
      <Container>
        {/* Headline */}
        <div className="mb-12 max-w-6xl">
          <h1 className="hero-text text-[clamp(2.5rem,5vw,5rem)] leading-[0.9] font-black uppercase tracking-tighter text-gray-900">
            THE COMMAND CENTER FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-500">INDUSTRIAL LAND</span> GOVERNANCE <span className="text-[#FF0033]">B.K.L</span> with us
          </h1>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">
          
          {/* Left Column: Black Card & Small Visuals */}
          <div className="lg:col-span-4 flex flex-col gap-6 h-full">
            
            {/* Black Nav Card */}
            <div className="hero-card flex-grow bg-black text-white rounded-[2.5rem] p-8 relative overflow-hidden group">
              {/* Background Decor */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-b from-[#222] to-transparent rounded-bl-full opacity-50" />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                   <div className="text-xs font-mono text-red-400 border border-gray-700 w-fit px-3 py-1 rounded-full mb-6">BKS</div>
                   <h3 className="text-xl font-medium text-gray-300 mb-2">SATELLITE</h3>
                   <p className="text-3xl font-bold leading-tight">Smarter land. Smarter Governance</p>
                </div>

                <div className="space-y-4 mt-8">
                  <div className="flex items-center justify-between group/link cursor-pointer border-b border-gray-800 pb-4">
                    <span className="text-gray-300 group-hover/link:text-white transition-colors">From satellite data to real-time decisions</span>
                    <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover/link:text-red-500 transition-colors" />
                  </div>
                   <div className="flex items-center justify-between group/link cursor-pointer border-b border-gray-800 pb-4">
                    <span className="text-gray-300 group-hover/link:text-white transition-colors">Where land meets intelligence.</span>
                    <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover/link:text-red-500 transition-colors" />
                  </div>
                </div>
                
                <div className="absolute top-6 right-6">
                    <button className="w-12 h-12 bg-[#FF0033] rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                        <ArrowUpRight className="text-white w-6 h-6" />
                    </button>
                </div>
              </div>
            </div>

            {/* Bottom Split: Image + Red Tag Menu */}
            <div className="h-64 flex gap-4">
               <div className="hero-card w-1/2 rounded-[2.5rem] overflow-hidden relative group">
                 <Image 
                   src="/img/img03.png"
                   alt="Cyber Headset"
                   fill
                   className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                   sizes="(max-width: 768px) 100vw, 50vw"
                 />
               </div>
               <div className="hero-card w-1/2 bg-[#FF0033] rounded-[2.5rem] p-6 flex flex-col justify-between relative overflow-hidden">
                  {/* Decorative Chips */}
                  <div className="flex flex-wrap gap-2 content-start">
                    <span className="bg-white text-black text-[10px] font-bold px-3 py-1 rounded-full">Mapping truth</span>
                    <span className="bg-white text-black text-[10px] font-bold px-3 py-1 rounded-full">Detecting change</span>
                  </div>
                  
                  {/* Floating Bubbles */}
                  <div className="flex flex-wrap gap-2 mt-4 rotate-[-5deg]">
                      <span className="bg-white/90 text-black text-[10px] px-3 py-2 rounded-xl shadow-lg">Telling</span>
                      <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-xs"><X size={12}/></span>
                      <span className="bg-white/90 text-black text-[10px] px-3 py-2 rounded-xl shadow-lg">trust-Fi</span>
                  </div>

                  <div className="mt-auto flex justify-between items-center w-full">
                     <ArrowUpRight className="text-white w-5 h-5" />
                     <span className="text-white font-bold text-sm">Detect. Analyze. Act..</span>
                  </div>
               </div>
            </div>
          </div>

         <div className="lg:col-span-8 h-[500px] lg:h-full relative rounded-[2.5rem] overflow-hidden group hero-card">
    <Image 
      src="/img/img04.png"
      alt="Cyberpunk Hero"
      fill
      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
      priority
    />
    
    {/* Overlay UI Elements using the new CSS classes */}
    <div className="absolute top-6 right-6 flex gap-2">
        {/* <span className="glass-badge-light px-4 py-2 rounded-full text-xs font-bold text-gray-900">Jan 06 2026</span> */}
        <span className="glass-badge-dark px-4 py-2 rounded-full text-xs font-bold text-white">● BKL</span>
    </div>

    {/* Bottom Glass Card Overlay */}
    <div className="absolute bottom-6 left-6 right-6 lg:right-auto lg:w-2/3">
      <div className="glass-card p-8 rounded-[2rem]">
         {/* The Accent Bar */}
         <div className="hero-accent-bar" />
         
         <span className="text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 block">● BKL</span>
         <h2 className="text-2xl lg:text-4xl font-bold leading-tight text-gray-900 mb-2">
           Where land meets <span className="text-gray-500">intelligence</span>
         </h2>

         <div className="absolute bottom-6 right-6">
            <button className="w-14 h-14 bg-[#FF0033] rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-red-500/30">
                <ArrowUpRight className="text-white w-8 h-8" />
            </button>
         </div>
      </div>
    </div>
</div>

        </div>
      </Container>
    </section>
  )
}