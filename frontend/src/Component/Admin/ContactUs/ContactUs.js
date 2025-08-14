import React, { useState } from "react";
import { motion } from "framer-motion";
import "./ContactUs.css";
import Nav from "../../topnav/mainnav/nav"

// Define animation variants for framer-motion
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function ContactUs() {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // You can add logic here to send the form data to a backend API
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" }); // Reset form
  };

  return (
    <div className="contact-us">
      <Nav/>
      <section className="contact-hero">
        <div className="hero-overlay">
          <h1>Contact Us</h1>
          <p>We’re here to help with your construction management needs.</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="contact-form-container">
          <h2>Get in Touch</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>

        <div className="contact-info">
          <h2>Our Contact Details</h2>
          <p>
            <strong>Address:</strong> 123 Construction Lane, Colombo, Sri Lanka
          </p>
          <p>
            <strong>Phone:</strong> +94 11 234 5678
          </p>
          <p>
            <strong>Email:</strong> info@msnconstructions.com
          </p>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.902979312093!2d79.849684314772!3d6.927079995002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593c4f1c2b5d%3A0x5b9f2a0b7b6e3c4!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1698771234567!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MSN Constructions Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer>
        <div className="footer-content">
          <motion.div className="footer-section" variants={fadeInUp} initial="initial" animate="animate">
            <h3>About Us</h3>
            <p>
              Building isn’t just a job. At The Construction Company, it is our
              passion. With every project we undertake, we set out to ensure
              complete satisfaction.
            </p>
          </motion.div>
          <motion.div className="footer-section" variants={fadeInUp} initial="initial" animate="animate">
            <h3>Company Links</h3>
            <ul>
              <li>
                <a href="#history">History</a>
              </li>
              <li>
                <a href="#team">Team & Awards</a>
              </li>
              <li>
                <a href="#community">Community</a>
              </li>
              <li>
                <a href="#news">News & Events</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
            </ul>
          </motion.div>
          <motion.div className="footer-section" variants={fadeInUp} initial="initial" animate="animate">
            <h3>Contact Info</h3>
            <p>Address: 1340 Shrewsbury Parkway, Srilanka</p>
            <p>Phone: +1 717-999-9999</p>
            <p>Email: SMN@construction.com</p>
            <div className="social-icons">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://plus.google.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </motion.div>
        </div>
        <motion.p className="footer-copyright" variants={fadeInUp} initial="initial" animate="animate">
          © {new Date().getFullYear()} SMN Constructions. All rights reserved.
        </motion.p>
      </footer>
    </div>
  );
}

export default ContactUs;