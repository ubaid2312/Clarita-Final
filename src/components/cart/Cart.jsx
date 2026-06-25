import React, { useState } from "react";
import { useCart } from "./CartContext";
import { CloseIcon } from "../common/Icons";
import CheckoutForm from "./CheckoutForm";
import ReceiptModal from "./ReceiptModal";
import { generateOrderNumber, formatDateTime, sendReceiptEmail } from "../../utils/emailService";
import "../../styles/cart.css";

export default function Cart() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    showCheckout,
    setShowCheckout,
    checkoutItem,
    setCheckoutItem,
  } = useCart();

  // Checkout flow states
  const [receiptData, setReceiptData] = useState(null);

  // Close cart drawer or checkout modal
  const handleClose = () => {
    setIsCartOpen(false);
    setShowCheckout(false);
    setCheckoutItem(null);
  };

  // Open checkout form when "Place Order" is clicked
  const handleCheckout = () => {
    setIsCartOpen(false); // Hide cart drawer
    setShowCheckout(true); // Show checkout form
  };

  // Go back from checkout
  const handleBackToCart = () => {
    setShowCheckout(false);
    if (checkoutItem) {
      setCheckoutItem(null); // Clear direct checkout item
    } else {
      setIsCartOpen(true); // Show cart drawer again if we came from it
    }
  };

  // When user confirms order from checkout form
  const handleOrderPlaced = async ({ name, phone, address }) => {
    const orderNumber = generateOrderNumber();
    const dateTime = formatDateTime();

    // Use temporary direct checkout item if present, otherwise use cart items
    const orderItems = checkoutItem ? [checkoutItem] : [...cart];
    const orderTotal = checkoutItem ? checkoutItem.price : cartTotal;

    const orderData = {
      orderNumber,
      cart: orderItems,
      total: orderTotal,
      name,
      phone,
      address,
      dateTime,
    };

    // Send email to owner
    sendReceiptEmail(orderData);

    // Show receipt modal to user
    setShowCheckout(false);
    setReceiptData(orderData);

    // Clean up
    if (checkoutItem) {
      setCheckoutItem(null);
    } else {
      clearCart();
    }
  };

  // Close receipt modal
  const handleReceiptClose = () => {
    setReceiptData(null);
  };

  return (
    <>
      {/* ─── Checkout Form Modal ─── */}
      {showCheckout && (
        <CheckoutForm
          onBack={handleBackToCart}
          onOrderPlaced={handleOrderPlaced}
        />
      )}

      {/* ─── Receipt Modal ─── */}
      {receiptData && (
        <ReceiptModal
          orderData={receiptData}
          onClose={handleReceiptClose}
        />
      )}

      {/* ─── Cart Drawer ─── */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={handleClose}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            
            {/* Cart Header */}
            <div className="cart-header">
              <h2>Your Cart</h2>
              <button className="cart-close-btn" onClick={handleClose} aria-label="Close Cart">
                <CloseIcon size={24} color="#ffffff" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="cart-items-container">
              {cart.length === 0 ? (
                <div className="cart-empty-message">
                  <p>Your cart is empty.</p>
                  <span>Add some delicious food to get started!</span>
                </div>
              ) : (
                cart.map((item, index) => {
                  const extrasPrice = (item.selectedExtrasList || []).reduce(
                    (sum, extra) => sum + extra.price,
                    0
                  );
                  const singleItemTotal = item.price + extrasPrice;

                  return (
                    <div className="cart-item" key={index}>
                      
                      {/* Food Image */}
                      <img src={item.image} alt={item.title} className="cart-item-img" />

                      {/* Food details */}
                      <div className="cart-item-details">
                        <h3>
                          {item.title} <span>{item.subtitle}</span>
                        </h3>
                        
                        {/* List selected extras */}
                        {item.extras && item.extras.length > 0 && (
                          <p className="cart-item-extras">
                            + {item.extras.join(", ")}
                          </p>
                        )}

                        <div className="cart-item-price-row">
                          <span className="cart-item-price">
                            Rs.{(singleItemTotal * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Quantity controls */}
                        <div className="cart-item-actions">
                          <div className="qty-controls">
                            <button
                              className="qty-btn"
                              onClick={() => updateQuantity(index, -1)}
                            >
                              -
                            </button>
                            <span className="qty-val">{item.quantity}</span>
                            <button
                              className="qty-btn"
                              onClick={() => updateQuantity(index, 1)}
                            >
                              +
                            </button>
                          </div>

                          {/* Remove item button */}
                          <button
                            className="cart-item-delete"
                            onClick={() => removeFromCart(index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total-row">
                  <span>Total Price:</span>
                  <span className="cart-grand-total">Rs.{cartTotal.toFixed(2)}</span>
                </div>
                
                <button className="cart-checkout-btn" onClick={handleCheckout}>
                  Place Order
                </button>
                
                <button className="cart-clear-btn" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
