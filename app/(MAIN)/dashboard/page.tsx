import { ArrowUpRight, AlertTriangle, Layers, Activity } from "lucide-react";

// --- Components for Internal Use ---

const StatCard = ({
  title,
  value,
  sub,
  icon: Icon,
  isCurrency = false,
}: any) => (
  <div className="bg-white border-2 border-black p-4 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(255,0,0,1)] transition-all duration-300">
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-rajdhani font-bold text-gray-500 uppercase tracking-widest text-xs">
        {title}
      </h3>
      <Icon className="w-5 h-5 text-black" />
    </div>
    <div className="font-rajdhani font-bold text-3xl">{value}</div>
    {sub && (
      <div className="text-xs font-bold mt-1 flex items-center text-red-600">
        {sub}
        <ArrowUpRight className="w-3 h-3 ml-1" />
      </div>
    )}
    {/* Decorative corner */}
    <div className="absolute top-0 right-0 w-3 h-3 bg-black clip-path-triangle"></div>
  </div>
);

const RiskListItem = ({ id, owner, score }: any) => (
  <div className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-red-50 transition-colors cursor-pointer group">
    <div>
      <div className="text-xs font-rajdhani text-gray-500">#{id}</div>
      <div className="font-bold text-sm group-hover:text-red-600 transition-colors">
        {owner}
      </div>
    </div>
    <div className="flex items-center">
      <div className="font-rajdhani font-bold text-lg text-red-600">
        {score}%
      </div>
      <ArrowUpRight className="w-4 h-4 ml-2 text-gray-400 group-hover:text-red-600" />
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* 4A: Stat Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Plots" value="342" icon={Layers} />
        <StatCard
          title="High Risk"
          value="28"
          sub="+12% vs last month"
          icon={AlertTriangle}
        />
        <StatCard title="Medium Risk" value="56" sub="+5%" icon={Activity} />
        <StatCard
          title="Revenue at Risk"
          value="₹12.7 Cr"
          icon={AlertTriangle}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
        {/* 4B: Main Map Section */}
        <div className="lg:col-span-2 bg-white border-2 border-black p-1 relative overflow-hidden group">
          {/* Map Placeholder UI */}
          <div className="w-full h-full bg-gray-100 flex items-center justify-center relative">
            {/* Grid Lines Pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            ></div>

            {/* Mock Map Element */}
            <div className="text-center z-10">
              <div className="font-rajdhani font-bold text-2xl mb-2">
                MAP VIEW ACTIVE
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">
                Waiting for MapLibre Integration
              </div>
              <button className="mt-4 px-6 py-2 bg-white border-2 border-black font-bold font-rajdhani hover:bg-black hover:text-white transition-colors">
                LOAD SATELLITE DATA
              </button>
            </div>

            {/* Cyber overlay elements */}
            <div className="absolute top-4 left-4 bg-white border border-black px-2 py-1 text-xs font-bold">
              LIVE FEED
            </div>
            <div className="absolute bottom-4 right-4 bg-black text-white px-2 py-1 text-xs font-bold font-rajdhani">
              LAT: 21.25 | LONG: 81.62
            </div>
          </div>
        </div>

        {/* 4C: Right Panel (Risk List) */}
        <div className="bg-white border-2 border-black flex flex-col">
          <div className="p-4 border-b-2 border-black flex justify-between items-center bg-gray-50">
            <h2 className="font-rajdhani font-bold text-lg uppercase">
              Top High Risk Plots
            </h2>
            <span className="text-xs font-bold text-red-600 animate-pulse">
              LIVE
            </span>
          </div>
          <div className="flex-1 overflow-auto">
            <RiskListItem id="135" owner="Sharma Industries" score="82" />
            <RiskListItem id="207" owner="Mehta Corp" score="78" />
            <RiskListItem id="154" owner="Verma Exports" score="75" />
            <RiskListItem id="198" owner="R.K. Enterprises" score="73" />
            <RiskListItem id="220" owner="Patel Construction" score="71" />
            <RiskListItem id="089" owner="Singh Fabrics" score="68" />
            <RiskListItem id="301" owner="Nanda Metals" score="67" />
          </div>
          <div className="p-3 border-t border-black text-center">
            <button className="text-xs font-bold font-rajdhani uppercase hover:text-red-600 tracking-wider">
              View All Risks
            </button>
          </div>
        </div>
      </div>

      {/* 4D: Bottom Table */}
      <div className="bg-white border-2 border-black">
        <div className="p-4 border-b-2 border-black bg-gray-50">
          <h2 className="font-rajdhani font-bold text-lg uppercase">
            Recent Violations
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-inter">
            <thead className="bg-black text-white font-rajdhani uppercase tracking-wider text-xs">
              <tr>
                <th className="p-4">Rank</th>
                <th className="p-4">Plot ID</th>
                <th className="p-4">Owner</th>
                <th className="p-4">Risk Score</th>
                <th className="p-4">Area Deviation</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                {
                  rank: 1,
                  id: "135",
                  owner: "Sharma Industries",
                  score: 82,
                  dev: "25%",
                  status: "Boundary Breach",
                },
                {
                  rank: 2,
                  id: "207",
                  owner: "Mehta Corp",
                  score: 78,
                  dev: "20%",
                  status: "Payment Overdue",
                },
                {
                  rank: 3,
                  id: "154",
                  owner: "Verma Exports",
                  score: 75,
                  dev: "18%",
                  status: "Vacant Land",
                },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 font-medium">
                  <td className="p-4 text-gray-500">#{row.rank}</td>
                  <td className="p-4 font-bold">{row.id}</td>
                  <td className="p-4">{row.owner}</td>
                  <td className="p-4 text-red-600 font-bold">{row.score}%</td>
                  <td className="p-4">
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden max-w-[100px]">
                      <div
                        className="bg-yellow-500 h-full"
                        style={{ width: row.dev }}
                      ></div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="border border-red-200 bg-red-50 text-red-700 px-2 py-1 text-xs font-bold uppercase rounded-sm">
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-xs font-bold underline hover:text-red-600">
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
