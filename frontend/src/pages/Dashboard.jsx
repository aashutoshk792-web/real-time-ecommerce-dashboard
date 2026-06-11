import { Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";
import SalesChart from "../components/SalesChart";
import TopProducts from "../components/TopProducts";
import RecentOrders from "../components/RecentOrders";
import RevenuePieChart from "../components/RevenuePieChart";
import LiveActivity from "../components/LiveActivity";
import LiveEvents from "../components/LiveEvents";

import { dashboardStats } from "../data/dashboardData";

function Dashboard() {
  const [stats, setStats] = useState(dashboardStats);
  const navigate = useNavigate();

  // Check Login
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Live Dashboard Stats
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prevStats) =>
        prevStats.map((item) => {
          if (item.title === "Revenue") {
            return {
              ...item,
              value: `₹${(
                parseInt(item.value.replace(/[₹,]/g, "")) +
                Math.floor(Math.random() * 1000)
              ).toLocaleString()}`,
            };
          }

          if (item.title === "Orders") {
            return {
              ...item,
              value: (
                parseInt(item.value.replace(/,/g, "")) +
                Math.floor(Math.random() * 10)
              ).toLocaleString(),
            };
          }

          if (item.title === "Users") {
            return {
              ...item,
              value: (
                parseInt(item.value.replace(/,/g, "")) +
                Math.floor(Math.random() * 5)
              ).toLocaleString(),
            };
          }

          return item;
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: "bold",
          }}
        >
          Dashboard 🚀
        </Typography>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>

      <Grid container spacing={3}>
        {stats.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <StatCard
              title={item.title}
              value={item.value}
              growth={item.growth}
            />
          </Grid>
        ))}
      </Grid>

      <SalesChart />
      <TopProducts />
      <RecentOrders />
      <RevenuePieChart />
      <LiveEvents />
      <LiveActivity />
    </DashboardLayout>
  );
}

export default Dashboard;