import { useEffect, useState } from "react";

import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
} from "@mui/material";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import API from "../services/api";

const COLORS = ["#00e676", "#ff5252"];

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
  const loadData = async () => {
    try {
      const p = await API.get("/products");
      const pay = await API.get("/payments");
      const a = await API.get("/alerts");

      setProducts(p.data);
      setPayments(pay.data);
      setAlerts(a.data);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    }
  };

  // Initial load
  loadData();

  // 🔄 Auto refresh every 5 seconds
  const interval = setInterval(loadData, 5000);

  // Cleanup
  return () => clearInterval(interval);
}, []);


  // 📈 Inventory Trend Data for Line Graph
  const inventoryTrend = products.map((item, index) => ({
    name: item.name || `Item ${index + 1}`,
    stock: item.currentStock || 0,
  }));

  // 💳 Payment Data for Pie Chart
  const paidCount = payments.filter((p) => p.status === "paid").length;
  const pendingCount = payments.filter((p) => p.status !== "paid").length;

  const paymentData = [
    { name: "Paid", value: paidCount },
    { name: "Pending", value: pendingCount },
  ];

  // 🚨 Risk Level Logic
  const riskLevel =
    alerts.length > 3 ? "High" : alerts.length > 1 ? "Medium" : "Low";

  const riskColor =
    riskLevel === "High"
      ? "error"
      : riskLevel === "Medium"
      ? "warning"
      : "success";

  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: 600, textAlign: "center" }}
      >
        Dashboard
      </Typography>

      {/* ===== STAT CARDS ===== */}
      <Grid container spacing={3}>
        {[
          { title: "Products", value: products.length },
          { title: "Payments Pending", value: pendingCount },
          { title: "Active Alerts", value: alerts.length },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                background: "linear-gradient(145deg,#1e293b,#0f172a)",
                color: "#fff",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent>
                <Typography variant="subtitle2" color="gray">
                  {item.title}
                </Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Risk Level Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              borderRadius: 3,
              background: "linear-gradient(145deg,#1e293b,#0f172a)",
              color: "#fff",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              transition: "0.3s",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <CardContent>
              <Typography variant="subtitle2" color="gray">
                Risk Level
              </Typography>

              <Box mt={2}>
                <Chip label={riskLevel} color={riskColor} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ===== CHARTS SECTION ===== */}
      <Grid container spacing={4} sx={{ mt: 4 }}>

        {/* 📈 Inventory Line Graph */}
        <Grid item xs={12} md="auto" sx={{ flex: 5 }}>


          <Card
            sx={{
              borderRadius: 2.5,
              p: 3,
              background: "linear-gradient(145deg,#1e293b,#0f172a)",
              color: "#fff",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              📦 Inventory Trend
            </Typography>

            <ResponsiveContainer width="100%" height={360}>
              <LineChart data={inventoryTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="stock"
                  stroke="#00e676"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* 💳 Payment Pie Chart */}
        <Grid item xs={12} md="auto" sx={{ flex: 7 }}>


          <Card
            sx={{
              borderRadius: 3,
              p: 2.5,
              background: "linear-gradient(145deg,#1e293b,#0f172a)",
              color: "#fff",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ mb: 3 }}>
              💳 Payment Status
            </Typography>

            <ResponsiveContainer width="100%" height={360}>
              <PieChart>
                <Pie
                  data={paymentData}
                  innerRadius={70}
                  outerRadius={130}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {paymentData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
