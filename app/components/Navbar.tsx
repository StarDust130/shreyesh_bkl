"use client";
import Link from "next/link";
import Container from "./Container";
import { Bell, Search, ChevronRight } from "lucide-react";
import GlowButton from "./GlowButton";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 
    w-[95%] max-w-7xl 
    rounded-full 
    bg-background/70 backdrop-blur-md 
    border border-white/10 
    shadow-lg"
    >
      <Container className="flex items-center justify-between py-3 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-black text-white px-4 py-2 rounded-full font-orbitron font-bold text-xl tracking-tighter">
            BKL
          </div>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-gray-600">
          {["Index", "Service", "Classes", "Contact", "Blog", "About Us"].map(
            (item) => (
              <Link
                key={item}
                href="#"
                className="hover:text-red-600 transition-colors"
              >
                {item}
              </Link>
            ),
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <div
            className="flex items-center gap-2 bg-white/80 backdrop-blur 
          border border-gray-200 rounded-full px-4 py-2 shadow-sm"
          >
            <Search className="w-4 h-4 text-gray-500 cursor-pointer hover:text-red-500" />
            <div className="w-px h-4 bg-gray-200 mx-1" />
            <Bell className="w-4 h-4 text-gray-500 cursor-pointer hover:text-red-500" />
            <div className="w-px h-4 bg-gray-200 mx-1" />

            <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center overflow-hidden relative">
              <Image
                src="https://ui-avatars.com/api/?name=Cyber+Punk&background=000&color=fff"
                alt="User"
                fill
                sizes="24px"
              />
            </div>

            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          <GlowButton className="hidden sm:flex text-sm py-2 px-6">
            Sign Up <ChevronRight className="w-4 h-4" />
          </GlowButton>
        </div>
      </Container>
    </nav>
  );
}
