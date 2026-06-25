import { useState } from "react";
import CategoryTabs   from "./CategoryTabs";
import HeroBanner     from "../hero/HeroBanner";
import FoodCardList   from "./FoodCardList";
import ViewMoreButton from "./ViewMoreButton";
import OrderModal     from "./OrderModal";

import "../../styles/foodmenu.css";

import burger1 from "../../assets/burger1.png";
import burger2 from "../../assets/burger2.png";
import burger3 from "../../assets/burger3.png";
import burger4 from "../../assets/burger4.png";
import burger5 from "../../assets/burger5.png";
import burger6 from "../../assets/burger6.png";

import pizza1 from "../../assets/pizza1.png";
import pizza2 from "../../assets/pizza2.png";
import pizza3 from "../../assets/pizza3.png";
import pizza4 from "../../assets/pizza4.png";
import pizza5 from "../../assets/pizza5.png";
import pizza6 from "../../assets/pizza6.png";

import fries1 from "../../assets/fries1.png";
import fries2 from "../../assets/fries2.png";
import fries3 from "../../assets/fries3.png";
import fries4 from "../../assets/fries4.png";
import fries5 from "../../assets/fries5.png";
import fries6 from "../../assets/fries6.png";

import sandwich1 from "../../assets/sandwich1.png";
import sandwich2 from "../../assets/sandwich2.png";
import sandwich3 from "../../assets/sandwich3.png";
import sandwich4 from "../../assets/sandwich4.png";
import sandwich5 from "../../assets/sandwich5.png";
import sandwich6 from "../../assets/sandwich6.png";

import burgersHeading from "../../assets/burgers-heading.png";
import pizzaHeading   from "../../assets/pizza-heading.png";
import sandwichHeading from "../../assets/sandwich-heading.png";
import friesHeading   from "../../assets/fries-heading.png";

const burgerItems = [
  { image: burger1, title: "DOUBLE PATTY", subtitle: "BURGER", description: "Best for 1 time meal. You wont get to eat more after eating this.", price: 5.99, category: "BURGER" },
  { image: burger2, title: "CHEESE MELT", subtitle: "BURGER", description: "Loaded with cheddar cheese and our secret sauce. An absolute classic.", price: 6.99, category: "BURGER" },
  { image: burger3, title: "SMOKY BBQ", subtitle: "BURGER", description: "Flame-grilled patty with smoky BBQ glaze and crispy onion rings.", price: 7.49, category: "BURGER" },
  { image: burger4, title: "CLASSIC", subtitle: "BURGER", description: "Simple yet delicious. Beef patty with lettuce, tomato and pickles.", price: 4.99, category: "BURGER" },
  { image: burger5, title: "SPICY JALAPEÑO", subtitle: "BURGER", description: "Fiery jalapeños with pepper jack cheese and chipotle mayo. Not for the faint.", price: 8.99, category: "BURGER" },
  { image: burger6, title: "MUSHROOM SWISS", subtitle: "BURGER", description: "Sautéed mushrooms with melted Swiss cheese on a toasted brioche bun.", price: 6.49, category: "BURGER" },
];

const pizzaItems = [
  { image: pizza1, title: "PEPPERONI", subtitle: "PIZZA", description: "Classic pepperoni loaded on hand-tossed dough with mozzarella cheese.", price: 8.99, category: "PIZZA" },
  { image: pizza2, title: "MARGHERITA", subtitle: "PIZZA", description: "Fresh basil, tomato sauce, and melted mozzarella on a thin crispy crust.", price: 7.99, category: "PIZZA" },
  { image: pizza3, title: "BBQ CHICKEN", subtitle: "PIZZA", description: "Smoky BBQ chicken with red onions, cilantro and gouda cheese blend.", price: 9.49, category: "PIZZA" },
  { image: pizza4, title: "VEGGIE SUPREME", subtitle: "PIZZA", description: "Loaded with bell peppers, olives, mushrooms, onions and fresh tomatoes.", price: 8.49, category: "PIZZA" },
  { image: pizza5, title: "MEAT LOVERS", subtitle: "PIZZA", description: "Pepperoni, sausage, bacon, and ground beef on a thick garlic crust.", price: 10.99, category: "PIZZA" },
  { image: pizza6, title: "HAWAIIAN", subtitle: "PIZZA", description: "Sweet pineapple chunks with smoked ham and extra mozzarella cheese.", price: 7.49, category: "PIZZA" },
];

