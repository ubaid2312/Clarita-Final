export default function FoodCard({ image, title, subtitle, description, price, category, onBuyNow }) {
  const handleClick = () => {
    onBuyNow({ image, title, subtitle, description, price, category });
  };

  return (
    <div className="food-card">
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <div className="card-body">
        <h2>
          {title} <br />
          <span className="highlight">{subtitle}</span>
        </h2>
        <p>{description}</p>
        <div className="card-price">${price.toFixed(2)}</div>
        <div className="divider" />
        <button className="buy-now-btn" onClick={handleClick}>Buy Now!</button>
      </div>
    </div>
  );
}
