import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from '../topnav/IM/Header';
import Footer from '../bottomnav/IM/Footer';
import background from '../pictures/stock.jpg'

const URL = "http://localhost:5000/Equipments";

function UpdateEquipment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState({
    Ename:"",
    EType:"",
    Qty:"",
    Remarks:"",
    Date:"",
    Supplier:"",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get(`${URL}/${id}`);
        if (response.data && response.data.equipment) {
          setEquipment(response.data.equipment);
        } else {
          throw new Error("Equipment not found");
        }
      } catch (err) {
        setError("Failed to fetch equipment");
      } finally {
        setLoading(false);
      }
    };
    fetchEquipment();
  }, [id]);

  const handleChange = (e) => {
    setEquipment({ ...equipment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${URL}/${id}`, equipment);
      alert("Equipment updated successfully!");
      navigate("/EquipmentView");
    } catch (err) {
      alert("Error updating equipments: " + err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <Header/>
      <div style={{
                    backgroundImage: `url(${background})`, // <-- Path to your image
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh'
                  }}>
        <div className="container my-5">
      <div className="bg-white p-4 shadow rounded-lg border border-gray-300" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 className="text-center text-success mb-4">update Equipment</h2>

        <form onSubmit={handleSubmit}>
          {/* Material Name */}
          <div className="mb-3">
            <label htmlFor="itemName" className="form-label">Equipment:</label>
            <input
              type="text"
              id="itemName"
              name="Ename"
              value={equipment.Ename}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter equipment name (and number for machines)"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="etype" className="form-label">Equipment type:</label>
            <select
              id="etype"
              name="EType"
              value={equipment.EType}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select equipment type</option>
              <option value="vehicle">vehicle</option>
              <option value="machine">machine</option>
              <option value="other">other</option>
            </select>
          </div>

            
            {/* Quantity */}
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">Quantity</label>
            <input
              type="text"
              id="quantity"
              name="Qty"
              value={equipment.Qty}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter quantity"
            />
          </div>

          {/* Remarks */}
          <div className="mb-3">
            <label htmlFor="remarks" className="form-label">Remarks</label>
            <textarea
              id="remarks"
              name="Remarks"
              value={equipment.Remarks}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter any remarks"
            ></textarea>
          </div>

          {/* Date */}
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date</label>
            <input
              type="date"
              id="date"
              name="Date"
              value={equipment.Date}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* Supplier */}
          <div className="mb-3">
            <label htmlFor="supplier" className="form-label">Supplier(for rented equipments)</label>
            <select
              id="supplier"
              name="Supplier"
              value={equipment.Supplier}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select Supplier</option>
              <option value="Supplier A">Supplier A</option>
              <option value="Supplier B">Supplier B</option>
              <option value="Supplier C">Supplier C</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
          <button
              type="submit"
              className="btn btn-success w-100 mt-3"
            >
              update
            </button>

          </div>
        </form>
        </div>
      </div>
      </div>
      <Footer/>
    </div>
    
  );
}

export default UpdateEquipment;