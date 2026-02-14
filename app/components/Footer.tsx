import Container from './Container'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-12 bg-white text-sm">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#FF0033] rounded-full animate-pulse" />
                <span className="font-bold tracking-widest">BKL SYSTEMS © 2077</span>
            </div>

            <div className="flex gap-8 text-gray-500">
                <a href="#" className="hover:text-black transition-colors">Privacy</a>
                <a href="#" className="hover:text-black transition-colors">Terms</a>
                <a href="#" className="hover:text-black transition-colors">Cookies</a>
            </div>

            <div className="font-mono text-gray-400">
                SYSTEM_STATUS: <span className="text-green-500">ONLINE</span>
            </div>
        </div>
      </Container>
    </footer>
  )
}