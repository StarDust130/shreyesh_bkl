"use client";
import {
  ArrowLeft,
  ShieldAlert,
  MapPin,
  Ruler,
  Zap,
  Clock,
  FileText,
  Calendar,
  Siren,
  RefreshCw,
  Download,
  ChevronRight,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// --- COMPONENTS ---

// 1. Technical Metric Card (Used for Area/Deviation stats)
const MetricCard = ({ label, value, unit, isWarning = false }: any) => (
  <div
    className={`border-l-2 p-3 ${isWarning ? "border-[#FF2E00] bg-red-50" : "border-black bg-gray-50"}`}
  >
    <div className="text-[10px] font-rajdhani font-bold uppercase tracking-widest text-gray-500 mb-1">
      {label}
    </div>
    <div className="font-orbitron font-bold text-xl">
      {value}{" "}
      <span className="text-xs font-rajdhani text-gray-400 font-normal">
        {unit}
      </span>
    </div>
  </div>
);

// 2. Violation Row (The checklist item)
const ViolationRow = ({ icon: Icon, label, value, status, delay }: any) => (
  <div
    className="flex items-center justify-between p-4 border border-gray-200 hover:border-black hover:bg-white hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all group animate-enter"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-sm group-hover:bg-black group-hover:text-white transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-xs font-bold font-rajdhani text-gray-400 uppercase tracking-wider">
          {label}
        </div>
        <div className="font-bold text-sm md:text-base">{value}</div>
      </div>
    </div>
    <div
      className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest border ${
        status === "CRITICAL"
          ? "bg-red-100 text-[#FF2E00] border-[#FF2E00]"
          : status === "WARNING"
            ? "bg-orange-100 text-orange-600 border-orange-500"
            : "bg-gray-100 text-gray-500 border-gray-300"
      }`}
    >
      {status}
    </div>
  </div>
);

// 3. Cyberpunk Action Button
const ActionButton = ({ icon: Icon, label, variant = "default" }: any) => {
  const baseClass =
    "flex items-center justify-center gap-2 px-6 py-4 font-orbitron font-bold text-xs uppercase tracking-widest transition-all clip-path-slant active:translate-y-1";
  const styles = {
    default:
      "bg-white border-2 border-black hover:bg-black hover:text-white shadow-[4px_4px_0px_#ccc]",
    primary:
      "bg-black text-white border-2 border-black hover:bg-[#FF2E00] hover:border-[#FF2E00] shadow-[4px_4px_0px_rgba(0,0,0,0.3)]",
    danger:
      "bg-[#FF2E00] text-white border-2 border-[#FF2E00] hover:bg-white hover:text-[#FF2E00] shadow-[4px_4px_0px_rgba(255,46,0,0.3)]",
  };

  return (
    <button className={`${baseClass} ${(styles as any)[variant]}`}>
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
};

export default function PlotDetail({ params }: { params: { id: string } }) {
  // Mock Data (In real app, fetch based on ID)
  const plot = {
    id: "135",
    owner: "Sharma Industries",
    zone: "Industrial Area A",
    risk: 82,
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-20">
      {/* 🟥 SECTION 1: HEADER BLOCK */}
      <div className="bg-white border-2 border-black p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden group">
        {/* Decorative Background Text */}
        <div className="absolute top-0 right-0 text-[150px] font-orbitron font-black text-gray-100 opacity-50 -z-10 select-none pointer-events-none -translate-y-10 translate-x-10">
          {plot.risk}
        </div>

        <div>
          <Link
            href="/"
            className="inline-flex items-center text-xs font-bold font-rajdhani text-gray-400 uppercase tracking-widest mb-4 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-3 h-3 mr-1" /> Back to Dashboard
          </Link>
          <h1 className="font-orbitron font-black text-4xl md:text-5xl uppercase tracking-tighter mb-2">
            Plot #{plot.id}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm font-rajdhani font-bold">
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 border border-gray-300">
              <MapPin className="w-4 h-4" /> {plot.zone}
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-black text-white">
              OWNER: {plot.owner}
            </div>
          </div>
        </div>

        {/* Big Risk Score */}
        <div className="flex items-center gap-6">
          <div className="text-right hidden md:block">
            <div className="text-xs font-bold font-orbitron text-[#FF2E00] uppercase tracking-[0.3em] mb-1 animate-pulse">
              Critical Level
            </div>
            <div className="text-xs font-rajdhani text-gray-400">
              Calculated: 10m ago
            </div>
          </div>
          <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center border-4 border-black bg-white shadow-[8px_8px_0px_#FF2E00]">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#FF2E00] animate-pulse"></div>
            <div className="text-center">
              <div className="font-orbitron font-black text-5xl md:text-6xl text-[#FF2E00]">
                {plot.risk}
              </div>
              <div className="text-[10px] font-bold font-orbitron uppercase tracking-widest bg-black text-white px-2 mt-1">
                High Risk
              </div>
            </div>
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 bg-black"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-black"></div>
          </div>
        </div>
      </div>

      {/* 🗺 SECTION 2: ANALYSIS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Map & Spatial Data (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border-2 border-black h-[500px] relative overflow-hidden group">
            {/* Map UI Overlay */}
            <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur border border-black px-4 py-2 font-orbitron font-bold text-xs uppercase shadow-md">
              <span className="w-2 h-2 bg-[#FF2E00] rounded-full inline-block mr-2 animate-ping"></span>
              Satellite Live Feed
            </div>

            {/* The Map (Mock Visuals) */}
            <div className="w-full h-full bg-[#E5E5E5] relative">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "radial-gradient(#999 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                  opacity: 0.3,
                }}
              ></div>

              {/* Scanning Line Animation */}
              <div className="scan-line"></div>

              {/* The Plot Polygon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-[#FF2E00] bg-[#FF2E00]/10 flex items-center justify-center animate-pulse-glow">
                <div className="text-[#FF2E00] font-orbitron font-bold text-lg">
                  PLOT #135
                </div>
                {/* Deviation Area (Dotted Line) */}
                <div className="absolute -right-12 top-0 w-12 h-64 border-2 border-dashed border-black/50 bg-yellow-400/20 flex items-center justify-center">
                  <span className="text-[10px] font-bold -rotate-90">
                    DEVIATION
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Metrics Bar */}
            <div className="absolute bottom-0 w-full bg-white border-t-2 border-black p-4 grid grid-cols-3 gap-4">
              <MetricCard label="Allotted Area" value="2,400" unit="sq.m" />
              <MetricCard
                label="Current Usage"
                value="2,950"
                unit="sq.m"
                isWarning={true}
              />
              <MetricCard
                label="Deviation"
                value="+22%"
                unit="OVER LIMIT"
                isWarning={true}
              />
            </div>
          </div>

          {/* 📈 Risk Trend (Mini Graph) */}
          <div className="bg-white border-2 border-black p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-orbitron font-bold text-lg uppercase flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#FF2E00]" /> Risk Trend (12
                Months)
              </h3>
              <div className="text-xs font-bold font-rajdhani bg-gray-100 px-2 py-1">
                VOLATILITY: HIGH
              </div>
            </div>
            {/* SVG Sparkline */}
            <div className="h-32 w-full relative">
              <svg
                className="w-full h-full"
                viewBox="0 0 100 30"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,25 Q10,25 20,20 T40,22 T60,10 T80,5 T100,2"
                  fill="none"
                  stroke="#FF2E00"
                  strokeWidth="0.5"
                />
                <path
                  d="M0,25 L100,2 L100,30 L0,30 Z"
                  fill="url(#gradient)"
                  opacity="0.1"
                />
                <defs>
                  <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#FF2E00" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Points */}
              <div className="absolute top-[10%] left-[60%] w-3 h-3 bg-[#FF2E00] border-2 border-white rounded-full shadow-lg"></div>
              <div className="absolute top-[5%] left-[80%] w-3 h-3 bg-[#FF2E00] border-2 border-white rounded-full shadow-lg"></div>
            </div>
          </div>
        </div>

        {/* RIGHT: Violation & Details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Violation List */}
          <div className="bg-white border-2 border-black p-1">
            <div className="bg-black text-white p-3 font-orbitron font-bold text-sm uppercase flex justify-between items-center mb-1">
              <span>Violation Breakdown</span>
              <ShieldAlert className="w-4 h-4 text-[#FF2E00]" />
            </div>
            <div className="space-y-2 p-2 bg-gray-50">
              <ViolationRow
                icon={Ruler}
                label="Boundary Deviation"
                value="+22% Expansion"
                status="CRITICAL"
                delay="100"
              />
              <ViolationRow
                icon={Clock}
                label="Payment Status"
                value="3 Months Overdue"
                status="WARNING"
                delay="200"
              />
              <ViolationRow
                icon={Zap}
                label="Utility Usage"
                value="Inactive (6mo)"
                status="WARNING"
                delay="300"
              />
              <ViolationRow
                icon={Calendar}
                label="Last Inspection"
                value="Jan 24, 2024"
                status="EXPIRED"
                delay="400"
              />
            </div>
          </div>

          {/* 🧠 Risk Explanation Box (The "Why") */}
          <div className="bg-[#FF2E00] p-1">
            <div className="bg-white h-full p-6">
              <h3 className="font-orbitron font-bold text-lg uppercase mb-4 text-[#FF2E00]">
                Why is this High Risk?
              </h3>
              <ul className="space-y-3">
                {[
                  "Physical expansion detected beyond allotted zone coordinates.",
                  "Pattern of non-payment correlates with utility inactivity.",
                  "No industrial output registered in last 2 quarters.",
                  "Previous warning notice (Notice #404) was ignored.",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm font-medium"
                  >
                    <ChevronRight className="w-4 h-4 text-[#FF2E00] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 🧭 SECTION 4: ACTION PANEL */}
      <div className="fixed bottom-0 left-0 right-0 md:relative bg-white border-t-2 md:border-2 border-black p-4 md:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] md:shadow-none z-50">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="hidden md:block">
            <div className="font-orbitron font-bold text-xs uppercase text-gray-400">
              Case ID: 2026-X-135
            </div>
            <div className="font-rajdhani font-bold text-sm">
              Action Required immediately
            </div>
          </div>

          <div className="grid grid-cols-2 md:flex items-center gap-3 w-full md:w-auto">
            <ActionButton
              icon={RefreshCw}
              label="Recalculate"
              variant="default"
            />
            <ActionButton
              icon={FileText}
              label="PDF Report"
              variant="default"
            />
            <ActionButton
              icon={Calendar}
              label="Schedule Visit"
              variant="primary"
            />
            <ActionButton icon={Siren} label="Send Notice" variant="danger" />
          </div>
        </div>
      </div>
    </div>
  );
}
