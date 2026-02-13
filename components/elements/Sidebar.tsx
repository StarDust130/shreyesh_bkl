"use client";
import {
  LayoutDashboard,
  Trophy,
  FileText,
  Settings,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Ranking", icon: Trophy, path: "/ranking" },
  { name: "Reports", icon: FileText, path: "/reports" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-[220px] bg-white border-r-2 border-black z-50 hidden md:flex flex-col">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b-2 border-black bg-black text-white">
        <ShieldAlert className="w-6 h-6 mr-2 text-red-500" />
        <span className="font-rajdhani font-bold text-2xl tracking-wider">
          TENGEN
        </span>
      </div>

      {/* Menu */}
      <nav className="flex-1 py-6 px-3 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center px-4 py-3 font-rajdhani font-semibold transition-all duration-200 clip-path-slant ${
                isActive
                  ? "bg-red-600 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-1"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-6 border-t-2 border-black">
        <div className="text-xs font-rajdhani text-gray-500 uppercase tracking-widest">
          System Status
        </div>
        <div className="flex items-center mt-2 text-green-600 font-bold font-rajdhani">
          <span className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></span>
          ONLINE
        </div>
      </div>
    </aside>
  );
}
