import type { Metadata } from "next";
import { Inter, Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

import { MobileMenuProvider } from "@/components/elements/MobileMenuContext"; // We will create this small helper
import Sidebar from "@/components/elements/Sidebar";
import Topbar from "@/components/elements/Topbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const rajdhani = Rajdhani({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
});

export const metadata: Metadata = {
  title: "BKL | Smart Monitoring System",
  description: "A cutting-edge dashboard for real-time monitoring and management of industrial zones, providing actionable insights and comprehensive data visualization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${rajdhani.variable} ${orbitron.variable} bg-[#F4F4F4] text-black antialiased overflow-hidden`}
      >
        <MobileMenuProvider>
          <div className="flex h-screen w-full relative">
            {/* Sidebar is now responsive inside the component */}
            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0 h-full relative z-10">
              <Topbar />
              {/* Added a subtle grid background texture */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 bg-grid-pattern relative">
                {children}
              </div>
            </main>
          </div>
        </MobileMenuProvider>
      </body>
    </html>
  );
}
