import React from 'react';
import foodImg from '../../assets/why_choose_us_food.png';
import shruggingImg from '../../assets/shrugging_person.png';

function WhyChooseUs() {
  const claritaBenefits = [
    "Based on goals & biometrics",
    "Measured to the gram",
    "Ready meals, daily delivery",
    "Pause or edit anytime",
    "Daily delivery",
    "Satisfaction guarantee"
  ];

  const otherDrawbacks = [
    "Generic or fixed plans",
    "Rough estimates",
    "Cook or assemble yourself",
    "Fixed weekly plans",
    "Weekly delivery",
    "No satisfaction guarantee"
  ];

  return (
    <section className="why-choose-us" id="why-choose-us">
      <div className="section-container">
        <div className="section-header-comparison">
          <h2 className="comparison-main-title">WHY CHOOSE US</h2>
          <span className="comparison-sub-cursive">Over Others?</span>
        </div>

        <div className="comparison-grid">
          {/* Clarita Card */}
          <div className="comparison-card clarita-card">
            <div className="clarita-card-inner">
              <div className="clarita-image-side">
                <img src={foodImg} alt="Clarita fresh food bowl prep" className="clarita-food-img" />
              </div>
              <div className="clarita-info-side">
                <div className="clarita-brand-header">
                  <span className="brand-fresh">FRESH</span>
                  <span className="brand-fitness">FITNESS</span>
                  <span className="brand-food">FOOD</span>
                </div>
                
                <ul className="benefit-list">
                  {claritaBenefits.map((benefit, idx) => (
                    <li key={idx} className="benefit-item">
                      <span className="icon-check-circle">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      <span className="benefit-text">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <button className="cta-button-neon" onClick={() => window.location.href = '#contact'}>
                  Create My Personal Plan
                </button>
              </div>
            </div>
          </div>

          {/* Other Brands Card */}
          <div className="comparison-card others-card">
            <div className="others-card-inner">
              <h3 className="others-brand-title">OTHER BRANDS</h3>
              
              <ul className="drawback-list">
                {otherDrawbacks.map((drawback, idx) => (
                  <li key={idx} className="drawback-item">
                    <span className="icon-cross-circle">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </span>
                    <span className="drawback-text">{drawback}</span>
                  </li>
                ))}
              </ul>

              <div className="others-illustration-container">
                <img src={shruggingImg} alt="Shrugging confused customer" className="others-shrugging-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;

