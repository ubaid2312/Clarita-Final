import Brand from "./Brand.jsx";
import Navigation from "./Navigation.jsx";
import Policies from "./Policies.jsx";
import Links from "./Links.jsx";
import Bottom from "./Bottom.jsx";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <Brand />
        <Navigation />
        <Links />
        <Policies />
      </div>
      <Bottom />
    </footer>
  );
}
