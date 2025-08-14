import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../topnav/mainnav/nav";
import "./Home.css";
import img7 from "../pictures/7.jpg";
import img8 from "../pictures/8.jpg";
import img9 from "../pictures/9.jpg";
import img10 from "../pictures/10.jpg";

function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const slideIn = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
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

  // Background images for hero section slideshow
  const heroImages = [
    "https://img.freepik.com/free-photo/mumbai-skyline-skyscrapers-construction_469504-21.jpg?ga=GA1.1.2059794472.1741674835&semt=ais_hybrid&w=740",
    "https://img.freepik.com/free-photo/construction-silhouette_1150-8336.jpg?ga=GA1.1.2059794472.1741674835&semt=ais_hybrid&w=740",
    "https://thumbs.dreamstime.com/b/three-construction-workers-sitting-concrete-site-discussing-building-plans-119766226.jpg",
    "https://img.freepik.com/free-photo/construction-silhouette_1127-3246.jpg?ga=GA1.1.2059794472.1741674835&semt=ais_hybrid&w=740",
    "https://img.freepik.com/free-photo/construction-works-frankfurt-downtown-germany_1268-20907.jpg?t=st=1743324328~exp=1743327928~hmac=13ba209d70263ca751fdbb41d480f733e78046c258613ece057697c003024fb2&w=1800",
    "https://img.freepik.com/free-photo/civil-engineer-construction-worker-architects-wearing-hardhats-safety-vests-are-working-together-construction-site-building-home-cooperation-teamwork-concept_640221-172.jpg?ga=GA1.1.2059794472.1741674835&semt=ais_hybrid&w=740",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://img.freepik.com/free-photo/excavator-action_1112-1598.jpg?ga=GA1.1.2059794472.1741674835&semt=ais_hybrid&w=740",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://img.freepik.com/premium-photo/traffic-road-with-construction-site-background_1048944-6859679.jpg?uid=R200044510&ga=GA1.1.1424527440.1714456547&w=740"
    
  ];

  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  // Slideshow effect for hero section
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Counter state for Awesome Facts
  const [projectsCount, setProjectsCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [workersCount, setWorkersCount] = useState(0);
  const factsRef = useRef(null);

  // Animate counters when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const animateCounter = (setCount, target, duration) => {
            let start = 0;
            const increment = target / (duration / 50);
            const timer = setInterval(() => {
              start += increment;
              if (start >= target) {
                setCount(target);
                clearInterval(timer);
              } else {
                setCount(Math.ceil(start));
              }
            }, 80);
          };

          animateCounter(setProjectsCount, 750, 3700);
          animateCounter(setClientsCount, 600, 3700);
          animateCounter(setWorkersCount, 420, 3700);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (factsRef.current) observer.observe(factsRef.current);

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: "Don Paulson",
      company: "Architectural Co.",
      quote:
        "Your efficient planning, management, and supervision resulted in timely completion with high professionalism.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Jane Smith",
      company: "Seychelles Resorts",
      quote:
        "The villas and swimming pool project in Mahe was executed flawlessly. MSN Constructions exceeded our expectations!",
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
  ];

  const partners = [
    {
      name: "Invest Property",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/L%26T.png/220px-L%26T.png",
    },
    {
      name: "Company Name 1",
      logo: "https://expo.idb.gov.lk/wp-content/uploads/2024/05/melwan.jpg",
    },
    {
      name: "Company Name 2",
      logo: "https://seeklogo.com/images/H/holcim-logo-AFFFDBEAE5-seeklogo.com.png",
    },
    {
      name: "The Capital Real Estate",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1ixJ37LOd5WIqCL4R7bn9sA83vn-pBkL_Vw&s",
    },
    {
      name: "Open House Real Estate",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/96/Ultratech_Cement_Logo.svg/800px-Ultratech_Cement_Logo.svg.png",
    },
    {
      name: "Luxury Market",
      logo: "https://api.environdec.com/api/v1/Companies/81d3e627-02c8-4137-eb7a-08d98fec21cd/logotype",
    },
  ];

  // Projects data with name and location
  const projects = [
    {
      name: "Skyline Towers",
      location: "Colombo, Sri Lanka",
      image:
        "https://media.istockphoto.com/id/1696781145/photo/modern-building-in-the-city-with-blue-sky.jpg?s=612x612&w=0&k=20&c=POfayTyDe06tGX4CeJgS8-fb896MUC46dl3ZbHXBqN4=",
    },
    {
      name: "Oceanfront Villas",
      location: "Galle, Sri Lanka",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "City Center Plaza",
      location: "Kandy, Sri Lanka",
      image:
        "https://c4.wallpaperflare.com/wallpaper/709/869/184/city-street-sun-wallpaper-preview.jpg",
    },
    {
      name: "Harbor Residences",
      location: "Trincomalee, Sri Lanka",
      image:
        "https://w0.peakpx.com/wallpaper/813/746/HD-wallpaper-3d-architectural-rendering-of-residential-buildings.jpg",
    },
    {
      name: "Mountain Retreat",
      location: "Nuwara Eliya, Sri Lanka",
      image:
        "https://danpal.com/wp-content/uploads/2015/12/FacadeCommercial_and_Retail16mmMix_of_ColorsFrance_Gallery.jpg",
    },
    {
      name: "Eco Village",
      location: "Dambulla, Sri Lanka",
      image:
        "https://www.phipps.conservatory.org/assets/images/as_art_image/water.jpg",
    },
    {
      name: "Urban Hub",
      location: "Negombo, Sri Lanka",
      image:
        "https://img.freepik.com/free-photo/aerial-shot-aria-hotel-las-vegas_181624-42881.jpg",
    },
    {
      name: "Lakeside Apartments",
      location: "Ratnapura, Sri Lanka",
      image:
        "https://media.istockphoto.com/id/187363337/photo/modern-hotel-building-in-summer.jpg?s=612x612&w=0&k=20&c=eRVDcadZTKs5t2K-CEeXT6DiJQ68Fnbs6u9F-0S_v8Q=",
    },
    {
      name: "Industrial Park",
      location: "Matara, Sri Lanka",
      image:
        "https://img.freepik.com/free-photo/industrial-area_1127-2889.jpg?t=st=1743329512~exp=1743333112~hmac=9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a&w=1480",
    },
  ];

  return (
    <div className="home-page">
      <Nav/>
      {/* Hero Section with Slideshow */}
      <section className="hero">
        <AnimatePresence>
          <motion.div
            key={currentHeroImage}
            className="hero-background"
            style={{ backgroundImage: `url(${heroImages[currentHeroImage]})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
        <div className="hero-overlay"></div>
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <motion.h1 variants={zoomIn}>Building Your Dreams</motion.h1>
          <motion.p variants={fadeInUp}>
            Our experience ensures that your projects will be done right and
            with the utmost professionalism.
          </motion.p>
          <motion.a href="/mainhome" className="cta-button" variants={fadeInUp}>
            Learn More
          </motion.a>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>Welcome to SMN Constructions</h2>
        <p>
          SMN Construction (Pvt) Ltd is a leading construction company in Sri
          Lanka, specializing in infrastructure development, hydropower
          projects, and innovative construction solutions.
        </p>
      </section>

      {/* How We Build Section */}
      <section className="how-we-build" id="services">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2>How We Build</h2>
          <div className="how-we-build-grid">
            <div className="col-left">
              <motion.div
                className="image-box left clearfix"
                variants={slideIn}
              >
                <div className="image-wrap">
                  <img src={img7} alt="Construction Manager" />
                </div>
                <div className="content-wrap">
                  <h3 className="dd-title">
                    <a href="/">Construction Manager</a>
                  </h3>
                  <p>
                    Nullam ornare odio eu lacus tincidunt malesuada. Sed eu
                    vestibulum elit. Curabitur tortor mi, eleifend ornare.
                  </p>
                  <div className="dd-link">
                    <a href="/">READ MORE</a>
                  </div>
                </div>
              </motion.div>

              <div
                className="wprt-spacer"
                data-desktop="30"
                data-mobi="20"
                data-smobi="20"
              ></div>

              <motion.div
                className="image-box left clearfix"
                variants={slideIn}
              >
                <div className="image-wrap">
                  <img src={img9} alt="Safety is Key" />
                </div>
                <div className="content-wrap">
                  <h3 className="dd-title">
                    <a href="/">Safety is Key</a>
                  </h3>
                  <p>
                    Nullam ornare odio eu lacus tincidunt malesuada. Sed eu
                    vestibulum elit. Curabitur tortor mi, eleifend ornare.
                  </p>
                  <div className="dd-link">
                    <a href="/">READ MORE</a>
                  </div>
                </div>
              </motion.div>

              <div
                className="wprt-spacer"
                data-desktop="0"
                data-mobi="20"
                data-smobi="20"
              ></div>
            </div>

            <div className="col-right">
              <motion.div
                className="image-box left clearfix"
                variants={slideIn}
              >
                <div className="image-wrap">
                  <img src={img8} alt="Design and Build" />
                </div>
                <div className="content-wrap">
                  <h3 className="dd-title">
                    <a href="/">Design and Build</a>
                  </h3>
                  <p>
                    Nullam ornare odio eu lacus tincidunt malesuada. Sed eu
                    vestibulum elit. Curabitur tortor mi, eleifend ornare.
                  </p>
                  <div className="dd-link">
                    <a href="/">READ MORE</a>
                  </div>
                </div>
              </motion.div>

              <div
                className="wprt-spacer"
                data-desktop="30"
                data-mobi="20"
                data-smobi="20"
              ></div>

              <motion.div
                className="image-box left clearfix"
                variants={slideIn}
              >
                <div className="image-wrap">
                  <img src={img10} alt="Sustainable Construction" />
                </div>
                <div className="content-wrap">
                  <h3 className="dd-title">
                    <a href="/">Sustainable Construction</a>
                  </h3>
                  <p>
                    Nullam ornare odio eu lacus tincidunt malesuada. Sed eu
                    vestibulum elit. Curabitur tortor mi, eleifend ornare.
                  </p>
                  <div className="dd-link">
                    <a href="/">READ MORE</a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Work Section */}
      <section className="featured-work" id="projects">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2>Featured Work</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="project-item"
                variants={zoomIn}
              >
                <img src={project.image} alt={project.name} />
                <div className="project-overlay">
                  <h3>{project.name}</h3>
                  <p>{project.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Updated What We Offer Section */}
      <section className="what-we-offer">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2>What We Offer</h2>
          <div className="offer-grid">
            <motion.div className="offer-item" variants={zoomIn}>
              <img
                src="https://media.istockphoto.com/id/1696781145/photo/modern-building-in-the-city-with-blue-sky.jpg?s=612x612&w=0&k=20&c=POfayTyDe06tGX4CeJgS8-fb896MUC46dl3ZbHXBqN4="
                alt="Residential Buildings"
              />
              <h3>Residential Buildings</h3>
              <p>
                We construct high-quality residential buildings, from luxury
                homes to apartment complexes, tailored to your vision.
              </p>
            </motion.div>
            <motion.div className="offer-item" variants={zoomIn}>
              <img
                src="https://img.freepik.com/free-photo/construction-works-frankfurt-downtown-germany_1268-20907.jpg?t=st=1743324328~exp=1743327928~hmac=13ba209d70263ca751fdbb41d480f733e78046c258613ece057697c003024fb2&w=1800"
                alt="Commercial Buildings"
              />
              <h3>Commercial Buildings</h3>
              <p>
                Our expertise delivers modern commercial structures, including
                offices, retail spaces, and industrial facilities.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Awesome Facts Section */}
      <section className="facts" ref={factsRef}>
        <motion.div
          className="facts-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2>The Construction Company</h2>
          <h3>Awesome Facts</h3>
          <div className="facts-grid">
            <motion.div className="fact-item" variants={zoomIn}>
              <h4 className="counter">{projectsCount}+</h4>
              <p>Projects Completed</p>
            </motion.div>
            <motion.div className="fact-item" variants={zoomIn}>
              <h4 className="counter">{clientsCount}+</h4>
              <p>Satisfied Clients</p>
            </motion.div>
            <motion.div className="fact-item" variants={zoomIn}>
              <h4 className="counter">{workersCount}+</h4>
              <p>Workers Employed</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us and About Us Section */}
      <section className="why-choose-about">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="why-choose-about-grid">
            <div className="why-choose-section">
              <h2>Why Choose Us?</h2>
              <div className="why-choose-grid">
                <motion.div className="why-item" variants={slideIn}>
                  <h3>We have 30+ years in the building industry</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    a metus pellentesque.
                  </p>
                </motion.div>
                <motion.div className="why-item" variants={slideIn}>
                  <h3>Quality construction continues after the project</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    a metus pellentesque.
                  </p>
                </motion.div>
                <motion.div className="why-item" variants={slideIn}>
                  <h3>We use technology to do the job more quickly</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    a metus pellentesque.
                  </p>
                </motion.div>
                <motion.div className="why-item" variants={slideIn}>
                  <h3>Employees are continually trained on safety issues</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    a metus pellentesque.
                  </p>
                </motion.div>
              </div>
            </div>
            <div className="about-section">
              <h2>About Us</h2>
              <p>
                Building isn’t just a job. At The Construction Company, it is
                our passion. With every project we undertake, we set out to
                ensure complete satisfaction for our clients.
              </p>
              <div className="about-images">
                <motion.img
                  src="https://themes247.net/html5/construction-template/demo/assets/img/gallery/1.jpg"
                  alt="About 1"
                  variants={zoomIn}
                />
                <motion.img
                  src="https://themes247.net/html5/construction-template/demo/assets/img/gallery/2.jpg"
                  alt="About 2"
                  variants={zoomIn}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials and Partners Section */}
      <section className="testimonials-partners">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="testimonials-partners-grid">
            <div className="partners-section">
              <h2>Our Partners</h2>
              <div className="partners-grid">
                {partners.map((partner, index) => (
                  <motion.div
                    key={index}
                    className="partner-item"
                    variants={zoomIn}
                  >
                    <img src={partner.logo} alt={partner.name} />
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="testimonials-section">
              <h2>Testimonials</h2>
              <div className="testimonials-grid">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className="testimonial-item"
                    variants={slideIn}
                  >
                    <p className="quote">"{testimonial.quote}"</p>
                    <div className="author">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="author-image"
                      />
                      <div className="author-info">
                        <h4>{testimonial.name}</h4>
                        <p>{testimonial.company}</p>
                      </div>
                      <div className="rating">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer Section */}
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

export default Home;
