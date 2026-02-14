"use client";
import {
  LayoutDashboard,
  Trophy,
  FileText,
  Settings,
  ShieldAlert,
  X,
  Zap,
  Eclipse,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useMobileMenu } from "./MobileMenuContext";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Global Rank", icon: Trophy, path: "/ranking" },
  { name: "Legal Reports", icon: FileText, path: "/reports" },
  { name: "Sys Config", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, setIsOpen } = useMobileMenu();
  const [currentTime, setCurrentTime] = useState("00:00");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const checkActive = (path: string) => {
    if (path === "/") {
      return pathname === "/" || pathname === "/dashboard";
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-[60] md:hidden transition-opacity duration-300 backdrop-blur-sm ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`
        fixed inset-y-0 left-0 z-[70] w-[280px] bg-white border-r-2 border-black flex flex-col transition-transform duration-300 ease-out
        md:relative md:translate-x-0 
        ${isOpen ? "translate-x-0 shadow-[100px_0px_0px_rgba(0,0,0,0.1)]" : "-translate-x-full"}
      `}
      >
        {/* --- FIX IS HERE: Changed h-24 to h-20 to match Topbar --- */}
        <div className="h-20 flex items-center justify-between px-6 border-b-2 border-black bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-black"></div>

          <div className="flex items-center gap-3 z-10">
            <div className="relative group">
              <div className="w-10 h-10 bg-black text-white clip-path-slant flex items-center justify-center group-hover:bg-cyber-red transition-colors duration-300">
                <Eclipse className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-cyber-red clip-path-slant group-hover:bg-black transition-colors"></div>
            </div>
            <div>
              <span className="font-orbitron font-black text-3xl tracking-tighter block leading-none animate-pulse group-hover:opacity-0 transition-opacity duration-300">
                <span className="inline-block">BKL</span>
                <span className="text-cyber-red">.</span>
              </span>
              <span className="font-orbitron font-black text-3xl tracking-tighter block leading-none absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-block">BKL</span>
                <span className="text-cyber-red">.</span>
              </span>
              <span className="font-rajdhani font-bold text-[10px] text-gray-500 uppercase]">
                Smart Monitoring System
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-1 hover:bg-black hover:text-white transition-colors border-2 border-transparent hover:border-black rounded"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 py-8 px-4 space-y-3">
          {menuItems.map((item) => {
            const isActive = checkActive(item.path);

            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`
                  group relative flex items-center px-5 py-4 font-orbitron text-sm font-bold uppercase tracking-wider transition-all duration-200 border-2 clip-path-slant
                  ${
                    isActive
                      ? "bg-[#FF2E00] text-white border-black shadow-[4px_4px_0px_#000] translate-x-2"
                      : "bg-white text-gray-500 border-transparent hover:border-black hover:bg-gray-50 hover:text-black hover:translate-x-1"
                  }
                `}
              >
                <item.icon
                  className={`w-5 h-5 mr-4 transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 group-hover:text-black"
                  }`}
                />
                <span className="relative z-10">{item.name}</span>

                {isActive && (
                  <Zap className="w-4 h-4 ml-auto text-white fill-white animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Info */}
        <div className="p-6 border-t-2 border-black bg-gray-50">
          <div className="border border-gray-300 bg-white p-3 shadow-sm hover:border-black transition-colors group">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-rajdhani font-bold text-gray-400 uppercase tracking-widest group-hover:text-cyber-red">
                System Online
              </span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
            </div>
            <div className="font-orbitron text-lg font-black tracking-tight">
              <span>
                {new Date().toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </div>
          </div>

          <div className="mt-4 text-[10px] text-center font-rajdhani text-gray-400 uppercase">
            © 2026 TENGEN CORP
          </div>
        </div>
      </aside>
    </>
  );
}
