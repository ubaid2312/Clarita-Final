import { useState } from "react";
import logo from "../assets/logo.png";

function Navbar() {
  let [isOpen, setIsOpen] = useState(false);

  let links = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Foods",
      href: "/food",
    },
    {
      name: "Contact",
      href: "/contact",
    },
    {
      name: "Reviews",
      href: "/reviews",
    },
  ];
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {" "}
          {isOpen ? "✕" : "☰"}{" "}
        </button>
      </nav>

      <div className={isOpen ? "menu active" : "menu"}>
      {links.map((item, index)=> (
        <a
  key={item.name}
  href={item.href}
  style={{ transitionDelay: `${index * 0.15}s` }}
>
  {item.name}
</a>
      ))}
      </div>
    </>
  );
}

export default Navbar;
