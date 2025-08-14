import React from "react";
import "./AboutUs.css";
import img1 from "../../pictures/clay-elliot-HfMCgqOLTyM-unsplash.jpg";
import { motion } from "framer-motion";

import Nav from "../../topnav/mainnav/nav"

function AboutUs() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="about-us">
      <Nav/>
      <section className="about-hero">
        <div className="hero-overlay">
          <h1>About SMN Constructions</h1>
          <p>Building the Future, One Project at a Time</p>
        </div>
      </section>

      <section className="about-content">
        <div className="company-overview">
          <h2>Who We Are</h2>
          <p>
            MSN Constructions (Pvt) Ltd is a leading construction management company based in Sri Lanka, with over 20 years of experience in delivering high-quality infrastructure projects. We specialize in hydropower, building construction, and irrigation systems, ensuring sustainable and innovative solutions for our clients.
          </p>
          <div className="overview-image">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Construction Team"
            />
          </div>
        </div>

        <div className="team-section">
          <h2>Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Team Member 1"
              />
              <h3>John Doe</h3>
              <p>CEO & Founder</p>
            </div>
            <div className="team-member">
              <img src={img1} alt="Team Member 2" />
              <h3>Jane Smith</h3>
              <p>Project Manager</p>
            </div>
            <div className="team-member">
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Team Member 3"
              />
              <h3>Michael Brown</h3>
              <p>Lead Engineer</p>
            </div>
          </div>
        </div>

        <div className="journey-section">
          <h2>Our Journey</h2>
          <div className="journey-timeline">
            <div className="journey-card">
              <div className="journey-icon">
                <i className="fas fa-building"></i>
              </div>
              <div className="journey-content">
                <h3>2003</h3>
                <p>Founded MSN Constructions in Colombo, Sri Lanka.</p>
              </div>
            </div>
            <div className="journey-card">
              <div className="journey-icon">
                <i className="fas fa-water"></i>
              </div>
              <div className="journey-content">
                <h3>2010</h3>
                <p>Completed our first major hydropower project in Uganda.</p>
              </div>
            </div>
            <div className="journey-card">
              <div className="journey-icon">
                <i className="fas fa-home"></i>
              </div>
              <div className="journey-content">
                <h3>2015</h3>
                <p>Expanded operations to Seychelles, building luxury villas.</p>
              </div>
            </div>
            <div className="journey-card">
              <div className="journey-icon">
                <i className="fas fa-award"></i>
              </div>
              <div className="journey-content">
                <h3>2025</h3>
                <p>Recognized as a leader in sustainable construction in South Asia.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="footer-content">
          <motion.div className="footer-section" variants={fadeInUp}>
            <h3>About Us</h3>
            <p>
              Building isn’t just a job. At The Construction Company, it is our
              passion. With every project we undertake, we set out to ensure
              complete satisfaction.
            </p>
          </motion.div>
          <motion.div className="footer-section" variants={fadeInUp}>
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
          <motion.div className="footer-section" variants={fadeInUp}>
            <h3>Contact Info</h3>
            <p>Address: 1340 Shrewsbury Parkway, Srilanka</p>
            <p>Phone: +1 717-999-9999</p>
            <p>Email: SMN@construction.com</p>
            <div className="social-icons">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://plus.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </motion.div>
        </div>
        <motion.p className="footer-copyright" variants={fadeInUp}>
          © {new Date().getFullYear()} SMN Constructions. All rights reserved.
        </motion.p>
      </footer>
    </div>
  );
}

export default AboutUs;