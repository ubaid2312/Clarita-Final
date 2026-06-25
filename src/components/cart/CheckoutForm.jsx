import { useState, useEffect, useRef } from "react";
import { useCart } from "./CartContext";
import { validatePakistaniPhone } from "../../utils/emailService";
import "../../styles/checkout.css";

export default function CheckoutForm({ onBack, onOrderPlaced }) {
  const { cart, cartTotal, checkoutItem } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);
  const overlayRef = useRef(null);

  // ───────────────────────────────────────────
  // VisualViewport API — primary cross-platform keyboard fix
  // Works on both iOS Safari 13+ and Android Chrome
  // ───────────────────────────────────────────
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const vv = window.visualViewport;
    if (!vv) {
      // Fallback: browsers without VisualViewport (very old)
      console.log("[CheckoutForm] VisualViewport API not available, using fallback");
      return;
    }

    const handleViewportResize = () => {
      const vvHeight = vv.height;
      const keyboardHeight = window.innerHeight - vvHeight;

      console.log(
        `[CheckoutForm] VisualViewport resize: vvHeight=${vvHeight.toFixed(0)} ` +
        `innerHeight=${window.innerHeight} keyboardHeight=${keyboardHeight.toFixed(0)}`
      );

      // Set CSS custom property so CSS can react to actual visible height
      overlay.style.setProperty("--vv-height", `${vvHeight}px`);

      // Flag for keyboard state — threshold 150px to avoid false positives
      // from URL bar show/hide (which is typically ~50-80px)
      if (keyboardHeight > 150) {
        overlay.setAttribute("data-keyboard-open", "true");
      } else {
        overlay.removeAttribute("data-keyboard-open");
      }
    };

    // Run once immediately to set initial value
    handleViewportResize();

    vv.addEventListener("resize", handleViewportResize);
    vv.addEventListener("scroll", handleViewportResize);

    return () => {
      vv.removeEventListener("resize", handleViewportResize);
      vv.removeEventListener("scroll", handleViewportResize);
      // Clean up CSS custom property
      overlay.style.removeProperty("--vv-height");
      overlay.removeAttribute("data-keyboard-open");
    };
  }, []);

  // ───────────────────────────────────────────
  // Focus handler — scroll input into view after keyboard opens
  // Uses rAF + setTimeout combo to wait for keyboard animation
  // ───────────────────────────────────────────
  useEffect(() => {
    const formEl = formRef.current;
    if (!formEl) return;

    const handleFocus = (e) => {
      const target = e.target;
      if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") return;

      console.log(`[CheckoutForm] focusin fired on: ${target.id || target.tagName}`);

      // rAF ensures we're in the next paint frame, then setTimeout
      // waits for the keyboard animation to settle (~300ms)
      requestAnimationFrame(() => {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
      });
    };

    formEl.addEventListener("focusin", handleFocus);
    return () => formEl.removeEventListener("focusin", handleFocus);
  }, []);

  // Format phone as user types: 03XX-XXXXXXX
  const handlePhoneChange = (e) => {
    // Only allow digits and dashes
    let value = e.target.value.replace(/[^\d]/g, "");

    // Max 11 digits
    if (value.length > 11) value = value.slice(0, 11);

    // Auto-format: add dash after 4th digit
    if (value.length > 4) {
      value = value.slice(0, 4) + "-" + value.slice(4);
    }

    setPhone(value);
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 3) {
      newErrors.name = "Please enter your full name";
    }

    // Pakistani phone validation
    const phoneCheck = validatePakistaniPhone(phone);
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneCheck.valid) {
      newErrors.phone = phoneCheck.message;
    }

    if (!address.trim()) {
      newErrors.address = "Delivery address is required";
    } else if (address.trim().length < 10) {
      newErrors.address = "Please enter a complete address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    // Clean the phone number before sending
    const cleanedPhone = phone.replace(/\D/g, "");
    const formattedPhone = `${cleanedPhone.slice(0, 4)}-${cleanedPhone.slice(4)}`;
    await onOrderPlaced({ name: name.trim(), phone: formattedPhone, address: address.trim() });
    setIsSubmitting(false);
  };

  return (
    <div className="checkout-overlay" ref={overlayRef} onClick={onBack}>
      <div className="checkout-card" ref={formRef} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="checkout-header">
          <h2>Checkout</h2>
          <p>Enter your delivery details to place the order</p>
        </div>

        {/* Form Body */}
        <div className="checkout-body">

          {/* Customer Name */}
          <div className={`checkout-field ${errors.name ? "checkout-field-error" : ""}`}>
            <label htmlFor="checkout-name">Full Name</label>
            <input
              id="checkout-name"
              type="text"
              placeholder="e.g. Ahmed Khan"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
              }}
              autoComplete="name"
            />
            {errors.name && <p className="checkout-error-text">{errors.name}</p>}
          </div>

          {/* Phone Number — Pakistani format */}
          <div className={`checkout-field ${errors.phone ? "checkout-field-error" : ""}`}>
            <label htmlFor="checkout-phone">Phone Number</label>
            <input
              id="checkout-phone"
              type="tel"
              placeholder="03XX-XXXXXXX"
              value={phone}
              onChange={handlePhoneChange}
              autoComplete="tel"
              maxLength={12} /* 11 digits + 1 dash */
              inputMode="numeric"
            />
            {errors.phone && <p className="checkout-error-text">{errors.phone}</p>}
          </div>

          {/* Delivery Address */}
          <div className={`checkout-field ${errors.address ? "checkout-field-error" : ""}`}>
            <label htmlFor="checkout-address">Delivery Address</label>
            <textarea
              id="checkout-address"
              placeholder="House #, Street, Area, City"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                if (errors.address) setErrors((prev) => ({ ...prev, address: "" }));
              }}
              rows={3}
            />
            {errors.address && <p className="checkout-error-text">{errors.address}</p>}
          </div>

          {/* Order Summary */}
          <div className="checkout-summary">
            <p className="checkout-summary-title">Order Summary</p>
            <div className="checkout-summary-items">
              {(checkoutItem ? [checkoutItem] : cart).map((item, index) => {
                const extrasPrice = (item.selectedExtrasList || []).reduce(
                  (sum, extra) => sum + extra.price,
                  0
                );
                const itemTotal = (item.price + extrasPrice) * item.quantity;
                return (
                  <div className="checkout-summary-item" key={index}>
                    <span className="checkout-summary-item-name">
                      {item.title} {item.subtitle || ""}
                    </span>
                    <span className="checkout-summary-item-qty">×{item.quantity}</span>
                    <span className="checkout-summary-item-price">
                      Rs.{itemTotal.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
            <hr className="checkout-summary-divider" />
            <div className="checkout-summary-total">
              <span>Total</span>
              <span>Rs.{(checkoutItem ? checkoutItem.price : cartTotal).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="checkout-actions">
          <button
            className="checkout-confirm-btn"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="btn-spinner"></span>
                Placing Order...
              </>
            ) : (
              "Confirm & Place Order"
            )}
          </button>
          <button className="checkout-back-btn" onClick={onBack} disabled={isSubmitting}>
            ← Back to Cart
          </button>
        </div>

      </div>
    </div>
  );
}
