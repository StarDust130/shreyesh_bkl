import Container from './Container'
import GlowButton from './GlowButton'

export default function CTA() {
  return (
    <section className="py-20 relative overflow-hidden">
       {/* Background Grid Lines */}
       <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] opacity-10 pointer-events-none">
          {[...Array(20)].map((_, i) => (
              <div key={i} className="border-r border-black/20 h-full" />
          ))}
       </div>

       <Container className="relative z-10 text-center">
           <div className="bg-black text-white rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
               {/* Neon Accents */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#FF0033] to-transparent" />
               <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#FF0033] rounded-full blur-[120px] opacity-30" />

               <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-6">You are in <span className="text-[#FF0033]">BKL !</span></h2>
               <p className="text-gray-400 max-w-xl mx-auto mb-10 text-lg">Join the network today and get exclusive access to the latest cybernetic enhancements and software updates.</p>
               
               <div className="flex justify-center">
                  <GlowButton className="px-10 py-4 text-lg">Initialize System</GlowButton>
               </div>
           </div>
       </Container>
    </section>
  )
}