const sandwichItems = [
  { image: sandwich1, title: "CLUB", subtitle: "SANDWICH", description: "Triple decker with turkey, bacon, lettuce, tomato and mayo on toast.", price: 5.49, category: "SANDWICH" },
  { image: sandwich2, title: "GRILLED CHICKEN", subtitle: "SANDWICH", description: "Juicy grilled chicken breast with avocado spread and fresh veggies.", price: 6.99, category: "SANDWICH" },
  { image: sandwich3, title: "PHILLY CHEESE", subtitle: "SANDWICH", description: "Tender sliced beef with melted provolone, peppers and onions on a sub.", price: 7.99, category: "SANDWICH" },
  { image: sandwich4, title: "BLT CLASSIC", subtitle: "SANDWICH", description: "Crispy bacon with fresh lettuce, ripe tomatoes and creamy mayo on sourdough.", price: 5.99, category: "SANDWICH" },
  { image: sandwich5, title: "TUNA MELT", subtitle: "SANDWICH", description: "Seasoned tuna salad with melted cheddar on grilled rye bread. Delicious.", price: 6.49, category: "SANDWICH" },
  { image: sandwich6, title: "VEGGIE WRAP", subtitle: "SANDWICH", description: "Hummus, roasted veggies, feta cheese and spinach in a whole wheat wrap.", price: 5.49, category: "SANDWICH" },
];

const friesItems = [
  { image: fries1, title: "CLASSIC", subtitle: "FRIES", description: "Golden crispy fries seasoned with sea salt. The perfect side for any meal.", price: 2.99, category: "FRIES" },
  { image: fries2, title: "LOADED", subtitle: "FRIES", description: "Topped with melted cheese, bacon bits, sour cream and fresh chives.", price: 4.49, category: "FRIES" },
  { image: fries3, title: "SWEET POTATO", subtitle: "FRIES", description: "Crispy sweet potato fries with a hint of cinnamon and honey drizzle.", price: 3.49, category: "FRIES" },
  { image: fries4, title: "CURLY", subtitle: "FRIES", description: "Spiral-cut curly fries with a blend of signature spices and herbs.", price: 3.99, category: "FRIES" },
  { image: fries5, title: "TRUFFLE", subtitle: "FRIES", description: "Premium fries drizzled with truffle oil and parmesan cheese shavings.", price: 4.99, category: "FRIES" },
  { image: fries6, title: "GARLIC PARMESAN", subtitle: "FRIES", description: "Tossed in garlic butter and topped with freshly grated parmesan cheese.", price: 3.99, category: "FRIES" },
];

export default function FoodMenu() {
  const [expanded, setExpanded] = useState({
    burgers: false,
    pizzas: false,
    sandwiches: false,
    fries: false,
  });
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleExpand = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleBuyNow = (item) => {
    setSelectedItem(item);
  };

  const getItems = (items, section) => {
    return expanded[section] ? items : items.slice(0, 3);
  };

  return (
    <div className="food-menu" id="menu-section">
      <CategoryTabs />

      <section id="burgers" className="food-section">
        <HeroBanner title="BURGERS" subtitle="Best burgers, made for you. Enjoy it!" bgImage={burgersHeading} />
        <FoodCardList items={getItems(burgerItems, "burgers")} onBuyNow={handleBuyNow} />
        <ViewMoreButton expanded={expanded.burgers} onClick={() => toggleExpand("burgers")} />
      </section>

      <section id="pizzas" className="food-section">
        <HeroBanner title="PIZZA" subtitle="Authentic pizzas, fresh from oven. Enjoy it!" bgImage={pizzaHeading} />
        <FoodCardList items={getItems(pizzaItems, "pizzas")} onBuyNow={handleBuyNow} />
        <ViewMoreButton expanded={expanded.pizzas} onClick={() => toggleExpand("pizzas")} />
      </section>

      <section id="sandwiches" className="food-section">
        <HeroBanner title="SANDWICHES" subtitle="Crafted sandwiches, full of flavor. Enjoy it!" bgImage={sandwichHeading} />
        <FoodCardList items={getItems(sandwichItems, "sandwiches")} onBuyNow={handleBuyNow} />
        <ViewMoreButton expanded={expanded.sandwiches} onClick={() => toggleExpand("sandwiches")} />
      </section>

      <section id="fries" className="food-section">
        <HeroBanner title="Fries" subtitle="Crispy fries, perfectly seasoned." bgImage={friesHeading} />
        <FoodCardList items={getItems(friesItems, "fries")} onBuyNow={handleBuyNow} />
        <ViewMoreButton expanded={expanded.fries} onClick={() => toggleExpand("fries")} />
      </section>

      {selectedItem && (
        <OrderModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
