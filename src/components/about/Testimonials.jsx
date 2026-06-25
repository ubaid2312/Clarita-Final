import React, { useState, useEffect, useRef } from 'react';

function Testimonials({ reviews = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef(null);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (reviews.length > 0 ? (prev + 1) % reviews.length : 0));
    }, 5000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  useEffect(() => {
    if (reviews.length > 0) {
      startAutoplay();
    }
    return stopAutoplay;
  }, [reviews]);

  if (!reviews || reviews.length === 0) return null;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    startAutoplay();
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
    startAutoplay();
  };

  const getInitials = (fullName) => {
    const parts = fullName.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  return (
    <section className="testimonials" id="reviews" onMouseEnter={stopAutoplay} onMouseLeave={startAutoplay}>
      <div className="section-container">
        <div className="section-header">
          <p className="section-title-cursive">What people say</p>
          <h2 className="section-title">Customer Reviews</h2>
        </div>
        
        <div className="testimonials-carousel-wrapper">
          <button className="carousel-control-btn prev" onClick={handlePrev} aria-label="Previous review">
            ‹
          </button>
          
          <div className="testimonial-carousel-track-wrapper">
            <div 
              className="testimonial-carousel-track" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {reviews.map((review, idx) => (
                <div 
                  className={`testimonial-slide ${idx === activeIndex ? 'active' : ''}`} 
                  key={idx}
                >
                  <div className="testimonial-card">
                    <div>
                      <div className="stars">
                        {Array.from({ length: 5 }).map((_, sIdx) => (
                          <span
                            key={sIdx}
                            className="star-icon"
                            style={{ color: sIdx < review.rating ? '#c8f135' : 'rgba(255,255,255,0.1)' }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="testimonial-quote">"{review.quote}"</p>
                    </div>
                    <div className="testimonial-author">
                      {review.avatar ? (
                        <img src={review.avatar} alt={review.name} className="author-avatar" />
                      ) : (
                        <div className="author-avatar-initials">
                          {getInitials(review.name)}
                        </div>
                      )}
                      <div className="author-info">
                        <span className="author-name">{review.name}</span>
                        <span className="author-title">{review.title || "Guest"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button className="carousel-control-btn next" onClick={handleNext} aria-label="Next review">
            ›
          </button>
        </div>
        
        <div className="carousel-indicators">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              className={`indicator-dot ${idx === activeIndex ? 'active' : ''}`}
              onClick={() => {
                setActiveIndex(idx);
                startAutoplay();
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
