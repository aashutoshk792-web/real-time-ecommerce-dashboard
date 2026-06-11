import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const salesData = [
  { day: "Mon", sales: 4000 },
  { day: "Tue", sales: 3000 },
  { day: "Wed", sales: 5000 },
  { day: "Thu", sales: 4500 },
  { day: "Fri", sales: 6000 },
  { day: "Sat", sales: 7000 },
  { day: "Sun", sales: 6500 },
];

function SalesChart() {
  return (
    <div
      style={{
        marginTop: "30px",
        backgroundColor: "#111827",
        padding: "20px",
        borderRadius: "16px",
        height: "400px",
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: "20px",
        }}
      >
        Weekly Sales Analytics 📈
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="sales"
            stroke="#00E5FF"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;