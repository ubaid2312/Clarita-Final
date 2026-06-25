export default function CategoryTab({ image, icon, label, isActive, href, onClick }) {
  const handleClick = (e) => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <a href={href} className={`tab ${isActive ? "tab-active" : ""}`} onClick={handleClick}>
      <img src={image} alt={label} />
      <div className="tab-icon">{icon}</div>
      <span>{label}</span>
    </a>
  );
}
