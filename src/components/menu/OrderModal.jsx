import { useState } from "react";
import {
  SauceIcon,
  MeatIcon,
  CheeseIcon,
  FriesIcon,
  MushroomIcon,
  BreadIcon,
  SaladIcon,
  BaconIcon,
  CartIcon
} from "../common/Icons";
import { useCart } from "../cart/CartContext";

const iconMap = {
  sauce: <SauceIcon size={18} color="#ffffff" />,
  meat: <MeatIcon size={18} color="#ffffff" />,
  cheese: <CheeseIcon size={18} color="#ffffff" />,
  fries: <FriesIcon size={18} color="#ffffff" />,
  mushroom: <MushroomIcon size={18} color="#ffffff" />,
  bread: <BreadIcon size={18} color="#ffffff" />,
  salad: <SaladIcon size={18} color="#ffffff" />,
  bacon: <BaconIcon size={18} color="#ffffff" />
};

const categoryExtras = {
  BURGER: [
    { name: "Extra Sauce", price: 1.00, icon: "sauce" },
    { name: "Extra Patty", price: 2.00, icon: "meat" },
    { name: "Extra Cheese", price: 1.00, icon: "cheese" },
    { name: "Side of Fries", price: 1.50, icon: "fries" },
  ],
  PIZZA: [
    { name: "Extra Cheese", price: 1.50, icon: "cheese" },
    { name: "Extra Toppings", price: 2.00, icon: "mushroom" },
    { name: "Stuffed Crust", price: 1.50, icon: "bread" },
    { name: "Garlic Bread", price: 1.00, icon: "bread" },
  ],
  SANDWICH: [
    { name: "Extra Sauce", price: 1.00, icon: "sauce" },
    { name: "Double Meat", price: 2.50, icon: "meat" },
    { name: "Extra Cheese", price: 1.00, icon: "cheese" },
    { name: "Side Salad", price: 1.50, icon: "salad" },
  ],
  FRIES: [
    { name: "Dipping Sauce", price: 0.75, icon: "sauce" },
    { name: "Cheese Topping", price: 1.50, icon: "cheese" },
    { name: "Double Portion", price: 2.00, icon: "fries" },
    { name: "Bacon Bits", price: 1.25, icon: "bacon" },
  ],
};

function OrderModal({ item, onClose }) {
  const { addToCart, setIsCartOpen } = useCart();
  const extras = categoryExtras[item.category] || categoryExtras.BURGER;
  
  // Track quantities of extras (default 0)
  const [extraQuantities, setExtraQuantities] = useState(extras.map(() => 0));
  
  // Track main product quantity
  const [productQuantity, setProductQuantity] = useState(1);

  const updateExtraQuantity = (index, value) => {
    setExtraQuantities((prev) =>
      prev.map((v, i) => (i === index ? Math.max(0, Math.min(10, value)) : v))
    );
  };

  const handleOptionClick = (index) => {
    if (extraQuantities[index] === 0) {
      updateExtraQuantity(index, 1);
    } else {
      updateExtraQuantity(index, 0);
    }
  };

  const extraTotal = extras.reduce(
    (sum, extra, i) => sum + extra.price * extraQuantities[i],
    0
  );
  
  const totalPrice = (item.price + extraTotal) * productQuantity;

  const handleOrder = () => {
    // Generate selected extras list with their respective quantities and multiplied prices
    const selectedExtrasList = extras
      .map((extra, i) => ({
        ...extra,
        quantity: extraQuantities[i],
        price: extra.price * extraQuantities[i],
      }))
      .filter((e) => e.quantity > 0);

    // Format display string for extras with quantities if > 1
    const selectedExtrasNames = selectedExtrasList.map((e) =>
      e.quantity > 1 ? `${e.name} (x${e.quantity})` : e.name
    );

    addToCart({
      title: item.title,
      subtitle: item.subtitle,
      image: item.image,
      price: item.price,
      category: item.category,
      selectedExtrasList: selectedExtrasList,
      extras: selectedExtrasNames,
      quantity: productQuantity,
    });

    setIsCartOpen(true);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>

        <div className="modal-image-wrapper">
          <img src={item.image} alt={item.title} className="modal-image" />
        </div>

        <h2 className="modal-title">
          {item.title} <span>{item.subtitle}</span>
        </h2>

        <p className="modal-base-price">
          Base Price: <span>${item.price.toFixed(2)}</span>
        </p>

        <div className="modal-divider" />

        <h4 className="modal-options-heading">Customize Your Order</h4>

        <div className="modal-options">
          {extras.map((extra, index) => {
            const qty = extraQuantities[index];
            const isSelected = qty > 0;
            return (
              <div
                key={index}
                className={`modal-option ${isSelected ? "option-selected" : ""}`}
                onClick={() => handleOptionClick(index)}
              >
                <span className="option-icon">{iconMap[extra.icon]}</span>
                <span className="option-name">
                  {extra.name}
                  {isSelected && <span className="option-qty-badge">x{qty}</span>}
                </span>
                <span className="option-price">
                  +${(extra.price * (qty || 1)).toFixed(2)}
                </span>
                
                {isSelected ? (
                  <div className="extra-qty-stepper" onClick={(e) => e.stopPropagation()}>
                    <button
                      className="extra-qty-btn"
                      onClick={() => updateExtraQuantity(index, qty - 1)}
                    >
                      -
                    </button>
                    <span className="extra-qty-val">{qty}</span>
                    <button
                      className="extra-qty-btn"
                      onClick={() => updateExtraQuantity(index, qty + 1)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <span className="option-check"></span>
                )}
              </div>
            );
          })}
        </div>

        <div className="modal-divider" />

        <div className="modal-product-qty-row">
          <span className="qty-label">Product Quantity</span>
          <div className="modal-qty-controls">
            <button
              className="modal-qty-btn"
              onClick={() => setProductQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </button>
            <span className="modal-qty-val">{productQuantity}</span>
            <button
              className="modal-qty-btn"
              onClick={() => setProductQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="modal-total">
          <span className="total-label">Total Price:</span>
          <span className="total-amount">${totalPrice.toFixed(2)}</span>
        </div>

        <div className="modal-actions">
          <button
            className="modal-order-btn"
            onClick={handleOrder}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
          >
            Order Now <CartIcon size={16} color="#143D2B" />
          </button>
          <button className="modal-cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;
