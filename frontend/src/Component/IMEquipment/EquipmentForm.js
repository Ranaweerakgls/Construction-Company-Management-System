import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function EquipmentForm() {
  const [inputs, setInputs] = useState({
    Ename: "",
    EType: "",
    Qty: "",
    Remarks: "",
    Date: "",
    Supplier: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => {
      toast.success("✅ Equipment successfully added!");
      setInputs({
        Ename: "",
        EType: "",
        Qty: "",
        Remarks: "",
        Date: "",
        Supplier: "",
      });
    });
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/Equipments", {
      Ename: String(inputs.Ename),
      EType: String(inputs.EType),
      Qty: String(inputs.Qty),
      Remarks: String(inputs.Remarks),
      Date: new Date(inputs.Date).toISOString(),
      Supplier: String(inputs.Supplier),
    });
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3" style={{ position: 'relative' }}>
      {/* Background Image */}
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="row g-4 align-items-start">
          {/* Form Section */}
          <div className="col-md-8">
            <div className="card shadow-lg border-0 rounded-4 p-4 w-100">
              <h2 className="text-center mb-4" style={{ color: '#0056b3' }}>
                <i className="bi bi-tools me-2"></i> Add New Equipment
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3 form-floating">
                  <input
                    type="text"
                    id="itemName"
                    name="Ename"
                    value={inputs.Ename}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Equipment Name"
                  />
                  <label htmlFor="itemName">Equipment Name</label>
                </div>

                <div className="mb-3">
                  <label htmlFor="etype" className="form-label">Equipment Type</label>
                  <select
                    id="etype"
                    name="EType"
                    value={inputs.EType}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select equipment type</option>
                    <option value="vehicle">Vehicle</option>
                    <option value="machine">Machine</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-3 form-floating">
                  <input
                    type="text"
                    id="quantity"
                    name="Qty"
                    value={inputs.Qty}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Quantity"
                  />
                  <label htmlFor="quantity">Quantity</label>
                </div>

                <div className="mb-3">
                  <label htmlFor="remarks" className="form-label">Remarks</label>
                  <textarea
                    id="remarks"
                    name="Remarks"
                    value={inputs.Remarks}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter any remarks"
                    rows={3}
                  ></textarea>
                </div>

                <div className="mb-3 form-floating">
                  <input
                    type="date"
                    id="date"
                    name="Date"
                    value={inputs.Date}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Date"
                  />
                  <label htmlFor="date">Date</label>
                </div>

                <div className="mb-3">
                  <label htmlFor="supplier" className="form-label">Supplier (for rented equipment)</label>
                  <select
                    id="supplier"
                    name="Supplier"
                    value={inputs.Supplier}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select Supplier</option>
                    <option value="Supplier A">Supplier A</option>
                    <option value="Supplier B">Supplier B</option>
                    <option value="Supplier C">Supplier C</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn w-100 shadow mt-3"
                  style={{ backgroundColor: '#0056b3', color: 'white', border: 'none' }}
                >
                  <i className="bi bi-save me-2"></i> Add Equipment
                </button>
              </form>
            </div>
          </div>

          {/* Right-Side Navigation Cards */}
          <div className="col-md-4 d-flex flex-column align-items-center gap-4" style={{ marginTop: '200px' }}>
            <div
              className="card text-white text-center shadow"
              style={{
                backgroundColor: '#003c80',
                height: '100px',
                width: '90%',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '1rem'
              }}
              onClick={() => window.location.href = "/EquipmentView"}
            >
              <i className="bi bi-wrench-adjustable" style={{ fontSize: '2.5rem' }}></i>
              <h5 className="mt-2" style={{ fontSize: '0.9rem' }}> view added equipment in inventory?</h5>
            </div>

            <div
              className="card text-white text-center shadow"
              style={{
                backgroundColor: '#007bff',
                height: '100px',
                width: '90%',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '1rem'
              }}
              onClick={() => window.location.href = "/Orders"}
            >
              <i className="bi bi-truck" style={{ fontSize: '2.5rem' }}></i>
              <h5 className="mt-2" style={{ fontSize: '0.9rem' }}> place more orders?</h5>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default EquipmentForm;
