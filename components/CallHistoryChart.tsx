"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", calls: 40 },
  { month: "Feb", calls: 65 },
  { month: "Mar", calls: 50 },
  { month: "Apr", calls: 80 },
  { month: "May", calls: 70 },
  { month: "Jun", calls: 90 },
  { month: "Jul", calls: 60 },
  { month: "Aug", calls: 85 },
  { month: "Sep", calls: 55 },
  { month: "Oct", calls: 95 },
  { month: "Nov", calls: 100 },
  { month: "Dec", calls: 75 },
];

export default function CallHistoryChart() {
  return (
    <div className="w-full  mx-auto p-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg border border-blue-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 p-4" >
        <h2 className="text-xl font-extrabold !text-blue-700"> Call History </h2>
        <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full">
          Jan – Dec
        </span>
      </div>

      {/* Chart */}
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
            <XAxis dataKey="month" tick={{ fill: "#1e3a8a", fontSize: 12 }} />
            <YAxis tick={{ fill: "#1e3a8a", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "12px",
                border: "1px solid #e0e7ff",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              }}
              labelStyle={{ color: "#1e3a8a", fontWeight: 600 }}
              itemStyle={{ color: "#2563eb" }}
            />
            <Line
              type="monotone"
              dataKey="calls"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 6, fill: "#2563eb", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 8, fill: "#1e40af" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
