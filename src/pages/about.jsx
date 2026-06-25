import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from "../components/layout/Navbar";
import AboutHero from "../components/about/AboutHero";
import WhyChooseUs from "../components/about/WhyChooseUs";
import OurChefs from "../components/about/OurChefs";
import Testimonials from "../components/about/Testimonials";
import Footer from "../components/footer/Footer";

import review1 from '../assets/Review1.jpg';
import review2 from '../assets/Review2.jpg';
import review3 from '../assets/Review3.jpg';

import { sendContactEmail } from '../utils/emailService';

import '../styles/about.css';
import '../styles/navbar.css';

const DEFAULT_REVIEWS = [
  {
    name: "Zainab Ali",
    title: "Food Critic",
    rating: 5,
    quote: "Clarita's burgers are an absolute game changer! The attention to detail, flavor profiles, and the softness of their artisanal buns is unmatched. Truly a gourmet experience.",
    avatar: review1,
    date: "June 20, 2026"
  },
  {
    name: "Hamza Sheikh",
    title: "Local Guide",
    rating: 5,
    quote: "I've tried almost everything on the menu, and they never disappoint. The delivery is extremely fast, and the packaging keeps the food fresh, warm, and crispy!",
    avatar: review2,
    date: "June 18, 2026"
  },
  {
    name: "Sana Malik",
    title: "Verified Customer",
    rating: 5,
    quote: "The quality of the ingredients is evident from the first bite. The custom sauces complement the meals perfectly. Easily the best premium dining in town!",
    avatar: review3,
    date: "June 15, 2026"
  }
];

function About() {
  const location = useLocation();

  // Reviews states
  const [reviews, setReviews] = useState(() => {
    const stored = localStorage.getItem('clarita_reviews');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return DEFAULT_REVIEWS;
      }
    }
    localStorage.setItem('clarita_reviews', JSON.stringify(DEFAULT_REVIEWS));
    return DEFAULT_REVIEWS;
  });
  const [revName, setRevName] = useState('');
  const [revRating, setRevRating] = useState(5);
  const [revQuote, setRevQuote] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Contact form states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactError, setContactError] = useState('');

  // Scroll to section based on URL hash
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 250); // Slightly larger timeout to ensure page layout is settled
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!revName.trim() || !revQuote.trim()) return;

    const newReview = {
      name: revName.trim(),
      title: "Verified Guest",
      rating: revRating,
      quote: revQuote.trim(),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      avatar: null // Displays initials
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('clarita_reviews', JSON.stringify(updated));

    // Reset Form
    setRevName('');
    setRevRating(5);
    setRevQuote('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactSubject.trim() || !contactMessage.trim()) return;

    setIsSending(true);
    setContactError('');

    const contactData = {
      name: contactName.trim(),
      email: contactEmail.trim(),
      subject: contactSubject.trim(),
      message: contactMessage.trim()
    };

    const result = await sendContactEmail(contactData);

    setIsSending(false);
    if (result.success) {
      // Reset contact form
      setContactName('');
      setContactEmail('');
      setContactSubject('');
      setContactMessage('');
      setShowContactModal(true);
    } else {
      setContactError(result.error || 'Failed to send message. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <AboutHero />
      <WhyChooseUs />
      <OurChefs />
      <Testimonials reviews={reviews} />

      {/* Write a Review Section */}
      <section className="about-reviews-section">
        <div className="section-container">
          <div className="about-reviews-grid">
            <div className="about-reviews-info">
              <p className="section-title-cursive">Share your flavor story</p>
              <h2 className="section-title">Leave a Review</h2>
              <p className="about-reviews-desc">
                Your culinary experience is what drives us to perfect our recipes daily. Tell us what you loved about our burgers, pizzas, or secret signature sauces!
              </p>
            </div>
            
            <div className="about-reviews-form-card">
              {reviewSubmitted ? (
                <div className="review-success-msg">
                  <span className="success-emoji">🎉</span>
                  <h3>Thank you for your feedback!</h3>
                  <p>Your review has been successfully posted and added to our customer slide.</p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit}>
                  <div className="star-rating-selector">
                    <span className="star-label">Your Rating</span>
                    <div className="stars-row">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={`star-select-btn ${(hoverRating || revRating) >= star ? 'active' : ''}`}
                          onClick={() => setRevRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          aria-label={`Rate ${star} Stars`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="rev-name">Full Name</label>
                    <input
                      id="rev-name"
                      type="text"
                      placeholder="e.g. Zainab Ali"
                      value={revName}
                      onChange={(e) => setRevName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="rev-quote">Your Review</label>
                    <textarea
                      id="rev-quote"
                      rows="3"
                      placeholder="What did you order and how was the taste?..."
                      value={revQuote}
                      onChange={(e) => setRevQuote(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="submit-btn-primary">
                    Submit Review
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="about-contact-section" id="contact">
        <div className="section-container">
          <div className="section-header">
            <p className="section-title-cursive">Have any questions?</p>
            <h2 className="section-title">Get In Touch</h2>
          </div>

          <div className="about-contact-grid">
            {/* Contact Details Cards */}
            <div className="about-contact-info">
              <div className="info-card">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div className="info-text">
                  <h3>Our Location</h3>
                  <p>123 Gourmet Street, Food District, Karachi, Pakistan</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div className="info-text">
                  <h3>Phone Number</h3>
                  <p>+92 300 1234567</p>
                  <p>+92 21 34567890</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div className="info-text">
                  <h3>Email Address</h3>
                  <p>hello@clarita.com</p>
                  <p>support@clarita.com</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                </div>
                <div className="info-text">
                  <h3>Business Hours</h3>
                  <p>Mon - Sun: 12:00 PM - 02:00 AM</p>
                </div>
              </div>
            </div>

            {/* Interactive Contact Form */}
            <div className="about-contact-form-card">
              <h3>Send Us A Message</h3>
              <p>We usually reply to inquiries within 2 hours.</p>

              {contactError && (
                <div style={{ color: '#ff4d4d', marginBottom: '15px', fontFamily: 'Outfit, sans-serif', fontSize: '0.9rem' }}>
                  ⚠️ {contactError}
                </div>
              )}

              <form onSubmit={handleContactSubmit}>
                <div className="contact-inputs-row">
                  <div className="form-group">
                    <label htmlFor="contact-name">Full Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="e.g. John Doe"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email">Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="e.g. john@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="Subject of your message..."
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    rows="4"
                    placeholder="Write details of your message..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn-primary" disabled={isSending}>
                  {isSending ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showContactModal && (
        <div className="contact-modal-overlay">
          <div className="contact-modal-box">
            <div className="contact-modal-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
            <h3>Message Sent!</h3>
            <p>
              Thank you for reaching out to Clarita. Your message was emailed to our team successfully. We will get back to you shortly.
            </p>
            <button className="contact-modal-close-btn" onClick={() => setShowContactModal(false)}>
              Okay, Great!
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default About;
