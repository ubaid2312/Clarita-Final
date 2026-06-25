export default function ViewMoreButton({ expanded, onClick }) {
  return (
    <div className="view-more-container">
      <button className="view-more-btn" onClick={onClick}>
        {expanded ? "View Less" : "View More"}
      </button>
    </div>
  );
}
