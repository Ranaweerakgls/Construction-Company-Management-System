import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderSup from "../topnav/Supplier/HeaderSup";
import Footer from "../bottomnav/IM/Footer";
import SupplierOrder from "./SupplierOrder";
import Form from "../IMConfirmedOrders/Form";
import background from '../pictures/stock.jpg';

const URL = "http://localhost:5000/Orders";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    console.log("Fetched Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { orders: [] };
  }
};

function SupplierViewOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setOrders(data.orders));
  }, []);

  return (
    <div>
      <HeaderSup />
      <div style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                paddingTop: "20px",
                paddingBottom: "30px",
              }}>
      <div style={styles.container}>
        <div style={styles.leftSection}>
          <SupplierOrder orders={orders} setOrders={setOrders} />
        </div>
        <div style={styles.rightSection}>
          <Form />
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}

// Inline CSS styles for layout
const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "20px",
  },
  leftSection: {
    flex: 1,
    marginRight: "20px",
  },
  rightSection: {
    flex: 1,
  },
};

export default SupplierViewOrder;
