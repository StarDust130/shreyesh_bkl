"use client";
import {
  Search,
  Filter,
  Download,
  Plus,
  FileText,
  Eye,
  X,
  CheckCircle,
  Clock,
  AlertTriangle,
  Printer,
  ChevronRight,
  File,
  Zap,
  Terminal,
} from "lucide-react";
import { useState } from "react";

// --- TYPES ---
type Report = {
  id: string;
  plotId: string;
  owner: string;
  risk: "HIGH" | "MEDIUM" | "STABLE";
  riskScore: number;
  date: string;
  status: "GENERATED" | "UNDER REVIEW" | "ARCHIVED";
  officer: string;
  violations: string[];
};

// --- MOCK DATA ---
const MOCK_REPORTS: Report[] = [
  {
    id: "REP-2041",
    plotId: "135",
    owner: "Sharma Industries",
    risk: "HIGH",
    riskScore: 82,
    date: "Oct 24, 2025 • 10:42 AM",
    status: "GENERATED",
    officer: "Officer K. Singh",
    violations: [
      "Boundary deviation +22%",
      "Payment overdue (3mo)",
      "Utility inactive",
    ],
  },
  {
    id: "REP-2040",
    plotId: "207",
    owner: "Mehta Corp",
    risk: "HIGH",
    riskScore: 78,
    date: "Oct 23, 2025 • 04:15 PM",
    status: "UNDER REVIEW",
    officer: "Officer R. Verma",
    violations: ["Unauthorized construction", "Waste dumping violation"],
  },
  {
    id: "REP-2039",
    plotId: "154",
    owner: "Verma Exports",
    risk: "MEDIUM",
    riskScore: 55,
    date: "Oct 22, 2025 • 09:30 AM",
    status: "ARCHIVED",
    officer: "System Auto-Gen",
    violations: ["Minor lease irregularity"],
  },
  {
    id: "REP-2038",
    plotId: "089",
    owner: "Singh Fabrics",
    risk: "STABLE",
    riskScore: 24,
    date: "Oct 20, 2025 • 02:20 PM",
    status: "GENERATED",
    officer: "Officer K. Singh",
    violations: [],
  },
  {
    id: "REP-2037",
    plotId: "301",
    owner: "Nanda Metals",
    risk: "MEDIUM",
    riskScore: 45,
    date: "Oct 19, 2025 • 11:00 AM",
    status: "GENERATED",
    officer: "Officer K. Singh",
    violations: [],
  },
];

