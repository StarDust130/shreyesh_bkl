"use client";
import {
  Save,
  RotateCcw,
  UploadCloud,
  Trash2,
  Plus,
  AlertOctagon,
  Database,
  Sliders,
  Cpu,
  Map,
  Server,
  AlertTriangle,
  RefreshCw,
  HardDrive,
  CheckCircle,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

// --- COMPONENTS ---

const SectionHeader = ({ title, icon: Icon, sub }: any) => (
  <div className="flex items-center justify-between mb-6 border-b-2 border-black pb-2">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-black text-white flex items-center justify-center clip-path-slant">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <h2 className="font-orbitron font-bold text-lg uppercase tracking-wider leading-none">
          {title}
        </h2>
        <p className="text-[10px] font-rajdhani font-bold text-gray-400 uppercase tracking-[0.2em]">
          {sub}
        </p>
      </div>
    </div>
    {/* Decorative blinking light */}
    <div className="w-2 h-2 bg-[#FF2E00] rounded-full animate-pulse"></div>
  </div>
);

const CyberSlider = ({ label, value, onChange, color = "black" }: any) => (
  <div className="mb-5 group">
    <div className="flex justify-between items-end mb-2 font-rajdhani font-bold uppercase">
      <label className="text-xs text-gray-500 group-hover:text-black transition-colors">
        {label}
      </label>
      <span className="font-mono text-lg leading-none">{value}%</span>
    </div>
    <div className="relative h-4 bg-gray-200 clip-path-slant overflow-hidden">
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={onChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
      />
      {/* Visual Fill */}
      <div
        className={`absolute top-0 left-0 h-full transition-all duration-100 ease-out ${
          color === "red" ? "bg-[#FF2E00]" : "bg-black"
        }`}
        style={{ width: `${value}%` }}
      ></div>
      {/* Grid lines overlay */}
      <div className="absolute inset-0 bg-[url('/grid.png')] opacity-20 pointer-events-none z-10"></div>
    </div>
  </div>
);

export default function SettingsPage() {
  const [weights, setWeights] = useState({
    deviation: 40,
    payment: 30,
    utility: 20,
    history: 10,
  });
  const [total, setTotal] = useState(100);

  useEffect(() => {
    setTotal(
      weights.deviation + weights.payment + weights.utility + weights.history,
    );
  }, [weights]);

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-20">
      {/* 🟥 HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b-2 border-black pb-6 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 border-2 border-black bg-black text-white">
            <Sliders className="w-8 h-8" />
          </div>
          <div>
            <h1 className="font-orbitron font-black text-4xl uppercase tracking-tighter">
              System Config
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-[#FF2E00] text-white text-[10px] px-2 py-0.5 font-orbitron font-bold uppercase">
                ADMIN ACCESS
              </span>
              <p className="font-rajdhani font-bold text-gray-400 uppercase tracking-widest text-xs">
                Control Panel • v2.4.0
              </p>
            </div>
          </div>
        </div>

        {/* Save Button (Global) */}
        <button className="flex items-center px-8 py-3 bg-black text-white font-orbitron font-bold text-sm uppercase hover:bg-[#FF2E00] transition-all shadow-[4px_4px_0px_rgba(255,46,0,0.4)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none clip-path-slant">
          <Save className="w-4 h-4 mr-2" /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 🟦 COL 1: RISK ENGINE (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div
            className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.1)] relative overflow-hidden animate-enter"
            style={{ animationDelay: "0ms" }}
          >
            {/* Background Texture */}
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Cpu className="w-32 h-32" />
            </div>

            <SectionHeader
              title="Risk Logic"
              icon={Cpu}
              sub="Algorithm Weighting"
            />

            <div className="space-y-2 relative z-10">
              <CyberSlider
                label="Boundary Deviation"
                value={weights.deviation}
                onChange={(e: any) =>
                  setWeights({
                    ...weights,
                    deviation: parseInt(e.target.value),
                  })
                }
                color="red"
              />
              <CyberSlider
                label="Payment Delays"
                value={weights.payment}
                onChange={(e: any) =>
                  setWeights({ ...weights, payment: parseInt(e.target.value) })
                }
              />
              <CyberSlider
                label="Utility Inactivity"
                value={weights.utility}
                onChange={(e: any) =>
                  setWeights({ ...weights, utility: parseInt(e.target.value) })
                }
              />
              <CyberSlider
                label="History Factor"
                value={weights.history}
                onChange={(e: any) =>
                  setWeights({ ...weights, history: parseInt(e.target.value) })
                }
              />
            </div>

            {/* Total Calculator */}
            <div
              className={`mt-6 p-4 border-2 ${total === 100 ? "border-green-500 bg-green-50" : "border-[#FF2E00] bg-red-50"} transition-colors`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-orbitron font-bold text-xs uppercase">
                  System Integrity
                </span>
                <span
                  className={`font-black font-mono ${total === 100 ? "text-green-600" : "text-[#FF2E00]"}`}
                >
                  {total}%
                </span>
              </div>
              {/* Progress Bar */}
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${total === 100 ? "bg-green-500" : "bg-[#FF2E00] animate-pulse"}`}
                  style={{ width: `${Math.min(total, 100)}%` }}
                ></div>
              </div>
              {total !== 100 && (
                <div className="flex items-center gap-2 mt-2 text-[#FF2E00] text-[10px] font-bold font-orbitron uppercase">
                  <AlertTriangle className="w-3 h-3" /> Warning: Total must
                  equal 100%
                </div>
              )}
            </div>
          </div>

          {/* 🟥 SYSTEM CONTROLS (Small but Dangerous) */}
          <div
            className="bg-white border-2 border-black p-6 animate-enter"
            style={{ animationDelay: "100ms" }}
          >
            <SectionHeader
              title="System Ops"
              icon={Server}
              sub="Advanced Actions"
            />

            <div className="grid grid-cols-1 gap-3">
              <button className="flex items-center justify-between w-full p-4 border-2 border-dashed border-gray-300 hover:border-[#FF2E00] hover:bg-red-50 group transition-all">
                <div className="text-left">
                  <div className="font-bold font-orbitron text-xs uppercase group-hover:text-[#FF2E00]">
                    Recalculate Risk
                  </div>
                  <div className="text-[10px] text-gray-400 font-rajdhani font-bold">
                    Re-run algorithm on all plots
                  </div>
                </div>
                <RefreshCw className="w-4 h-4 text-gray-300 group-hover:text-[#FF2E00] group-hover:rotate-180 transition-transform duration-500" />
              </button>

              <button className="flex items-center justify-between w-full p-4 border-2 border-dashed border-gray-300 hover:border-black hover:bg-gray-50 group transition-all">
                <div className="text-left">
                  <div className="font-bold font-orbitron text-xs uppercase group-hover:text-black">
                    Reset Simulation
                  </div>
                  <div className="text-[10px] text-gray-400 font-rajdhani font-bold">
                    Clear all dummy entries
                  </div>
                </div>
                <RotateCcw className="w-4 h-4 text-gray-300 group-hover:text-black transition-colors" />
              </button>

              <button className="flex items-center justify-between w-full p-4 border-2 border-dashed border-gray-300 hover:border-black hover:bg-gray-50 group transition-all">
                <div className="text-left">
                  <div className="font-bold font-orbitron text-xs uppercase group-hover:text-black">
                    Export Database
                  </div>
                  <div className="text-[10px] text-gray-400 font-rajdhani font-bold">
                    Download SQL Dump
                  </div>
                </div>
                <Database className="w-4 h-4 text-gray-300 group-hover:text-black transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* 🟩 COL 2: MANAGEMENT (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* ZONE MANAGEMENT */}
          <div
            className="bg-white border-2 border-black p-6 animate-enter"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex justify-between items-start">
              <SectionHeader
                title="Industrial Zones"
                icon={Map}
                sub="Active Areas"
              />
              <button className="p-2 bg-black text-white hover:bg-[#FF2E00] transition-colors shadow-lg">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-hidden border-2 border-gray-100">
              <table className="w-full text-left">
                <thead className="bg-black text-white text-[10px] font-orbitron font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Zone Name</th>
                    <th className="p-3">Total Plots</th>
                    <th className="p-3">Risk Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="font-rajdhani font-semibold text-sm">
                  {[
                    "Industrial Area A",
                    "Industrial Area B",
                    "Tech Park Zone 1",
                  ].map((zone, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors group"
                    >
                      <td className="p-3 font-bold">{zone}</td>
                      <td className="p-3 text-gray-500">120 Plots</td>
                      <td className="p-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-600 border border-red-200">
                          HIGH PRIORITY
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button className="text-gray-400 hover:text-[#FF2E00] transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* GEOJSON UPLOAD */}
          <div
            className="bg-white border-2 border-black p-6 animate-enter"
            style={{ animationDelay: "300ms" }}
          >
            <SectionHeader
              title="Map Data Source"
              icon={HardDrive}
              sub="Boundary Injection"
            />

            <div className="border-2 border-dashed border-gray-300 bg-gray-50 h-64 flex flex-col items-center justify-center text-center hover:border-[#FF2E00] hover:bg-red-50/10 transition-all cursor-pointer group relative overflow-hidden">
              {/* Scanning Animation */}
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.02)_50%,transparent_75%)] bg-[length:250%_250%] animate-[scanline_4s_linear_infinite] pointer-events-none"></div>

              <div className="w-16 h-16 bg-white border-2 border-black flex items-center justify-center mb-4 shadow-[4px_4px_0px_#ccc] group-hover:shadow-[4px_4px_0px_#FF2E00] transition-shadow">
                <UploadCloud className="w-8 h-8 text-black group-hover:text-[#FF2E00] transition-colors" />
              </div>

              <div className="font-orbitron font-bold text-lg uppercase group-hover:text-[#FF2E00] transition-colors">
                Drop GeoJSON File
              </div>
              <div className="text-xs text-gray-400 mt-2 font-rajdhani font-bold">
                Supports .JSON, .KML, .SHP (Max 25MB)
              </div>

              <div className="mt-6 flex items-center gap-2 text-[10px] font-bold font-mono text-gray-400 bg-white px-3 py-1 border border-gray-200">
                <CheckCircle className="w-3 h-3 text-green-500" />
                LAST UPLOAD: map_data_v204.json
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
