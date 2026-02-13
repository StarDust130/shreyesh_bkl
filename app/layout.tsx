import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/elements/Sidebar";
import Topbar from "@/components/elements/Topbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const rajdhani = Rajdhani({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
});

export const metadata: Metadata = {
  title: "TENGEN | Risk Intelligence",
  description: "Industrial Land Governance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${rajdhani.variable} bg-[#F2F2F2] text-black font-sans antialiased`}
      >
        {/* Layout Shell */}
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-0 md:ml-[220px] flex flex-col">
            <Topbar />
            <div className="p-6 overflow-auto h-[calc(100vh-64px)]">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}

// // Placeholder imports to prevent errors before components are created
// import Sidebar from "@/components/Sidebar";
// import Topbar from "@/components/Topbar";
