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

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("clarita-cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (newItem) => {
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
        // If exists, just increase quantity
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += 1;
        return updatedCart;
      } else {
        // If new, add to cart with quantity 1
        return [...prevCart, { ...newItem, quantity: 1 }];
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
      const updatedCart = [...prevCart];
      const newQuantity = updatedCart[index].quantity + amount;

      if (newQuantity <= 0) {
        // If quantity becomes 0 or less, remove item from cart
        return prevCart.filter((_, i) => i !== index);
      } else {
        // Update quantity
        updatedCart[index].quantity = newQuantity;
        return updatedCart;
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
