import { useState } from "react";
import CategoryTab from "./CategoryTab";
import { BurgerIcon, PizzaIcon, SandwichIcon, FriesIcon } from "../common/Icons";

export default function CategoryTabs() {
  const [activeTab, setActiveTab] = useState("burgers");

  const tabs = [
    {
      id: "burgers",
      image: "/assets/double-patty.png",
      icon: <BurgerIcon />,
      label: "BURGERS",
      href: "#burgers",
    },
    {
      id: "pizzas",
      image: "/assets/pepperoni-pizza.png",
      icon: <PizzaIcon />,
      label: "PIZZAS",
      href: "#pizzas",
    },
    {
      id: "sandwiches",
      image: "/assets/club-sandwich.png",
      icon: <SandwichIcon />,
      label: "SANDWICHES",
      href: "#sandwiches",
    },
    {
      id: "fries",
      image: "/assets/classic-fries.png",
      icon: <FriesIcon />,
      label: "FRIES",
      href: "#fries",
    },
  ];

  return (
    <div className="category-tabs">
      {tabs.map((tab) => (
        <CategoryTab
          key={tab.id}
          image={tab.image}
          icon={tab.icon}
          label={tab.label}
          isActive={activeTab === tab.id}
          href={tab.href}
          onClick={() => setActiveTab(tab.id)}
        />
      ))}
    </div>
  );
}
