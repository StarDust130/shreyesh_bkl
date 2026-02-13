"use client";
import { Bell, ChevronDown, Menu, Search, Command } from "lucide-react";
import { useMobileMenu } from "./MobileMenuContext";

export default function Topbar() {
  const { setIsOpen } = useMobileMenu();

  return (
    <header className="h-20 bg-white border-b-2 border-black flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 shadow-sm">
      {/* LEFT: Menu Trigger & Breadcrumbs */}
      <div className="flex items-center gap-4">
        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 border-2 border-black bg-white active:bg-black active:text-white transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden md:flex flex-col">
          <div className="flex items-center gap-2 text-[10px] font-rajdhani font-bold text-gray-400 uppercase tracking-widest">
            <span>Industrial Zone A</span>
            <span className="text-gray-300">/</span>
            <span className="text-[#FF2E00]">Sector 4</span>
          </div>
          <h1 className="font-orbitron font-black text-2xl uppercase tracking-tight leading-none">
            Overview
          </h1>
        </div>
      </div>

      {/* CENTER: Search Bar (Desktop) */}
      <div className="hidden lg:flex items-center justify-center flex-1 mx-10">
        <div className="group w-full max-w-lg relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400 group-focus-within:text-[#FF2E00] transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-12 py-3 border-2 border-gray-200 bg-gray-50 text-sm font-rajdhani font-bold uppercase tracking-wider focus:border-black focus:ring-0 focus:bg-white transition-all outline-none"
            placeholder="Search Plot ID, Owner, or Risk..."
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-400 text-xs border border-gray-300 px-1.5 py-0.5 rounded font-mono">
              ⌘K
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT: User Actions */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Notification Bell */}
        <button className="relative p-2 group hover:bg-gray-100 rounded-full transition-all">
          <Bell className="w-6 h-6 text-black group-hover:rotate-12 transition-transform" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#FF2E00] border-2 border-white rounded-full animate-pulse"></span>
        </button>

        {/* User Profile Dropdown Trigger */}
        <div className="flex items-center gap-3 pl-6 border-l-2 border-gray-100 cursor-pointer group">
          <div className="text-right hidden md:block">
            <div className="text-sm font-orbitron font-bold">Babu Rao 😎</div>
            <div className="text-[10px] font-rajdhani font-bold text-gray-400 uppercase tracking-wider group-hover:text-[#FF2E00]">
              Admin Access
            </div>
          </div>
          <div className="w-10 h-10 bg-black border-2 border-transparent group-hover:border-[#FF2E00] overflow-hidden transition-all shadow-[4px_4px_0px_#ccc] group-hover:shadow-[4px_4px_0px_#FF2E00]">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="Admin"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
