export default function HeroBanner({ title, subtitle, image }) {
  return (
    <div className="hero-banner">
      <div className="hero-text">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="hero-image">
        <img src={image} alt={title} />
      </div>
    </div>
  );
}
