import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import pic4 from '../pictures/pic4.jpg';

function ProgressForm() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    Project_ID: "",
    Project_Name: "",
    Description: "",
    Duration: "",
    Date: "",
    Status: "",
    Completion_Percentage: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const sendRequest = async () => {
    const formData = new FormData();

    Object.keys(inputs).forEach(key => {
      formData.append(key, inputs[key]);
    });

    if (imageFile) {
      formData.append("Image", imageFile);
    }

    await axios.post("http://localhost:5000/progress/users", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendRequest();
      alert('Progress record successfully added!');
      navigate('/progress');
    } catch (error) {
      console.error("Error submitting data:", error);
      alert('Failed to add progress record.');
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${pic4})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '2rem',
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-light p-4 rounded shadow"
        style={{ maxWidth: '500px', width: '100%', opacity: 0.95 }}
      >
        <h2 className="text-center text-primary mb-4">Add New Progress Record</h2>

        <div className="mb-3">
          <label htmlFor="Project_ID" className="form-label">Project ID</label>
          <input
            type="text"
            id="Project_ID"
            name="Project_ID"
            value={inputs.Project_ID}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Project_Name" className="form-label">Project Name</label>
          <input
            type="text"
            id="Project_Name"
            name="Project_Name"
            value={inputs.Project_Name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Description" className="form-label">Description</label>
          <input
            type="text"
            id="Description"
            name="Description"
            value={inputs.Description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Duration" className="form-label">Duration</label>
          <input
            type="text"
            id="Duration"
            name="Duration"
            value={inputs.Duration}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Date" className="form-label">Date</label>
          <input
            type="date"
            id="Date"
            name="Date"
            value={inputs.Date}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Status" className="form-label">Status</label>
          <select
            id="Status"
            name="Status"
            value={inputs.Status}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="on progress">On Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="Completion_Percentage" className="form-label">Completion Percentage (%)</label>
          <input
            type="number"
            id="Completion_Percentage"
            name="Completion_Percentage"
            value={inputs.Completion_Percentage}
            onChange={handleChange}
            className="form-control"
            required
            min="0"
            max="100"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Image" className="form-label">Attach Image</label>
          <input
            type="file"
            id="Image"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            className="form-control"
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100 mt-3">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ProgressForm;
