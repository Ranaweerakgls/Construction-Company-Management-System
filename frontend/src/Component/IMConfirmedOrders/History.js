import React, { useEffect, useState } from "react";
import Header from "../topnav/IM/Header";
import Footer from "../bottomnav/IM/Footer";
import axios from "axios";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";
import { Link } from "react-router-dom";

// URL of the API
const URL = "http://localhost:5000/ConfirmedOrders";

function OrderAnalytics() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [currentMonthData, setCurrentMonthData] = useState([]);

  // Fetch data from the server
  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        const orders = response.data.records || [];
        processMonthlyData(orders);
        filterCurrentMonthData(orders);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  // Process monthly data
  const processMonthlyData = (orders) => {
    const monthlyCount = {};
    orders.forEach((order) => {
      const date = new Date(order.Date);
      const month = date.toLocaleString("default", { month: "short" });
      const year = date.getFullYear();
      const key = `${month} ${year}`;
      monthlyCount[key] = (monthlyCount[key] || 0) + 1;
    });

    setMonthlyData(
      Object.keys(monthlyCount).map((month) => ({ month, orders: monthlyCount[month] }))
    );
  };

  // Filter data for the current month
  const filterCurrentMonthData = (orders) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const dailyCount = {};

    orders.forEach((order) => {
      const date = new Date(order.Date);
      if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
        const day = date.getDate();
        dailyCount[day] = (dailyCount[day] || 0) + 1;
      }
    });

    setCurrentMonthData(
      Object.keys(dailyCount).map((day) => ({ day: `Day ${day}`, orders: dailyCount[day] }))
    );
  };

  return (
    <div>
      <Header />
    
      <div style={styles.container}>
        

        <div style={styles.row}>
          {/* Line Chart - Monthly Orders */}
          <div style={styles.chartCard}>
            <h4 style={styles.chartTitle}>📈 Monthly Order Overview</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="orders" stroke="#007bff" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart - Current Month Orders (Day Wise) */}
          <div style={styles.chartCard}>
            <h4 style={styles.chartTitle}>📊 Daily Orders ({new Date().toLocaleString('default', { month: 'long' })})</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={currentMonthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                {/* Two-tone gradient bar */}
                <Bar dataKey="orders" barSize={40}>
                  <Cell fill="url(#gradient1)" />
                  <Cell fill="url(#gradient2)" />
                </Bar>
                {/* Gradient definitions */}
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0069d9" stopOpacity={1} />
                    <stop offset="100%" stopColor="#007bff" stopOpacity={1} />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#007bff" stopOpacity={1} />
                    <stop offset="100%" stopColor="#0069d9" stopOpacity={1} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    
      <Footer />
    </div>
  );
}

// Refined styling for professional and attractive look, consistent with blue theme
const styles = {
  container: {
    padding: "40px",
    background: "#ffffff", // White background for the container
    minHeight: "100vh",
    fontFamily: "'Roboto', sans-serif", // Modern font
  },
  title: {
    fontSize: "2.4rem", // Larger title for prominence
    fontWeight: "600",
    color: "#0056b3", // Consistent blue theme
    textAlign: "center",
    marginBottom: "30px",
    textShadow: "2px 2px 6px rgba(0, 0, 0, 0.1)",
  },
  row: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
  },
  chartCard: {
    background: "#f8f9fa", // Light gray background for the cards
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
    transition: "0.3s ease-in-out",
    flex: "1",
    maxWidth: "600px",
    minWidth: "300px",
    cursor: "pointer",
    ":hover": {
      boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)", // More pronounced shadow on hover
    },
  },
  chartTitle: {
    fontSize: "1.6rem", // Increased font size for titles
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: "20px",
  },
};

export default OrderAnalytics;
