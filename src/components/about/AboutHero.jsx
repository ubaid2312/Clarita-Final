import React from 'react';
import { useNavigate } from 'react-router-dom';
import aboutHeroFood from '../../assets/about_hero_food.png';

function AboutHero() {
  const navigate = useNavigate();

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="about-hero-split">
      <div className="about-hero-left">
        <h3 className="about-hero-subtitle">Our Passion & Journey</h3>
        <h1 className="about-hero-title">Gourmet Cravings, Perfected</h1>
        <p className="about-hero-description">
          Clarita started with a simple but ambitious dream: to redefine street food culture by pairing bold, rustic flavors with premium, culinary-grade ingredients. Every dish is a labor of love, crafted to bring you an unforgettable gourmet experience.
        </p>
        <div className="about-hero-actions">
          <button className="btn-hero-solid" onClick={() => navigate('/#burgers')}>
            Explore Menu
          </button>
          <button className="btn-hero-outline" onClick={handleScrollToContact}>
            Let's get in touch
          </button>
        </div>
      </div>
      <div className="about-hero-right">
        <img src={aboutHeroFood} alt="Clarita gourmet burger" className="about-hero-img" />
      </div>
    </section>
  );
}

export default AboutHero;
