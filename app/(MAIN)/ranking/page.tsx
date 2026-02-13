"use client";
import {
  Search,
  Filter,
  RefreshCw,
  ArrowUpDown,
  Download,
  ChevronDown,
  MapPin,
  AlertTriangle,
  DollarSign,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// --- COMPONENTS ---

// 1. KPI Strip Card
const RankStat = ({ label, value, sub, icon: Icon, color = "black" }: any) => (
  <div className="bg-white border-2 border-black p-4 flex items-center justify-between shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
    <div>
      <div className="text-[10px] font-rajdhani font-bold uppercase tracking-widest text-gray-400">
        {label}
      </div>
      <div
        className={`font-orbitron font-black text-2xl mt-1 ${color === "red" ? "text-[#FF2E00]" : "text-black"}`}
      >
        {value}
      </div>
      {sub && (
        <div className="text-[10px] font-bold text-gray-400 mt-1">{sub}</div>
      )}
    </div>
    <div
      className={`p-2 ${color === "red" ? "bg-red-50 text-[#FF2E00]" : "bg-gray-50 text-black"}`}
    >
      <Icon className="w-5 h-5" />
    </div>
  </div>
);

// 2. Status Badge
const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    "HIGH RISK": "bg-[#FF2E00] text-white border-[#FF2E00]",
    MEDIUM: "bg-yellow-100 text-yellow-700 border-yellow-500",
    STABLE: "bg-green-100 text-green-700 border-green-500",
  };
  return (
    <span
      className={`px-2 py-1 text-[10px] font-orbitron font-bold border uppercase tracking-wide ${(styles as any)[status] || styles["STABLE"]}`}
    >
      {status}
    </span>
  );
};

// 3. Payment Badge
const PaymentBadge = ({ status }: { status: string }) => {
  const isPaid = status === "PAID";
  return (
    <div
      className={`flex items-center gap-2 text-xs font-bold ${isPaid ? "text-green-600" : "text-[#FF2E00]"}`}
    >
      <div
        className={`w-2 h-2 rounded-full ${isPaid ? "bg-green-600" : "bg-[#FF2E00] animate-pulse"}`}
      ></div>
      {status}
    </div>
  );
};

