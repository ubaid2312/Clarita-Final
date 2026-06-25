import "../../styles/checkout.css";

// Checkmark SVG icon
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Phone SVG icon
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

// Location Pin SVG icon
const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// User SVG icon
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// WhatsApp SVG icon
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function ReceiptModal({ orderData, onClose }) {
  const { orderNumber, cart, total, name, phone, address, dateTime } = orderData;

  return (
    <div className="receipt-overlay" onClick={onClose}>
      <div className="receipt-card" onClick={(e) => e.stopPropagation()}>

        {/* Success Header */}
        <div className="receipt-success-header">
          <div className="receipt-success-icon">
            <CheckIcon />
          </div>
          <h2>Order Placed!</h2>
          <p>Your order has been received and is being prepared</p>
        </div>

        {/* Order Number Badge */}
        <div className="receipt-order-badge">
          <div className="receipt-order-number">
            <span>Order No.</span>
            <span>{orderNumber}</span>
          </div>
        </div>

        {/* Receipt Body */}
        <div className="receipt-body">

          {/* Items Section */}
          <div className="receipt-section">
            <p className="receipt-section-title">Order Items</p>
            <div className="receipt-items">
              {cart.map((item, index) => {
                const extrasPrice = (item.selectedExtrasList || []).reduce(
                  (sum, extra) => sum + extra.price,
                  0
                );
                const itemTotal = (item.price + extrasPrice) * item.quantity;
                return (
                  <div className="receipt-item" key={index}>
                    <div className="receipt-item-info">
                      <p className="receipt-item-name">
                        {item.title} {item.subtitle || ""}
                      </p>
                      {item.extras && item.extras.length > 0 && (
                        <p className="receipt-item-extras">
                          + {item.extras.join(", ")}
                        </p>
                      )}
                      <p className="receipt-item-qty">Qty: {item.quantity}</p>
                    </div>
                    <span className="receipt-item-price">
                      Rs.{itemTotal.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <hr className="receipt-divider" />

          {/* Total */}
          <div className="receipt-total-row">
            <span>Total Amount</span>
            <span>Rs.{total.toFixed(2)}</span>
          </div>

          <hr className="receipt-divider" />

          {/* Customer Info */}
          <div className="receipt-section">
            <p className="receipt-section-title">Delivery Details</p>
            <div className="receipt-info-grid">

              {/* Name */}
              <div className="receipt-info-item">
                <div className="receipt-info-icon">
                  <UserIcon />
                </div>
                <div className="receipt-info-text">
                  <span className="receipt-info-label">Customer Name</span>
                  <span className="receipt-info-value">{name}</span>
                </div>
              </div>

              {/* Phone */}
              <div className="receipt-info-item">
                <div className="receipt-info-icon">
                  <PhoneIcon />
                </div>
                <div className="receipt-info-text">
                  <span className="receipt-info-label">Phone</span>
                  <span className="receipt-info-value">{phone}</span>
                </div>
              </div>

              {/* Address */}
              <div className="receipt-info-item">
                <div className="receipt-info-icon">
                  <LocationIcon />
                </div>
                <div className="receipt-info-text">
                  <span className="receipt-info-label">Delivery Address</span>
                  <span className="receipt-info-value">{address}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Delivery Charges WhatsApp Notice */}
          <div className="receipt-whatsapp-notice">
            <div className="receipt-whatsapp-icon">
              <WhatsAppIcon />
            </div>
            <p>
              Delivery charges ke liye hamari team apko <strong>WhatsApp</strong> ke through contact karegi.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="receipt-footer">
          <p className="receipt-date">{dateTime}</p>
          <button className="receipt-close-btn" onClick={onClose}>
            Done
          </button>
          <p className="receipt-email-note">
            A receipt has been sent to the restaurant
          </p>
        </div>

      </div>
    </div>
  );
}
