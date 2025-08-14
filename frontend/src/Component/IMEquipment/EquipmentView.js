import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../topnav/IM/Header";
import Footer from "../bottomnav/IM/Footer";
import EquipmentTable from "./EquipmentTable";
import background from '../pictures/stock.jpg'

const URL = "http://localhost:5000/Equipments";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    console.log("Fetched Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching equipments:", error);
    return { equipments: [] };
  }
};

function EquipmentView() {
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setEquipments(data.equipments));
  }, []);

  return (
    <div>
      <Header />
      <div style={{
                    backgroundImage: `url(${background})`, // <-- Path to your image
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh'
                  }}>
      <EquipmentTable equipments={equipments} setEquipments={setEquipments} />
      </div>
      <Footer />
    </div>
  );
}

export default EquipmentView;