export default function RankingPage() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-20">
      {/* 🟥 SECTION 1: HEADER & CONTROLS */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 border-b-2 border-black pb-6">
        <div>
          <h1 className="font-orbitron font-black text-3xl uppercase tracking-tighter">
            Global Risk Ranking
          </h1>
          <p className="font-rajdhani font-bold text-gray-400 uppercase tracking-widest text-xs mt-1">
            Priority Inspection Sequence • Zone A
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="flex items-center bg-white border-2 border-black px-3 py-2 w-full md:w-64 focus-within:w-80 transition-all">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="SEARCH PLOT ID..."
              className="bg-transparent outline-none text-sm font-bold font-rajdhani w-full placeholder:text-gray-300 uppercase"
            />
          </div>

          {/* Filter Button */}
          <button className="flex items-center px-4 py-2 bg-black text-white border-2 border-black font-orbitron font-bold text-xs uppercase hover:bg-[#FF2E00] hover:border-[#FF2E00] transition-colors whitespace-nowrap">
            <Filter className="w-3 h-3 mr-2" />
            Filter Risks
          </button>

          {/* Refresh */}
          <button className="p-2 border-2 border-black bg-white hover:bg-gray-100 transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 🟦 SECTION 2: SUMMARY STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <RankStat
          label="Total Plots"
          value="342"
          sub="Active Database"
          icon={Layers}
        />
        <RankStat
          label="High Risk"
          value="28"
          sub="Immediate Action Req."
          icon={AlertTriangle}
          color="red"
        />
        <RankStat
          label="Avg Risk Score"
          value="42%"
          sub="+5% vs Last Month"
          icon={ArrowUpDown}
        />
        <RankStat
          label="Revenue at Risk"
          value="₹12.7 Cr"
          sub="Pending Recovery"
          icon={DollarSign}
          color="red"
        />
      </div>

      {/* 🟨 SECTION 3: THE MAIN TABLE */}
      <div className="bg-white border-2 border-black relative">
        {/* Table Toolbar */}
        <div className="p-4 border-b-2 border-black bg-gray-50 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="font-orbitron font-bold text-sm uppercase">
              Ranking List
            </span>
            {/* Toggle Switch UI */}
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-4 bg-gray-300 rounded-full relative">
                <div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full transition-all group-hover:left-5"></div>
              </div>
              <span className="text-[10px] font-bold font-rajdhani uppercase text-gray-500 group-hover:text-black">
                Group by Zone
              </span>
            </div>
          </div>
          <button className="text-xs font-bold font-rajdhani uppercase hover:text-[#FF2E00] flex items-center">
            <Download className="w-3 h-3 mr-1" /> Export CSV
          </button>
        </div>

        {/* The Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-black text-white font-orbitron text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4 border-r border-gray-800 w-16 text-center">
                  #
                </th>
                <th className="p-4 border-r border-gray-800">Plot ID</th>
                <th className="p-4 border-r border-gray-800">Owner</th>
                <th className="p-4 border-r border-gray-800 w-32">
                  Risk Score
                </th>
                <th className="p-4 border-r border-gray-800">Deviation</th>
                <th className="p-4 border-r border-gray-800">Payment</th>
                <th className="p-4 border-r border-gray-800">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="font-rajdhani font-semibold text-sm">
              {[
                {
                  rank: 1,
                  id: "135",
                  owner: "Sharma Industries",
                  score: 82,
                  dev: 25,
                  pay: "OVERDUE",
                  status: "HIGH RISK",
                },
                {
                  rank: 2,
                  id: "207",
                  owner: "Mehta Corp",
                  score: 78,
                  dev: 20,
                  pay: "OVERDUE",
                  status: "HIGH RISK",
                },
                {
                  rank: 3,
                  id: "154",
                  owner: "Verma Exports",
                  score: 75,
                  dev: 18,
                  pay: "PAID",
                  status: "HIGH RISK",
                },
                {
                  rank: 4,
                  id: "198",
                  owner: "R.K. Enterprises",
                  score: 73,
                  dev: 12,
                  pay: "OVERDUE",
                  status: "HIGH RISK",
                },
                {
                  rank: 5,
                  id: "220",
                  owner: "Patel Construction",
                  score: 71,
                  dev: 30,
                  pay: "PAID",
                  status: "HIGH RISK",
                },
                {
                  rank: 6,
                  id: "089",
                  owner: "Singh Fabrics",
                  score: 68,
                  dev: 10,
                  pay: "PAID",
                  status: "MEDIUM",
                },
                {
                  rank: 7,
                  id: "301",
                  owner: "Nanda Metals",
                  score: 67,
                  dev: 5,
                  pay: "OVERDUE",
                  status: "MEDIUM",
                },
                {
                  rank: 8,
                  id: "176",
                  owner: "Arya Limited",
                  score: 65,
                  dev: 8,
                  pay: "PAID",
                  status: "MEDIUM",
                },
                {
                  rank: 9,
                  id: "244",
                  owner: "Joshi Developers",
                  score: 64,
                  dev: 2,
                  pay: "PAID",
                  status: "MEDIUM",
                },
                {
                  rank: 10,
                  id: "112",
                  owner: "Aggarwal Steels",
                  score: 62,
                  dev: 0,
                  pay: "PAID",
                  status: "STABLE",
                },
              ].map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 hover:bg-red-50/50 transition-colors group cursor-pointer animate-enter"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <td className="p-4 text-center font-orbitron font-bold text-lg text-gray-400 group-hover:text-[#FF2E00]">
                    {row.rank}
                  </td>
                  <td className="p-4 font-bold text-base group-hover:text-[#FF2E00]">
                    {row.id}
                  </td>
                  <td className="p-4 text-gray-700">{row.owner}</td>

                  {/* Score Column */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-orbitron font-bold text-lg ${row.score > 70 ? "text-[#FF2E00]" : row.score > 50 ? "text-yellow-600" : "text-green-600"}`}
                      >
                        {row.score}
                      </span>
                      {row.score > 70 && (
                        <AlertTriangle className="w-4 h-4 text-[#FF2E00] animate-pulse" />
                      )}
                    </div>
                  </td>

                  {/* Deviation Bar */}
                  <td className="p-4">
                    <div className="w-full max-w-[120px]">
                      <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-1">
                        <span>{row.dev}%</span>
                        <span>LIMIT</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-sm overflow-hidden">
                        <div
                          className={`h-full ${row.dev > 20 ? "bg-[#FF2E00]" : "bg-black"}`}
                          style={{ width: `${Math.min(row.dev * 3, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <PaymentBadge status={row.pay} />
                  </td>
                  <td className="p-4">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="p-4 text-center">
                    <Link href={`/plot/${row.id}`}>
                      <button className="px-4 py-2 border border-black font-orbitron font-bold text-[10px] uppercase hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0px_#ccc] active:translate-y-0.5 active:shadow-none">
                        View Case
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
