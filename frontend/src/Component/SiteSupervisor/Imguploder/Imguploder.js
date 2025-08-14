import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import Footer from "../../bottomnav/foter";
import { Form, Container, Button, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

function Imguploder() {
  const [image, setImage] = useState(null);
  const [allImage, setAllImage] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const submitImg = async (e) => {
    e.preventDefault();
    if (!image) {
      setUploadError("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setIsUploading(true);
      const response = await axios.post(
        "http://localhost:5000/uploadImg",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      
      if (response.data.status === "ok") {
        setUploadError(null);
        getImage();
      } else {
        setUploadError("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError("Failed to upload image. Check console for details.");
    } finally {
      setIsUploading(false);
    }
  };

  const getImage = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getImage");
      if (response.data.status === "ok") {
        setAllImage(response.data.data);
      } else {
        console.error("Error fetching images:", response.data.error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const deleteImage = async (id, imageName) => {
    if (!window.confirm("Are you sure you want to delete this image?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5000/deleteImage/${id}`
      );
      
      if (response.data.status === "ok") {
        setDeleteStatus({ success: true, message: "Image deleted successfully" });
        setTimeout(() => setDeleteStatus(null), 3000); // Clear message after 3 seconds
        getImage(); // Refresh the image list
      } else {
        setDeleteStatus({ success: false, message: response.data.message || "Deletion failed" });
      }
    } catch (error) {
      console.error("Delete error:", error);
      setDeleteStatus({ 
        success: false, 
        message: error.response?.data?.message || "Failed to delete image" 
      });
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div>
      <Navbar />
      <Container className="mt-2">
        <h1 className="text-center mb-4">Image Uploader</h1>
        
        {/* Upload Form */}
        <Card className="mb-4">
          <Card.Body>
            <Form onSubmit={submitImg}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Choose an image to upload</Form.Label>
                <Form.Control 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setUploadError(null);
                  }}
                  required
                />
              </Form.Group>
              
              <Button 
                variant="primary" 
                type="submit" 
                disabled={isUploading}
                className="me-2"
              >
                {isUploading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="ms-2">Uploading...</span>
                  </>
                ) : 'Upload'}
              </Button>
            </Form>
          </Card.Body>
        </Card>

        {/* Status Messages */}
        {uploadError && (
          <Alert variant="danger" className="mt-3">
            {uploadError}
          </Alert>
        )}
        {deleteStatus && (
          <Alert variant={deleteStatus.success ? "success" : "danger"} className="mt-3">
            {deleteStatus.message}
          </Alert>
        )}

        {/* Image Gallery */}
        <h2 className="mb-3">Your Images</h2>
        {allImage.length > 0 ? (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {allImage.map((data) => (
              <Col key={data._id}>
                <Card style={{ position: "relative" }}>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5000/files/${data.Image}`}
                    alt={`Uploaded ${data.Image}`}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.src = "fallback-image-url";
                    }}
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0,
                    }}
                    onClick={() => deleteImage(data._id, data.Image)}
                    title="Delete image"
                  >
                    ×
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Alert variant="info">No images uploaded yet.</Alert>
        )}
      </Container>

      <Footer />
    </div>
  );
}

export default Imguploder;