// --- COMPONENTS ---

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    GENERATED: "bg-green-100 text-green-800 border-green-500",
    "UNDER REVIEW": "bg-yellow-50 text-yellow-700 border-yellow-500",
    ARCHIVED: "bg-gray-100 text-gray-600 border-gray-500",
  };
  const Icon =
    status === "GENERATED"
      ? CheckCircle
      : status === "UNDER REVIEW"
        ? Clock
        : File;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-orbitron font-bold border-2 uppercase tracking-wide ${(styles as any)[status]}`}
    >
      <Icon className="w-3 h-3" />
      {status}
    </div>
  );
};

const RiskBadge = ({ level }: { level: string }) => {
  const styles = {
    HIGH: "text-[#FF2E00] bg-red-50 border-[#FF2E00] animate-pulse",
    MEDIUM: "text-orange-600 bg-orange-50 border-orange-500",
    STABLE: "text-green-600 bg-green-50 border-green-500",
  };
  return (
    <span
      className={`px-2 py-0.5 text-[10px] font-orbitron font-bold border-2 uppercase tracking-wider ${(styles as any)[level]}`}
    >
      {level} Risk
    </span>
  );
};

// --- CYBERPUNK PREVIEW DRAWER ---
const ReportDrawer = ({
  report,
  onClose,
}: {
  report: Report | null;
  onClose: () => void;
}) => {
  if (!report) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[3px] z-[80]"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 w-full md:w-[600px] bg-white border-l-4 border-black shadow-[-20px_0_40px_rgba(0,0,0,0.2)] z-[90] flex flex-col transform transition-transform animate-enter overflow-hidden">
        {/* Scanline Animation Overlay */}
        <div className="scan-line opacity-20"></div>

        {/* Drawer Header */}
        <div className="p-6 border-b-2 border-black flex justify-between items-start bg-black text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-20 font-orbitron text-4xl font-black tracking-tighter select-none">
            CONFIDENTIAL
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="w-5 h-5 text-[#FF2E00]" />
              <span className="font-orbitron font-bold text-2xl tracking-tight">
                FILE: {report.id}
              </span>
            </div>
            <StatusBadge status={report.status} />
          </div>
          <button
            onClick={onClose}
            className="relative z-10 p-2 hover:bg-[#FF2E00] border-2 border-white hover:border-[#FF2E00] transition-colors group"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[url('/grid.png')]">
          {/* Section 1: Plot Info */}
          <div className="border-2 border-black p-4 relative">
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-black"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-black"></div>

            <h3 className="font-orbitron font-bold text-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-[#FF2E00] animate-pulse"></div> Target
              Data
            </h3>
            <div className="grid grid-cols-2 gap-6 font-rajdhani">
              <div>
                <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">
                  Plot ID Index
                </div>
                <div className="font-black text-xl">[{report.plotId}]</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">
                  Owner Entity
                </div>
                <div className="font-bold text-lg truncate">{report.owner}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">
                  Officer ID
                </div>
                <div className="font-mono text-sm bg-gray-100 px-2 py-1 inline-block border-l-2 border-black">
                  {report.officer}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">
                  Timestamp Log
                </div>
                <div className="font-mono text-sm">
                  {report.date.split("•")[0]}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Risk Analysis */}
          <div
            className={`p-5 border-2 ${report.risk === "HIGH" ? "border-[#FF2E00] bg-red-50/50" : "border-black bg-gray-50"} relative overflow-hidden`}
          >
            {report.risk === "HIGH" && (
              <div className="absolute inset-0 border-[6px] border-[#FF2E00]/20 animate-pulse"></div>
            )}
            <div className="flex justify-between items-center mb-3 relative z-10">
              <span className="font-orbitron font-bold text-sm uppercase flex items-center gap-2">
                <Zap
                  className={`w-4 h-4 ${report.risk === "HIGH" ? "text-[#FF2E00]" : "text-black"}`}
                />{" "}
                Risk Assessment
              </span>
              <div className="flex items-end gap-1">
                <span
                  className={`font-black text-4xl leading-none ${report.risk === "HIGH" ? "text-[#FF2E00]" : "text-black"}`}
                >
                  {report.riskScore}
                </span>
                <span className="text-xs font-bold mb-1">/100</span>
              </div>
            </div>
            <div className="relative z-10">
              <RiskBadge level={report.risk} />
            </div>
          </div>

          {/* Section 3: Violations */}
          <div>
            <h3 className="font-orbitron font-bold text-black uppercase tracking-widest text-xs mb-3 border-b-2 border-black pb-2">
              Violation Manifest
            </h3>
            <ul className="space-y-2 font-rajdhani">
              {report.violations.length > 0 ? (
                report.violations.map((v, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between p-2 border-l-2 border-gray-300 bg-gray-50 text-sm font-bold hover:border-[#FF2E00] hover:bg-white transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#FF2E00] shrink-0" />
                      {v}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400">
                      ERR_00{i + 1}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 italic text-sm p-2 border-l-2 border-green-500 bg-green-50">
                  No active violations recorded.
                </li>
              )}
            </ul>
          </div>

          {/* Section 4: Evidence */}
          <div>
            <h3 className="font-orbitron font-bold text-black uppercase tracking-widest text-xs mb-3 border-b-2 border-black pb-2">
              Digital Evidence
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-100 border-2 border-black flex flex-col items-center justify-center cursor-pointer hover:bg-black hover:text-white hover:border-[#FF2E00] transition-all group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[url('/grid.png')] opacity-50"></div>
                  <FileText className="w-8 h-8 text-gray-300 group-hover:text-[#FF2E00] mb-2 relative z-10" />
                  <span className="text-[10px] font-bold uppercase font-orbitron relative z-10">
                    EVID_0{i}.dat
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t-2 border-black bg-gray-50 flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#FF2E00] text-white font-orbitron font-bold text-sm uppercase hover:bg-black transition-colors shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none">
            <Download className="w-4 h-4" /> Download PDF Casefile
          </button>
          <button className="px-4 border-2 border-black hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_#ccc] active:translate-y-1 active:shadow-none">
            <Printer className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-20">
      {/* 🟥 1️⃣ HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 border-b-2 border-black pb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <FileText className="w-8 h-8 text-[#FF2E00]" />
            <h1 className="font-orbitron font-black text-4xl uppercase tracking-tighter">
              Legal Reports
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-black text-white text-[10px] px-2 py-0.5 font-orbitron font-bold uppercase">
              SYS.DOCS v2.1
            </span>
            <p className="font-rajdhani font-bold text-gray-500 uppercase tracking-widest text-xs">
              Official Compliance & Inspection Documents
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="flex items-center bg-white border-2 border-black px-3 py-2 w-full md:w-64 focus-within:w-80 transition-all clip-path-slant">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="SEARCH REP-ID..."
              className="bg-transparent outline-none text-sm font-bold font-rajdhani w-full placeholder:text-gray-300 uppercase"
            />
          </div>

          {/* Filters */}
          <button className="px-3 py-2 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
          </button>

          {/* Generate New */}
          <button className="flex items-center px-6 py-3 bg-black text-white border-2 border-black font-orbitron font-bold text-xs uppercase hover:bg-[#FF2E00] hover:border-[#FF2E00] transition-all shadow-[4px_4px_0px_rgba(255,46,0,0.4)] active:translate-y-1 active:shadow-none clip-path-slant">
            <Plus className="w-4 h-4 mr-2" />
            Generate New
          </button>
        </div>
      </div>

      {/* 🟦 2️⃣ REPORTS SUMMARY STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border-2 border-black p-4 flex items-center justify-between shadow-[4px_4px_0px_rgba(0,0,0,0.1)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-black group-hover:bg-[#FF2E00] transition-colors"></div>
          <div>
            <div className="text-[10px] font-orbitron font-bold uppercase text-gray-400 mb-1">
              Total Documents
            </div>
            <div className="font-orbitron font-black text-3xl">1,248</div>
          </div>
          <div className="w-12 h-12 bg-gray-50 border-2 border-black flex items-center justify-center text-black group-hover:text-[#FF2E00] transition-colors">
            <FileText className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white border-2 border-[#FF2E00] p-4 flex items-center justify-between shadow-[4px_4px_0px_rgba(255,46,0,0.2)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#FF2E00] animate-pulse"></div>
          <div>
            <div className="text-[10px] font-orbitron font-bold uppercase text-[#FF2E00] mb-1">
              High Risk Alerts
            </div>
            <div className="font-orbitron font-black text-3xl text-[#FF2E00]">
              28
            </div>
          </div>
          <div className="w-12 h-12 bg-red-50 border-2 border-[#FF2E00] flex items-center justify-center text-[#FF2E00] animate-pulse-glow">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white border-2 border-black p-4 flex items-center justify-between shadow-[4px_4px_0px_rgba(0,0,0,0.1)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500"></div>
          <div>
            <div className="text-[10px] font-orbitron font-bold uppercase text-gray-400 mb-1">
              Pending Review
            </div>
            <div className="font-orbitron font-black text-3xl text-yellow-600">
              12
            </div>
          </div>
          <div className="w-12 h-12 bg-yellow-50 border-2 border-black flex items-center justify-center text-yellow-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 🟨 3️⃣ MAIN REPORTS TABLE */}
      <div className="bg-white border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.1)] relative">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-black"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-black"></div>

        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left border-collapse border-spacing-0">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-4 text-xs font-orbitron font-bold uppercase tracking-wider border-r border-gray-800">
                  Report ID
                </th>
                <th className="p-4 text-xs font-orbitron font-bold uppercase tracking-wider border-r border-gray-800">
                  Target Plot
                </th>
                <th className="p-4 text-xs font-orbitron font-bold uppercase tracking-wider border-r border-gray-800">
                  Risk Level
                </th>
                <th className="p-4 text-xs font-orbitron font-bold uppercase tracking-wider border-r border-gray-800">
                  Generated On
                </th>
                <th className="p-4 text-xs font-orbitron font-bold uppercase tracking-wider border-r border-gray-800">
                  Status
                </th>
                <th className="p-4 text-xs font-orbitron font-bold uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="font-rajdhani font-medium text-sm">
              {MOCK_REPORTS.map((row, i) => (
                <tr
                  key={i}
                  className="border-b-2 border-gray-200 hover:bg-[#FF2E00]/5 group transition-all animate-enter relative"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <td className="p-4 border-r-2 border-gray-200 group-hover:border-[#FF2E00] transition-colors relative">
                    {/* FIX: Scanline added to first TD instead of illegal div in TR */}
                    <div className="absolute inset-0 pointer-events-none hidden group-hover:block bg-[linear-gradient(90deg,transparent,rgba(255,46,0,0.1),transparent)] bg-[length:200%_100%] animate-scanline z-0 w-[600%]"></div>

                    <div className="font-orbitron font-bold text-gray-700 group-hover:text-black flex items-center gap-1 relative z-10">
                      <span className="text-gray-400">[</span>
                      {row.id}
                      <span className="text-gray-400">]</span>
                    </div>
                  </td>
                  <td className="p-4 border-r-2 border-gray-200 group-hover:border-[#FF2E00] transition-colors">
                    <div className="font-bold text-black flex items-center gap-1 cursor-pointer hover:text-[#FF2E00] transition-colors">
                      Plot #{row.plotId}{" "}
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                    </div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      {row.owner}
                    </div>
                  </td>
                  <td className="p-4 border-r-2 border-gray-200 group-hover:border-[#FF2E00] transition-colors">
                    <RiskBadge level={row.risk} />
                  </td>
                  <td className="p-4 text-gray-600 font-bold border-r-2 border-gray-200 group-hover:border-[#FF2E00] transition-colors">
                    {row.date}
                  </td>
                  <td className="p-4 border-r-2 border-gray-200 group-hover:border-[#FF2E00] transition-colors">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="p-4 text-right relative z-10">
                    <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setSelectedReport(row)}
                        className="flex items-center gap-1 px-4 py-2 border-2 border-black bg-white hover:bg-black hover:text-white hover:border-[#FF2E00] transition-all text-xs font-orbitron font-bold uppercase shadow-[2px_2px_0px_#ccc] active:translate-y-0.5 active:shadow-none"
                      >
                        <Eye className="w-3 h-3" /> View
                      </button>
                      <button className="p-2 border-2 border-black bg-white hover:bg-[#FF2E00] hover:text-white hover:border-[#FF2E00] transition-all shadow-[2px_2px_0px_#ccc] active:translate-y-0.5 active:shadow-none">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🟩 4️⃣ REPORT DETAIL DRAWER (SLIDE-OUT) */}
      <ReportDrawer
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
      />
    </div>
  );
}
