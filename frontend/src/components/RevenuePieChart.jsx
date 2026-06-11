import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Paper, Typography } from "@mui/material";

const data = [
  { name: "Electronics", value: 45 },
  { name: "Fashion", value: 25 },
  { name: "Grocery", value: 15 },
  { name: "Accessories", value: 15 },
];

const COLORS = [
  "#00E5FF",
  "#7C4DFF",
  "#22C55E",
  "#F59E0B",
];

function RevenuePieChart() {
  return (
    <Paper
      sx={{
        p: 3,
        mt: 4,
        backgroundColor: "#111827",
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 2 }}
      >
        Revenue Distribution 💰
      </Typography>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={120}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default RevenuePieChart;