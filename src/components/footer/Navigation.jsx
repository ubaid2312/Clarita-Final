import { useNavigate, useLocation } from "react-router-dom";
import footerData from "./FooterData";

const linkMap = {
  "Home": "/",
  "Products": "/#menu-section",
  "About": "/about",
  "Testimonials": "/about#reviews"
};

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (e, name) => {
    const href = linkMap[name] || "/";
    const hashIndex = href.indexOf("#");
    const targetPath = hashIndex !== -1 ? href.slice(0, hashIndex) : href;
    const targetHash = hashIndex !== -1 ? href.slice(hashIndex + 1) : "";

    if (targetHash) {
      e.preventDefault();
      const currentPath = location.pathname;
      const isSamePage = targetPath === "/" ? (currentPath === "/") : (currentPath === targetPath);

      if (isSamePage) {
        const element = document.getElementById(targetHash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate(href);
      }
    } else {
      e.preventDefault();
      if (location.pathname === targetPath) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate(targetPath);
      }
    }
  };

  return (
    <div className="FooterNavigation">
      <h1>Navigation</h1>
      <hr />
      <ul>
        {footerData.navigation.map((item, idx) => (
          <li key={idx}>
            <a href={linkMap[item] || "/"} onClick={(e) => handleLinkClick(e, item)}>
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
