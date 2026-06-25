import React from "react";
import { useCart } from "../cart/CartContext";

function DealCard({ title, subtitle, items, price, icon, image, isCenter, isPopular }) {
  const { setCheckoutItem, setShowCheckout } = useCart();

  const handleBuyNow = () => {
    setCheckoutItem({
      title,
      subtitle,
      image,
      price,
      category: "DEAL",
      quantity: 1,
      selectedExtrasList: [],
      extras: [],
    });
    setShowCheckout(true);
  };

  return (
    <div className={`deal-card ${isCenter ? "deal-card--center" : "deal-card--side"}`}>
      {isPopular && (
        <div className="most-popular-badge">
          <span>MOST</span>
          <span>POPULAR</span>
          <span className="star">★</span>
        </div>
      )}

      <div className={`deal-food-icon-wrap ${isCenter ? "deal-food-icon-wrap--center" : ""}`}>
        {icon}
      </div>

      <h3 className="deal-card-title">{title}</h3>
      <p className="deal-card-subtitle">{subtitle}</p>

      <ul className="deal-card-items">
        {items.map((item, idx) => (
          <li key={idx} className="deal-card-item">
            <span className="deal-check-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8e63c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </span>
            {item}
          </li>
        ))}
      </ul>

      <div className="deal-dashed-divider"></div>

      <div className="deal-price-pill">Rs.{price}</div>

      <button className="deal-buy-btn" onClick={handleBuyNow}>Buy Now</button>
    </div>
  );
}

export default DealCard;
