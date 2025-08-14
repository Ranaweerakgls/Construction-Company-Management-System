import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Nav from "../topnav/mainnav/nav"
import "./service.css";

function Services() {

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const zoomIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Services data
  const services = [
    {
      title: "Residential Construction",
      description:
        "Building high-quality homes tailored to your needs, from design to completion.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Commercial Construction",
      description:
        "Constructing durable and modern commercial spaces for businesses of all sizes.",
      image:
        "https://media.istockphoto.com/id/1696781145/photo/modern-building-in-the-city-with-blue-sky.jpg?s=612x612&w=0&k=20&c=POfayTyDe06tGX4CeJgS8-fb896MUC46dl3ZbHXBqN4=",
    },
    {
      title: "Infrastructure Development",
      description:
        "Delivering robust infrastructure projects like roads, bridges, and utilities.",
      image:
        "https://img.freepik.com/free-photo/construction-works-frankfurt-downtown-germany_1268-20907.jpg?t=st=1743324328~exp=1743327928~hmac=13ba209d70263ca751fdbb41d480f733e78046c258613ece057697c003024fb2&w=1800",
    },
    {
      title: "Renovation & Remodeling",
      description:
        "Transforming existing spaces with innovative renovation and remodeling solutions.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Sustainable Construction",
      description:
        "Eco-friendly building practices to minimize environmental impact.",
      image:
        "https://www.phipps.conservatory.org/assets/images/as_art_image/water.jpg",
    },
    {
      title: "Project Management",
      description:
        "Expert planning and oversight to ensure projects are completed on time and within budget.",
      image:
        "https://img.freepik.com/free-photo/industrial-area_1127-2889.jpg?t=st=1743329512~exp=1743333112~hmac=9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a&w=1480",
    },
  ];

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="services-page">
      <Nav/>
      {/* Hero Section */}
      <section className="services-hero">
        <div className="hero-overlay"></div>
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1>Our Services</h1>
          <p>
            Delivering excellence in construction across Sri Lanka and beyond.
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="services-section">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2>What We Provide</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="service-card"
                variants={zoomIn}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="service-image">
                  <img src={service.image} alt={service.title} />
                  <div className="service-overlay">
                    <img
                      src={service.icon}
                      alt={`${service.title} icon`}
                      className="service-icon"
                    />
                  </div>
                </div>
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <a href="#" className="service-link">
                    Learn More
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2>Ready to Start Your Project?</h2>
          <p>
            Contact us today to discuss your construction needs and get a quote.
          </p>
          <a href="/contact" className="cta-button">
            Get in Touch
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <motion.div className="footer-section" variants={fadeInUp}>
            <h3>About Us</h3>
            <p>
              Building isn’t just a job. At MSN Constructions, it is our
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
            <p>Address: 1340 Shrewsbury Parkway, Mountain View, CA</p>
            <p>Phone: +1 717-999-9999</p>
            <p>Email: contact@construction.com</p>
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
          © {new Date().getFullYear()} MSN Constructions. All rights reserved.
        </motion.p>
      </footer>
    </div>
  );
}

export default Services;
