import React, { useState, useRef, useCallback } from "react";
import DealCard from "./DealCard";
import { WrapIcon, BurgerIcon, PizzaIcon, GrillIcon, ComboIcon } from "../common/Icons";
import "../../styles/Deals.css";

import logo from "../../assets/logo.png";
import burger2 from "../../assets/burger2.png";
import pizza1 from "../../assets/pizza1.png";
import sandwich2 from "../../assets/sandwich2.png";
import whyChooseUsFood from "../../assets/why_choose_us_food.png";

const deals = [
  {
    title: "WRAPS HOUSE",
    subtitle: "A Wraps deal for family",
    icon: <WrapIcon size={42} color="#ffffff" />,
    image: sandwich2,
    price: 1600,
    items: ["2 Malai Boti", "2 Bihari Boti", "1 Loaded Fries", "1L Cold Drink"],
  },
  {
    title: "BURGER HOUSE",
    subtitle: "A Burgers deal for family",
    icon: <BurgerIcon size={42} color="#ffffff" />,
    image: burger2,
    price: 1800,
    items: [
      "4 Zinger Burgers",
      "Fries Included",
      "4 Chicken Tenders",
      "American Coleslaw",
      "2L Cold Drink",
    ],
    isPopular: true,
  },
  {
    title: "PIZZA HOUSE",
    subtitle: "A Pizza deal for family",
    icon: <PizzaIcon size={42} color="#ffffff" />,
    image: pizza1,
    price: 2400,
    items: [
      "2 Large Pizza",
      "2 Medium Pizza",
      "1 Pizza Fries",
      "1.5L Cold Drink",
    ],
  },
  {
    title: "GRILL HOUSE",
    subtitle: "A BBQ deal for family",
    icon: <GrillIcon size={42} color="#ffffff" />,
    image: whyChooseUsFood,
    price: 2800,
    items: [
      "4 Grilled Chicken",
      "2 Corn on Cob",
      "1 Garlic Bread",
      "2L Cold Drink",
    ],
  },
  {
    title: "ALL IN ONE HOUSE",
    subtitle: "All in one deal for family",
    icon: <ComboIcon size={42} color="#ffffff" />,
    image: logo,
    price: 3000,
    items: [
      "3 Zinger burgers",
      "2 Large Pizza",
      "2 Loaded Fries",
      "1.5L Cold Drink",
    ],
  },
];

function DealsSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const total = deals.length;

  const goTo = useCallback((idx) => {
    setActiveIndex(idx);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((p) => (p > 0 ? p - 1 : p));
  }, []);

  const next = useCallback(() => {
    setActiveIndex((p) => (p < total - 1 ? p + 1 : p));
  }, [total]);

  // ── Drag / Swipe support ──────────────────────────────────────
  const dragStartX = useRef(null);
  const dragging = useRef(false);
  const THRESHOLD = 50;

  const onDragStart = (clientX) => {
    dragStartX.current = clientX;
    dragging.current = true;
  };

  const onDragEnd = (clientX) => {
    if (!dragging.current) return;
    dragging.current = false;
    const diff = dragStartX.current - clientX;
    if (diff > THRESHOLD) next();
    else if (diff < -THRESHOLD) prev();
  };

  const handleMouseDown  = (e) => onDragStart(e.clientX);
  const handleMouseUp    = (e) => onDragEnd(e.clientX);
  const handleMouseLeave = (e) => { if (dragging.current) onDragEnd(e.clientX); };
  const handleTouchStart = (e) => onDragStart(e.touches[0].clientX);
  const handleTouchEnd   = (e) => onDragEnd(e.changedTouches[0].clientX);

  // Position logic — pure CSS transitions handle the animation
  const getPosition = (index) => {
    if (index === activeIndex) return "center";
    const leftIndex = activeIndex > 0 ? activeIndex - 1 : -1;
    const rightIndex = activeIndex < total - 1 ? activeIndex + 1 : -1;
    if (index === leftIndex) return "left";
    if (index === rightIndex) return "right";
    return "hidden";
  };

  return (
    <section className="deals-section">
      {/* ── Heading ── */}
      <div className="deals-heading-row">
        <span className="deals-heading-line"></span>
        <p className="deals-small-heading">Choose the Deals</p>
        <span className="deals-heading-line"></span>
      </div>
      <h2 className="deals-main-heading">THAT FITS YOU</h2>

      {/* ── Carousel ── */}
      <div className="deals-carousel-wrapper">
        <button 
          className="deals-nav-btn deals-nav-btn--left" 
          onClick={prev} 
          disabled={activeIndex === 0}
          aria-label="Previous"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div
          className="deals-cards-track"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {deals.map((deal, index) => {
            const pos = getPosition(index);
            return (
              <div
                key={index}
                className={`deals-card-slot deals-card-slot--${pos}`}
                onClick={() => pos !== "hidden" && goTo(index)}
              >
                <DealCard
                  {...deal}
                  isCenter={pos === "center"}
                />
              </div>
            );
          })}
        </div>

        <button 
          className="deals-nav-btn deals-nav-btn--right" 
          onClick={next} 
          disabled={activeIndex === total - 1}
          aria-label="Next"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      {/* ── Dots ── */}
      <div className="deals-dots-row">
        {deals.map((_, i) => (
          <button
            key={i}
            className={`deals-dot ${i === activeIndex ? "deals-dot--active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default DealsSection;
