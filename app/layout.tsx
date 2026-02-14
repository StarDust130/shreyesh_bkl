import './styles/globals.css'
import { Orbitron, Space_Grotesk } from 'next/font/google'
import Navbar from './components/Navbar.tsx'
import Footer from './components/Footer.tsx'
import type { Metadata } from 'next'

const orbitron = Orbitron({ 
  subsets: ['latin'], 
  variable: '--font-orbitron',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  variable: '--font-space',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BKL | Cyberpunk UI',
  description: 'Future BKL Interface',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased min-h-screen relative overflow-x-hidden selection:bg-red-500 selection:text-white">
        {/* Background Decor */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px]" />
           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
        </div>

        <Navbar />
        <main className="pt-24 pb-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}