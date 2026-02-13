"use client";
import { Bell, ChevronDown, RefreshCw, User } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-16 bg-white border-b-2 border-black flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left: Title */}
      <div className="flex items-center">
        <h1 className="font-rajdhani font-bold text-2xl uppercase tracking-wider">
          Dashboard <span className="text-gray-400 mx-2">//</span> Overview
        </h1>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-4">
        {/* Zone Selector */}
        <div className="hidden md:flex items-center border-2 border-black px-3 py-1.5 bg-gray-50">
          <span className="text-xs font-bold font-rajdhani text-gray-500 mr-2 uppercase">
            Zone
          </span>
          <span className="font-bold font-rajdhani text-sm">Industrial A</span>
          <ChevronDown className="w-4 h-4 ml-2" />
        </div>

        {/* Date Selector (Simplified) */}
        <div className="hidden md:flex items-center border-2 border-black px-3 py-1.5 bg-gray-50">
          <span className="font-bold font-rajdhani text-sm">June 2024</span>
          <ChevronDown className="w-4 h-4 ml-2" />
        </div>

        {/* Action Button - Cyberpunk Style */}
        <button className="flex items-center bg-black text-white px-4 py-2 font-rajdhani font-bold text-sm hover:bg-red-600 transition-colors shadow-[4px_4px_0px_0px_rgba(200,200,200,1)] active:translate-y-1 active:shadow-none">
          <RefreshCw className="w-4 h-4 mr-2" />
          RECALCULATE RISK
        </button>

        {/* Notifications */}
        <button className="p-2 hover:bg-gray-100 rounded-full border border-transparent hover:border-black transition-all">
          <Bell className="w-5 h-5" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-gray-200 border border-black flex items-center justify-center rounded-sm">
            <User className="w-5 h-5" />
          </div>
          <span className="hidden md:block font-rajdhani font-bold text-sm">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
}
