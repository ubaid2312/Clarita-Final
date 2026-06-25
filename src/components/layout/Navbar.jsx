import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { useCart } from "../cart/CartContext";
import { CartIcon } from "../common/Icons";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = [
    { name: "Home", href: "/", num: "01", desc: "Back to starting page" },
    { name: "About Us", href: "/about", num: "02", desc: "Our story & vision" },
    { name: "Our Menu", href: "/#burgers", num: "03", desc: "Burgers, Pizzas, Sandwiches & Fries" },
    { name: "Reviews", href: "/about#reviews", num: "04", desc: "What our happy customers say" },
    { name: "Contact", href: "/about#contact", num: "05", desc: "Get in touch or find us" },
  ];

  const handleLinkClick = (e, item) => {
    setIsOpen(false);
    
    // Parse target path and hash
    const hashIndex = item.href.indexOf("#");
    const targetPath = hashIndex !== -1 ? item.href.slice(0, hashIndex) : item.href;
    const targetHash = hashIndex !== -1 ? item.href.slice(hashIndex + 1) : "";
    
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
        navigate(item.href);
      }
    } else if (item.href.startsWith("/")) {
      e.preventDefault();
      navigate(item.href);
    }
  };

  return (
    <>
      <nav className={`navbar-header ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-logo">
          <img src={logo} alt="Clarita Logo" />
          <span className="navbar-logo-text">Clarita</span>
        </div>

        <div className="navbar-actions">
          <button 
            className="navbar-cart-btn" 
            onClick={() => setIsCartOpen(true)} 
            aria-label="Open Cart"
          >
            <CartIcon size={20} color="#0a2015" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          <button 
            className={`navbar-toggle-btn ${isOpen ? "active" : ""}`} 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Toggle Navigation"
          >
            <div className="hamburger-box">
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Modern Overlay Menu */}
      <div className={`navbar-overlay ${isOpen ? "active" : ""}`}>
        <div className="navbar-overlay-inner">
          <div className="navbar-links-section">
            <span className="section-label">Navigation</span>
            <div className="navbar-links-list">
              {links.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item)}
                  className="navbar-link-item"
                  style={{ "--item-index": index }}
                >
                  <span className="link-number">{item.num}</span>
                  <div className="link-text-group">
                    <span className="link-name">{item.name}</span>
                    <span className="link-desc">{item.desc}</span>
                  </div>
                  <span className="link-arrow">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
