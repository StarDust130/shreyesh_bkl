import React from "react"; // 👈 FIX 1: This is required for React.ReactNode
import type { Metadata } from "next";

// 👈 FIX 2: Double check these paths.
// If your files are directly in 'components', remove '/elements'.
import { MobileMenuProvider } from "@/components/elements/MobileMenuContext";
import Sidebar from "@/components/elements/Sidebar";
import Topbar from "@/components/elements/Topbar";

export const metadata: Metadata = {
  title: "BKL | Dashboard",
  description: "Industrial Monitoring Dashboard",
};

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // We add 'h-screen' and 'flex' here to ensure the sidebar stretches correctly
    <div className="bg-[#F4F4F4] text-black antialiased h-screen w-full flex overflow-hidden">
      <MobileMenuProvider>
        {/* Sidebar (Fixed Left) */}
        <Sidebar />

        {/* Main Content (Scrollable) */}
        <main className="flex-1 flex flex-col min-w-0 h-full relative z-10">
          <Topbar />

          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 bg-grid-pattern relative">
            {children}
          </div>
        </main>
      </MobileMenuProvider>
    </div>
  );
}
