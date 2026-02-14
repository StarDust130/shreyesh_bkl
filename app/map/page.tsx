"use client";
import { useState, useMemo, useRef } from "react";
import Map, {
  Source,
  Layer,
  NavigationControl,
  ScaleControl,
  MapRef,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import Link from "next/link";
import {
  ArrowLeft,
  Satellite,
  AlertOctagon,
  Layers,
  Wind,
  Factory,
  Info,
  CheckCircle,
  MapPin,
} from "lucide-react";
import { MAP_DATA } from "@/data/mockData";

// Calculate center of a polygon to fly to it
const getCenter = (coordinates: any) => {
  // Simple approximation for the first point of the first polygon
  return {
    longitude: coordinates[0][0][0][0],
    latitude: coordinates[0][0][0][1],
  };
};

export default function MapPage() {
  const mapRef = useRef<MapRef>(null);
  const [hoverInfo, setHoverInfo] = useState<any>(null);
  const [activeLayer, setActiveLayer] = useState<string>("all");

  const layerStyle = useMemo(() => {
    let filter: any = ["!=", ["get", "risk_score"], -1];
    if (activeLayer === "encroachment")
      filter = [">=", ["get", "risk_score"], 80];
    if (activeLayer === "hoarding")
      filter = [
        "all",
        [">=", ["get", "risk_score"], 50],
        ["<", ["get", "risk_score"], 80],
      ];

    return {
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
        "fill-opacity": 0.6,
        "fill-outline-color": "#000000",
      },
      filter: filter,
    } as const;
  }, [activeLayer]);

  // Function to fly to a specific zone
  const flyToZone = (coordinates: any) => {
    const center = getCenter(coordinates);
    mapRef.current?.flyTo({
      center: [center.longitude, center.latitude],
      zoom: 14.5,
      duration: 2000,
    });
  };

  return (
    <div className="h-screen w-screen bg-gray-100 relative overflow-hidden font-sans">
      {/* 🔙 BACK */}
      <Link href="/dashboard" className="absolute top-6 left-6 z-50">
        <button className="bg-white text-black px-4 py-3 font-orbitron font-bold uppercase border-2 border-black hover:bg-black hover:text-white transition-all shadow-md flex items-center gap-2 text-xs">
          <ArrowLeft className="w-4 h-4" /> Command Center
        </button>
      </Link>

      {/* 🛠️ ZONE NAVIGATOR (Left Side) */}
      <div className="absolute top-24 left-6 z-40 bg-white/95 backdrop-blur border-2 border-black p-4 w-72 shadow-xl max-h-[70vh] overflow-y-auto">
        <h3 className="font-orbitron font-bold text-sm mb-3 border-b-2 border-black pb-2 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#FF2E00]" /> INDUSTRIAL ZONES
        </h3>
        <div className="space-y-2">
          {MAP_DATA.features.map((feature: any, i) => (
            <div
              key={i}
              onClick={() => flyToZone(feature.geometry.coordinates)}
              className="p-3 border border-gray-200 hover:border-black hover:bg-gray-50 cursor-pointer transition-all group"
            >
              <div className="font-bold text-xs text-gray-800 group-hover:text-[#FF2E00]">
                {feature.properties.name}
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-[10px] text-gray-500">
                  {feature.properties.type}
                </span>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 ${
                    feature.properties.risk_score > 80
                      ? "bg-red-100 text-red-600"
                      : feature.properties.risk_score > 50
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                  }`}
                >
                  Risk: {feature.properties.risk_score}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🛠️ FILTER PANEL (Right Side) */}
      <div className="absolute top-6 right-6 z-50 bg-white/95 backdrop-blur border-2 border-black p-4 w-64 shadow-xl">
        <h2 className="font-orbitron font-bold text-sm mb-3 border-b-2 border-black pb-2">
          INTELLIGENCE LAYERS
        </h2>
        <div className="space-y-2">
          {[
            {
              id: "all",
              label: "All Units",
              icon: Layers,
              col: "bg-gray-100 text-gray-600",
            },
            {
              id: "encroachment",
              label: "Encroachment",
              icon: AlertOctagon,
              col: "bg-red-50 text-red-600 border-red-200",
            },
            {
              id: "hoarding",
              label: "Land Hoarding",
              icon: Factory,
              col: "bg-yellow-50 text-yellow-700 border-yellow-200",
            },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveLayer(btn.id)}
              className={`w-full text-left px-3 py-2 border font-bold text-[10px] uppercase flex items-center justify-between transition-all ${
                activeLayer === btn.id
                  ? "border-black bg-black text-white"
                  : `${btn.col} border-transparent hover:border-gray-300`
              }`}
            >
              <span>{btn.label}</span> <btn.icon className="w-3 h-3" />
            </button>
          ))}
        </div>
      </div>

      {/* 🗺️ MAP */}
      <Map
        ref={mapRef}
        initialViewState={{ longitude: 81.35, latitude: 21.22, zoom: 9 }} // Wide view of all CG
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
        onMouseMove={(e) => {
          const feature = e.features?.[0];
          setHoverInfo(
            feature
              ? { x: e.point.x, y: e.point.y, props: feature.properties }
              : null,
          );
        }}
        interactiveLayerIds={["plots-fill"]}
        cursor={hoverInfo ? "pointer" : "default"}
      >
        <Source id="plots-data" type="geojson" data={MAP_DATA as any}>
          <Layer {...layerStyle} />
          <Layer
            id="plots-line"
            type="line"
            paint={{
              "line-color": "#fff",
              "line-width": 1.5,
              "line-opacity": 0.8,
            }}
          />
        </Source>
        <NavigationControl position="bottom-right" showCompass={false} />
        <ScaleControl />

        {/* 🖱️ HOVER TOOLTIP */}
        {hoverInfo && (
          <div
            className="absolute z-10 bg-white p-3 pointer-events-none border-2 border-black shadow-xl min-w-[200px]"
            style={{ left: hoverInfo.x + 15, top: hoverInfo.y + 15 }}
          >
            <div className="font-orbitron font-bold text-xs border-b border-gray-200 pb-1 mb-2 text-gray-500">
              ZONE ID: {hoverInfo.props.plot_code}
            </div>
            <div className="font-bold text-sm mb-1 leading-tight">
              {hoverInfo.props.name}
            </div>
            <div className="text-xs text-gray-500 mb-2">
              {hoverInfo.props.type}
            </div>
            <div
              className={`text-xs font-mono font-bold uppercase mb-2 ${hoverInfo.props.risk_score > 80 ? "text-[#FF2E00]" : "text-green-600"}`}
            >
              {hoverInfo.props.status}
            </div>
            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full ${hoverInfo.props.risk_score > 70 ? "bg-[#FF2E00]" : "bg-[#22C55E]"}`}
                style={{ width: `${hoverInfo.props.risk_score}%` }}
              ></div>
            </div>
          </div>
        )}
      </Map>
    </div>
  );
}
