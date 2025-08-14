import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import pic4 from '../pictures/pic4.jpg'; // Make sure the path is correct

function UpdateProgress() {
  const { id } = useParams();
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
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/progress/${id}`);
        const data = response.data.user;
        setInputs({
          Project_ID: data.Project_ID,
          Project_Name: data.Project_Name,
          Description: data.Description,
          Duration: data.Duration,
          Date: data.Date.slice(0, 10),
          Status: data.Status,
          Completion_Percentage: data.Completion_Percentage || "",
        });
        setCurrentImage(data.Image);
      } catch (error) {
        console.error('Error fetching progress data:', error);
        alert('Failed to load progress data');
      }
    };

    fetchProgressData();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Project_ID", inputs.Project_ID);
    formData.append("Project_Name", inputs.Project_Name);
    formData.append("Description", inputs.Description);
    formData.append("Duration", inputs.Duration);
    formData.append("Date", inputs.Date);
    formData.append("Status", inputs.Status);
    formData.append("Completion_Percentage", inputs.Completion_Percentage);
    if (imageFile) {
      formData.append("Image", imageFile);
    }

    try {
      await axios.put(`http://localhost:5000/progress/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Progress record successfully updated!");
      navigate("/UserTableView");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to update progress record.");
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        backgroundImage: `url(${pic4})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}
    >
      <div className="bg-white p-4 shadow rounded-lg border border-gray-300" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 className="text-center text-primary mb-4">Update Progress Record</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="Project_ID" className="form-label">Project ID</label>
            <input type="text" id="Project_ID" name="Project_ID" value={inputs.Project_ID} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label htmlFor="Project_Name" className="form-label">Project Name</label>
            <input type="text" id="Project_Name" name="Project_Name" value={inputs.Project_Name} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label htmlFor="Description" className="form-label">Description</label>
            <input type="text" id="Description" name="Description" value={inputs.Description} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label htmlFor="Duration" className="form-label">Duration</label>
            <input type="text" id="Duration" name="Duration" value={inputs.Duration} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label htmlFor="Date" className="form-label">Date</label>
            <input type="date" id="Date" name="Date" value={inputs.Date} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <label htmlFor="Status" className="form-label">Status</label>
            <select id="Status" name="Status" value={inputs.Status} onChange={handleChange} className="form-select" required>
              <option value="">Select Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="on progress">On Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="Completion_Percentage" className="form-label">
              Completion Percentage (%)
            </label>
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
              placeholder="Enter a value between 0 and 100"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Image" className="form-label">Upload New Image (optional)</label>
            <input type="file" id="Image" name="Image" accept=".png,.jpg,.jpeg" onChange={handleImageChange} className="form-control" />
            {currentImage && (
              <div className="mt-2">
                <label>Current Image:</label>
                <br />
                <img src={`http://localhost:5000/uploads/${currentImage}`} alt="Current" style={{ width: "100px", height: "auto", borderRadius: "8px" }} />
              </div>
            )}
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary w-100 mt-3">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProgress;
