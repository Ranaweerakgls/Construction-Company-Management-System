import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import background from '../pictures/inventory2.jpg'

function MaterialsForm() {
  const [inputs, setInputs] = useState({
    _id: "",
    Mname: "",
    MID: "",
    Qty: "",
    Remarks: "",
    Date: "",
    Supplier: "",
    pdfFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setInputs((prevState) => ({
      ...prevState,
      [name]: files && files.length > 0 ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => {
      toast.success('✅ Material successfully added!');
      setInputs({
        _id: "",
        Mname: "",
        MID: "",
        Qty: "",
        Remarks: "",
        Date: "",
        Supplier: "",
        pdfFile: null,
      });
    });
  };

  const sendRequest = async () => {
    const formData = new FormData();
    formData.append("Mname", inputs.Mname);
    formData.append("MID", inputs.MID);
    formData.append("Qty", inputs.Qty);
    formData.append("Remarks", inputs.Remarks);
    formData.append("Date", new Date(inputs.Date).toISOString());
    formData.append("Supplier", inputs.Supplier);

    if (inputs.pdfFile) {
      formData.append("pdfFile", inputs.pdfFile);
    }

    await axios.post("http://localhost:5000/Materials", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3" style={{ position: 'relative' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className="row g-4 align-items-start">
          {/* Left - Form Section */}
          <div className="col-md-8">
            <div
              className="card shadow-lg border-0 rounded-4 p-4 w-100"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(5px)",
              }}
            >
              <h2 className="text-center mb-4" style={{ color: '#0056b3' }}>
                <i className="bi bi-plus-square me-2"></i> Add New Material
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3 form-floating">
                    <input
                      type="text"
                      id="itemName"
                      name="Mname"
                      value={inputs.Mname}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Material Name"
                    />
                    <label htmlFor="itemName">Material Name</label>
                  </div>

                  <div className="col-md-6 mb-3 form-floating">
                    <input
                      type="text"
                      id="itemId"
                      name="MID"
                      value={inputs.MID}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Material ID"
                    />
                    <label htmlFor="itemId">Material ID</label>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3 form-floating">
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

                  <div className="col-md-6 mb-3 form-floating">
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

                <div className="mb-3">
                  <label htmlFor="supplier" className="form-label">Supplier</label>
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

                <div className="mb-3">
                  <label htmlFor="pdfFile" className="form-label">Attach File(optional)</label>
                  <input
                    type="file"
                    id="pdfFile"
                    name="pdfFile"
                    onChange={handleChange}
                    className="form-control"
                    accept="application/pdf"
                    placeholder='optional(warranty cards,bills,etc)'
                  />
                </div>

                <button
                  type="submit"
                  className="btn w-100 shadow mt-3"
                  style={{ backgroundColor: '#0056b3', color: 'white', border: 'none' }}
                >
                  <i className="bi bi-save me-2"></i>Add Material
                </button>
              </form>
            </div>
          </div>

          {/* Right - Navigation Cards */}
          <div className="col-md-4 d-flex flex-column align-items-center gap-4" style={{ marginTop: '200px' }}>
            {/* Stock Card */}
            <div
              className="card text-white text-center shadow"
              style={{
                backgroundColor: 'rgba(0, 60, 128, 0.85)',
                height: '100px',
                width: '90%',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '1rem'
              }}
              onClick={() => window.location.href = "/MaterialView"}
            >
              <i className="bi bi-box-seam" style={{ fontSize: '2.5rem' }}></i>
              <h5 className="mt-2" style={{ fontSize: '0.9rem' }}> view added item in inventory?</h5>
            </div>

            {/* Orders Card */}
            <div
              className="card text-white text-center shadow"
              style={{
                backgroundColor: 'rgba(0, 123, 255, 0.85)',
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
              <i className="bi bi-receipt" style={{ fontSize: '2.5rem' }}></i>
              <h5 className="mt-2" style={{ fontSize: '0.9rem' }}> place more orders?</h5>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default MaterialsForm;
