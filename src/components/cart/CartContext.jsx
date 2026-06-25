import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const CartContext = createContext();

export function CartProvider({ children }) {
  // Load initial cart from localStorage
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("clarita-cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Cart drawer open state
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Checkout modal open state
  const [showCheckout, setShowCheckout] = useState(false);

  // Temporary item for direct checkout (e.g. Deals)
  const [checkoutItem, setCheckoutItem] = useState(null);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("clarita-cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (newItem) => {
    const qtyToAdd = newItem.quantity || 1;
    setCart((prevCart) => {
      // Create a key of selected extras to identify same customization
      const newItemExtrasKey = (newItem.extras || []).sort().join(",");

      // Check if item already exists in the cart with the same customization
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.title === newItem.title &&
          item.category === newItem.category &&
          (item.extras || []).sort().join(",") === newItemExtrasKey,
      );

      if (existingIndex > -1) {
        // If exists, create a new object with incremented quantity (no mutation)
        return prevCart.map((item, i) =>
          i === existingIndex
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item
        );
      } else {
        // If new, add to cart with correct quantity
        return [...prevCart, { ...newItem, quantity: qtyToAdd }];
      }
    });
  };

  // Remove item from cart completely
  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  // Update item quantity (increase or decrease)
  const updateQuantity = (index, amount) => {
    setCart((prevCart) => {
      const currentQuantity = prevCart[index].quantity;
      const newQuantity = currentQuantity + amount;

      if (newQuantity <= 0) {
        // If quantity becomes 0 or less, remove item from cart
        return prevCart.filter((_, i) => i !== index);
      } else {
        // Create new object with updated quantity (no mutation)
        return prevCart.map((item, i) =>
          i === index
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
    });
  };

  // Clear all items in cart
  const clearCart = () => {
    setCart([]);
  };

  // Total quantity of items in cart
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Total price of items in cart (including price of selected extras)
  const cartTotal = cart.reduce((total, item) => {
    const basePrice = item.price;
    const extrasPrice = (item.selectedExtrasList || []).reduce(
      (sum, extra) => sum + extra.price,
      0,
    );
    const itemTotal = (basePrice + extrasPrice) * item.quantity;
    return total + itemTotal;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        showCheckout,
        setShowCheckout,
        checkoutItem,
        setCheckoutItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook to use Cart Context
export function useCart() {
  return useContext(CartContext);
}
