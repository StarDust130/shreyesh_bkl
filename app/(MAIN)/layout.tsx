import React from "react";
import { MobileMenuProvider } from "@/components/elements/MobileMenuContext";
import Sidebar from "@/components/elements/Sidebar";
import Topbar from "@/components/elements/Topbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MobileMenuProvider>
      <div className="flex h-screen w-full relative">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 h-full relative z-10">
          <Topbar />

          {/* Scrollable Page Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 bg-grid-pattern relative">
            {children}
          </div>
        </main>
      </div>
    </MobileMenuProvider>
  );
}
