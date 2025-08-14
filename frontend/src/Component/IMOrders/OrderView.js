import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../topnav/IM/Header";
import Footer from "../bottomnav/IM/Footer";
import OrderTable from "./OrderTable";
import background from '../pictures/stock.jpg';

const URL = "http://localhost:5000/Orders";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    console.log("Fetched Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching equipments:", error);
    return { orders: [] };
  }
};

function OrderView() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchHandler().then((data) => setOrders(data.orders));
  }, []);

  // Filtered orders based on search
  const filteredOrders = orders.filter(order =>
    order.Itemname.toLowerCase().includes(search.toLowerCase()) ||
    order.Otype.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header />

      <div style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingTop: "20px",
        paddingBottom: "30px"
      }}>
        <div className="text-center mt-3 mb-2">
          <h1 style={{ color: "#003366", fontSize: "2.2em" }}>Your placed orders</h1>
        </div>

        <div className="text-center mb-3">
          <p style={{ fontSize: "1em", color: "#333" }}>
            You can edit or cancel your order within 30 minutes after placing it.
            If time has exceeded, please contact the supplier.
          </p>
        </div>

        {/* 🔍 Styled Search Bar */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "25px" }}>
          <input
            type="text"
            placeholder="🔍 Search order"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "12px",
              width: "30%",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
              outline: "none"
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <OrderTable orders={filteredOrders} setOrders={setOrders} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OrderView;
