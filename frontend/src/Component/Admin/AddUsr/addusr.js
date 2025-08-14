
import React, { useState, useEffect } from "react";
import Nav from "../../topnav/mainnav/nav";
import "./adduser.css";
import { useNavigate } from "react-router-dom";
import AdNav from "../NavAdmin/NavAdmin";
import axios from "axios";
import {
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from "@mui/material";
import { motion } from "framer-motion";

function AddUsr() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    userid: "",
    name: "",
    email: "",
    age: "",
    address: "",
    userrole: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    age: "",
    address: "",
    userrole: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [idPrefix, setIdPrefix] = useState("");

  const userRoles = [
    { value: "admin", label: "Admin", prefix: "AD" },
    { value: "client", label: "Client", prefix: "CL" },
    { value: "sitesupervisor", label: "Site Supervisor", prefix: "SS" },
    { value: "projectManager", label: "Project Manager", prefix: "PM" },
    { value: "quantitysurveyor", label: "Quantity Surveyor", prefix: "QS" },
    { value: "inventorymanager", label: "Inventory Manager", prefix: "IM" },
    { value: "financeofficer", label: "Finance Officer", prefix: "FO" },
    { value: "supplier", label: "Supplier", prefix: "SP" }
  ];

  useEffect(() => {
    if (inputs.userrole) {
      const role = userRoles.find(r => r.value === inputs.userrole);
      if (role) {
        setIdPrefix(role.prefix);
        setInputs(prev => ({
          ...prev,
          userid: `${role.prefix}${Math.floor(100 + Math.random() * 900)}`
        }));
      }
    }
  }, [inputs.userrole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });

    // Clear error for the field being edited
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateInputs = () => {
    const newErrors = {
      name: "",
      email: "",
      age: "",
      address: "",
      userrole: "",
      password: "",
    };
    let isValid = true;

    // Name validation: letters and spaces only, 2-50 characters
    if (!inputs.name.match(/^[a-zA-Z\s]{2,50}$/)) {
      newErrors.name = "Name must be 2-50 characters and contain only letters and spaces.";
      isValid = false;
    }

    // Email validation: valid email format
    if (!inputs.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Age validation: number between 18 and 100
    const ageNum = Number(inputs.age);
    if (!inputs.age || isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
      newErrors.age = "Age must be a number between 18 and 100.";
      isValid = false;
    }

    // Address validation: 5-100 characters
    if (!inputs.address || inputs.address.length < 5 || inputs.address.length > 100) {
      newErrors.address = "Address must be 5-100 characters long.";
      isValid = false;
    }

    // User Role validation: must be selected
    if (!inputs.userrole) {
      newErrors.userrole = "Please select a user role.";
      isValid = false;
    }

    // Password validation: 8+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    if (
      !inputs.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
      )
    ) {
      newErrors.password =
        "Password must be at least 8 characters, including uppercases, lowercases, numbers, and special characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate inputs before submission
    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/users", {
        ...inputs,
        age: Number(inputs.age),
      });
      navigate("/userdetails");
    } catch (err) {
      setError(err.response?.data?.message || "Error adding user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <AdNav />
      <div className="add-user-form">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Paper elevation={6} className="form-container">
            <Typography variant="h5" className="form-title">
              Add New User
            </Typography>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="user-form">
              <div className="form-row">
                <div className="form-group">
                  <FormControl fullWidth className="input-field" error={!!errors.userrole}>
                    <InputLabel>User Role *</InputLabel>
                    <Select
                      name="userrole"
                      value={inputs.userrole}
                      onChange={handleChange}
                      required
                    >
                      {userRoles.map((role) => (
                        <MenuItem key={role.value} value={role.value}>
                          {role.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errors.userrole || "Select the user's role"}</FormHelperText>
                  </FormControl>
                </div>
                <div className="form-group">
                  <TextField
                    label="User ID"
                    name="userid"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    value={inputs.userid}
                    required
                    className="input-field"
                    helperText={`Format: ${idPrefix}001 (e.g., AD001 for Admin)`}
                    disabled={!!inputs.userrole}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <TextField
                    label="Name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    value={inputs.name}
                    required
                    className="input-field"
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    value={inputs.email}
                    required
                    className="input-field"
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <TextField
                    label="Age"
                    name="age"
                    type="number"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    value={inputs.age}
                    required
                    className="input-field"
                    inputProps={{ min: 18, max: 100 }}
                    error={!!errors.age}
                    helperText={errors.age}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    label="Address"
                    name="address"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    value={inputs.address}
                    required
                    className="input-field"
                    error={!!errors.address}
                    helperText={errors.address}
                  />
                </div>
              </div>

              <div className="form-group password-group">
                <TextField
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  value={inputs.password}
                  required
                  className="input-field"
                  error={!!errors.password}
                  helperText={errors.password}
                />
                <div className="password-input-container">
                  <span
                    className="password-toggle-icon"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#555"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#555"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    )}
                  </span>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  variant="contained"
                  className="submit-btn"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                </Button>
              </motion.div>
            </form>
          </Paper>
        </motion.div>
      </div>
    </div>
  );
}

export default AddUsr;
