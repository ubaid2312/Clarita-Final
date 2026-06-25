export default function HeroBanner({ title, subtitle, bgImage }) {
  return (
    <div
      className="hero-banner"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="hero-banner-overlay" />
      <div className="hero-banner-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}
