import React from 'react'
import Container from './Container'
import { Cpu, Globe, Shield, Zap } from 'lucide-react'

interface Feature {
  title: string
  icon: React.ReactNode
  desc: string
}

const features: Feature[] = [
    { title: "Road Curvature", icon: <Cpu />, desc: "Update base maps with accurate road networks for planning and development." },
    { title: "Encroachment", icon: <Globe />, desc: "Issue notice for immediate ground-truthing and rectification." },
    { title: "Partial/Non Construction", icon: <Shield />, desc: "Review project status and check for compliance with timelines allotment conditions." },
    { title: "Industry Status", icon: <Zap />, desc: "Analyze reasons for closures/non-operation and take appropriate action for land utilization and revival." },
]

export default function Features() {
  return (
    <section className="py-24 bg-white relative">
      <Container>
         <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-bm border-gray-100 pb-8">
            <h2 className="text-4xl font-bold uppercase max-w-lg">System <br/> <span className="text-gray-500">Capabilities</span></h2>
            
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
                <div key={i} className="group p-8 rounded-[2rem] bg-gray-50 border border-gray-100 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-6 text-black group-hover:bg-[#FF0033] group-hover:text-white transition-colors">
                        {f.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                    <p className="text-sm text-gray-500 group-hover:text-gray-400 leading-relaxed">{f.desc}</p>
                </div>
            ))}
         </div>
      </Container>
    </section>
  )
}