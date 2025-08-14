
import React from 'react';
import './HelpCenter.css'; // Import the external CSS file
import AdNav from "../NavAdmin/NavAdmin";

function HelpCenter() {
  return (
    <div> 
        <AdNav/>
        <div className="help-center-container">
      {/* Welcome Section */}
      <section className="help-center-welcome">
        <h1 className="help-center-heading">Help & Support Center</h1>
        <p className="help-center-description">
          Welcome to the Admin Dashboard Help Center! Find answers to common questions, get support, or explore resources to make the most of your dashboard.
        </p>
      </section>

      {/* Search Bar (Placeholder) */}
      <section className="help-center-search">
        <input
          type="text"
          placeholder="Search help topics..."
          className="help-center-search-input"
          disabled // Placeholder for now
        />
      </section>

      {/* FAQs Section */}
      <section className="help-center-faq">
        <h2 className="help-center-subheading">Frequently Asked Questions (FAQs)</h2>
        <div className="help-center-faq-list">
          <div className="help-center-faq-item">
            <h3 className="help-center-faq-question">How do I reset a user’s password?</h3>
            <p className="help-center-faq-answer">
              Navigate to the "Password Reset" section, select the user, and follow the prompts to send a reset link. Ensure the user verifies their email first.
            </p>
          </div>
          <div className="help-center-faq-item">
            <h3 className="help-center-faq-question">How can I add a new notification?</h3>
            <p className="help-center-faq-answer">
              Go to the "Notifications" section, click "Add Notification," fill out the form with the required details, and submit. The notification will be sent to the target audience.
            </p>
          </div>
          <div className="help-center-faq-item">
            <h3 className="help-center-faq-question">What should I do if the dashboard is slow?</h3>
            <p className="help-center-faq-answer">
              Try clearing your browser cache, ensuring a stable internet connection, or contacting support if the issue persists.
            </p>
          </div>
          <div className="help-center-faq-item">
            <h3 className="help-center-faq-question">How do I contact support?</h3>
            <p className="help-center-faq-answer">
              You can reach our support team via email at support@dashboard.com or call us at (123) 456-7890. See the Contact Support section below for more details.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="help-center-contact">
        <h2 className="help-center-subheading">Contact Support</h2>
        <p className="help-center-contact-info">
          Need further assistance? Our support team is here to help.
        </p>
        <ul className="help-center-contact-list">
          <li><strong>Email:</strong> <a href="mailto:support@dashboard.com">support@dashboard.com</a></li>
          <li><strong>Phone:</strong> (123) 456-7890</li>
          <li><strong>Hours:</strong> Monday - Friday, 9 AM - 5 PM (EST)</li>
        </ul>
      </section>

      {/* Quick Links Section */}
      <section className="help-center-links">
        <h2 className="help-center-subheading">Quick Links</h2>
        <div className="help-center-links-grid">
          <a href="#" className="help-center-link-card">
            <h3>User Guide</h3>
            <p>Learn how to navigate and use the admin dashboard.</p>
          </a>
          <a href="#" className="help-center-link-card">
            <h3>Tutorials</h3>
            <p>Step-by-step video tutorials for common tasks.</p>
          </a>
          <a href="#" className="help-center-link-card">
            <h3>API Documentation</h3>
            <p>Explore our API for advanced integrations.</p>
          </a>
        </div>
      </section>
    </div>
    </div>
    
  );
}

export default HelpCenter;
