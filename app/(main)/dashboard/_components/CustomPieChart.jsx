"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = {
  INCOME: "#34d399",   // Tailwind green-400
  EXPENSE: "#f87171",  // Tailwind red-400
};

const CustomPieChart = ({ data, title }) => {
  return (
    <div className="bg-[#151419] rounded-2xl p-4 shadow-md w-full max-w-md">
      <h2 className="text-white text-sm mb-4 font-semibold text-center">{title}</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={50}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.type] || "#8884d8"}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomPieChart;
