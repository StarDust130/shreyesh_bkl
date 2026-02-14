"use client";
import { useMemo } from "react";
import Map, { Source, Layer } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import Link from "next/link";
import {
  AlertTriangle,
  Layers,
  Wind,
  Coins,
  Maximize2,
  Satellite,
  Download,
  AlertOctagon,
  ArrowUpRight,
} from "lucide-react";
import {
  DASHBOARD_STATS,
  MAP_DATA,
  RISK_LIST,
  RECENT_VIOLATIONS,
} from "@/data/mockData";

// --- STAT CARD ---
const StatCard = ({ title, value, sub, icon: Icon, color = "black" }: any) => (
  <div className="bg-white border-2 border-black p-5 relative hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000] transition-all duration-300 group">
    <div className="flex justify-between items-start mb-3">
      <h3 className="font-rajdhani font-bold text-gray-500 uppercase tracking-widest text-xs">
        {title}
      </h3>
      <div
        className={`p-2 ${color === "red" ? "bg-red-100 text-[#FF2E00]" : "bg-gray-100 text-black"} clip-path-slant`}
      >
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <div
      className={`font-orbitron font-black text-4xl ${color === "red" ? "text-[#FF2E00]" : "text-black"}`}
    >
      {value}
    </div>
    <div className="text-xs font-bold mt-2 text-gray-500 font-rajdhani">
      {sub}
    </div>
  </div>
);

export default function Dashboard() {
  // 🌍 MAP VIEW: Zoomed out to show Durg to Raipur
  const initialViewState = {
    longitude: 81.35, // Central point between Durg and Raipur
    latitude: 21.22,
    zoom: 9.5, // Adjusted to show all 10 scattered plots
  };

  const layerStyle = useMemo(
    () =>
      ({
        id: "plots-fill",
        type: "fill",
        paint: {
          "fill-color": [
            "case",
            [">=", ["get", "risk_score"], 80],
            "#FF2E00",
            [">=", ["get", "risk_score"], 50],
            "#FACC15",
            "#22C55E",
          ],
          "fill-opacity": 0.7,
          "fill-outline-color": "#000000",
        },
      }) as const,
    [],
  );

  return (
    <div className="space-y-8 pb-10">
      {/* METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Encroachment"
          value={DASHBOARD_STATS.encroachment_alerts}
          sub="Alerts Active"
          icon={AlertOctagon}
          color="red"
        />
        <StatCard
          title="Hoarding"
          value={DASHBOARD_STATS.hoarding_cases}
          sub="Penalty Cases"
          icon={Layers}
        />
        <StatCard
          title="Avg. AQI"
          value={DASHBOARD_STATS.avg_aqi}
          sub="Air Quality"
          icon={Wind}
        />
        <StatCard
          title="Incentives"
          value={DASHBOARD_STATS.incentives_distributed}
          sub="Distributed"
          icon={Coins}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
        {/* MAP */}
        <div className="lg:col-span-2 bg-black border-4 border-black relative overflow-hidden group shadow-xl">
          <div className="w-full h-full bg-gray-900 relative">
            <Map
              initialViewState={initialViewState}
              mapStyle={{
                version: 8,
                sources: {
                  "satellite-tiles": {
                    type: "raster",
                    tiles: [
                      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                    ],
                    tileSize: 256,
                  },
                },
                layers: [
                  {
                    id: "satellite-layer",
                    type: "raster",
                    source: "satellite-tiles",
                  },
                ],
              }}
              interactive={false}
              attributionControl={false}
            >
              <Source id="plots-data" type="geojson" data={MAP_DATA as any}>
                <Layer {...layerStyle} />
              </Source>
            </Map>
            <Link href="/map" className="absolute top-4 right-4 z-10">
              <button className="bg-white/90 backdrop-blur text-black p-3 border-2 border-black hover:bg-[#FF2E00] hover:text-white transition-colors shadow-lg">
                <Maximize2 className="w-5 h-5" />
              </button>
            </Link>
            <div className="absolute bottom-6 left-6 bg-black text-white px-4 py-2 border-l-4 border-[#FF2E00] z-10">
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Live Satellite Feed
              </div>
              <div className="text-sm font-bold font-orbitron">
                CHHATTISGARH BELT
              </div>
            </div>
          </div>
        </div>

        {/* ALERTS */}
        <div className="bg-white border-2 border-black flex flex-col shadow-lg">
          <div className="p-5 border-b-2 border-black bg-gray-50 flex justify-between items-center">
            <div>
              <h2 className="font-orbitron font-bold text-lg uppercase">
                Priority Alerts
              </h2>
            </div>
            <span className="text-[10px] font-bold bg-[#FF2E00] text-white px-2 py-0.5 rounded">
              LIVE
            </span>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {RISK_LIST.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-4 border-b border-gray-100 hover:bg-red-50 cursor-pointer group transition-colors"
              >
                <div>
                  <div className="font-bold text-sm group-hover:text-[#FF2E00] transition-colors">
                    {item.owner}
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase font-bold">
                    {item.reason}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`font-black font-orbitron text-xl ${item.risk === "Critical" ? "text-[#FF2E00]" : "text-orange-500"}`}
                  >
                    92
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
        <div className="p-5 border-b-2 border-black bg-gray-50 flex justify-between items-center">
          <h2 className="font-orbitron font-bold text-lg uppercase">
            Compliance Log
          </h2>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:border-black text-xs font-bold uppercase transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-rajdhani font-medium">
            <thead className="bg-black text-white uppercase tracking-wider text-xs font-orbitron">
              <tr>
                <th className="p-4">Entity</th>
                <th className="p-4">Issue</th>
                <th className="p-4">Severity</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {RECENT_VIOLATIONS.map((row, i) => (
                <tr key={i} className="hover:bg-red-50/30 transition-colors">
                  <td className="p-4 font-bold">{row.owner}</td>
                  <td className="p-4">
                    <span className="bg-gray-100 px-2 py-1 text-xs font-bold uppercase">
                      {row.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <div
                      className={`h-2 w-16 rounded-full ${row.severity === "High" ? "bg-[#FF2E00]" : "bg-yellow-500"}`}
                    ></div>
                  </td>
                  <td className="p-4">
                    <button className="text-[10px] font-bold border border-black px-3 py-1 hover:bg-black hover:text-white transition-colors">
                      INSPECT
                    </button>
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
