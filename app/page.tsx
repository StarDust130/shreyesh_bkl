import Hero from './components/Hero.tsx'
import Features from './components/Features.tsx'
import CTA from './components/CTA.tsx'

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <Hero />
      <Features />
      <CTA />
    </div>
  )
}