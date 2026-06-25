// ─────────────────────────────────────────
// Formsubmit.co — Direct email, NO API key, NO setup
// Email goes directly to your inbox
// ─────────────────────────────────────────
const OWNER_EMAIL = "ubaidmolani92@gmail.com";

/**
 * Generate a random order number like "CLR-8472"
 */
export function generateOrderNumber() {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `CLR-${num}`;
}

/**
 * Format cart items into a readable text block for the email
 */
function formatItemsForEmail(cart) {
  return cart
    .map((item, index) => {
      const extrasPrice = (item.selectedExtrasList || []).reduce(
        (sum, extra) => sum + extra.price,
        0
      );
      const itemTotal = (item.price + extrasPrice) * item.quantity;
      const extrasText =
        item.extras && item.extras.length > 0
          ? ` (+${item.extras.join(", ")})`
          : "";
      return `${index + 1}. ${item.title} ${item.subtitle || ""}${extrasText} × ${item.quantity} — Rs.${itemTotal.toFixed(2)}`;
    })
    .join("\n");
}

/**
 * Format the current date/time for the receipt
 */
export function formatDateTime() {
  const now = new Date();
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return now.toLocaleString("en-PK", options);
}

/**
 * Validate Pakistani phone number
 * Must be 11 digits and start with 03
 */
export function validatePakistaniPhone(phone) {
  const digitsOnly = phone.replace(/\D/g, "");

  if (digitsOnly.length !== 11) {
    return { valid: false, message: "Phone number must be exactly 11 digits" };
  }

  if (!digitsOnly.startsWith("03")) {
    return { valid: false, message: "Phone number must start with 03" };
  }

  return { valid: true, cleaned: digitsOnly };
}

/**
 * Format phone as 03XX-XXXXXXX for display
 */
export function formatPhoneDisplay(phone) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  }
  return phone;
}

/**
 * Send order receipt email DIRECTLY to ubaidmolani92@gmail.com
 * Uses Formsubmit.co — no API key, no setup, just works
 */
export async function sendReceiptEmail(orderData) {
  const { orderNumber, cart, total, name, phone, address, dateTime } = orderData;

  const itemsList = formatItemsForEmail(cart);

  const message = `
🛒 NEW ORDER — ${orderNumber}
━━━━━━━━━━━━━━━━━━━━━━

📅 Date/Time: ${dateTime}

👤 Customer Name: ${name}
📞 Phone: ${phone}
📍 Address: ${address}

━━━━━━━━━━━━━━━━━━━━━━
📦 ORDER ITEMS:
━━━━━━━━━━━━━━━━━━━━━━
${itemsList}

━━━━━━━━━━━━━━━━━━━━━━
💰 TOTAL: Rs.${total.toFixed(2)}
━━━━━━━━━━━━━━━━━━━━━━

📦 Delivery charges ke liye customer ko WhatsApp pe contact karein.
  `.trim();

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${OWNER_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: `🛒 Clarita New Order — ${orderNumber} | ${name}`,
        "Customer Name": name,
        "Phone": phone,
        "Delivery Address": address,
        "Order Number": orderNumber,
        "Order Items": itemsList,
        "Total Amount": `Rs.${total.toFixed(2)}`,
        "Date/Time": dateTime,
        "Note": "Delivery charges ke liye customer ko WhatsApp pe contact karein.",
        _template: "table",
      }),
    });

    const result = await response.json();

    if (result.success) {
      console.log("📧 Receipt email sent successfully!");
      return { success: true };
    } else {
      console.error("❌ Email response:", result);
      return { success: false, error: result.message };
    }
  } catch (error) {
    console.error("❌ Failed to send receipt email:", error);
    return { success: false, error };
  }
}

/**
 * Send contact inquiry email directly to owner inbox
 * Uses Formsubmit.co — no API key, no setup
 */
export async function sendContactEmail(contactData) {
  const { name, email, subject, message } = contactData;

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${OWNER_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: `✉️ Clarita Contact Inquiry — ${subject} | ${name}`,
        "Name": name,
        "Email": email,
        "Subject": subject,
        "Message": message,
        _template: "table",
      }),
    });

    const result = await response.json();

    if (result.success) {
      console.log("📧 Contact email sent successfully!");
      return { success: true };
    } else {
      console.error("❌ Email response:", result);
      return { success: false, error: result.message };
    }
  } catch (error) {
    console.error("❌ Failed to send contact email:", error);
    return { success: false, error };
  }
}

/**
 * Send newsletter subscription email directly to owner inbox
 * Uses Formsubmit.co — no API key, no setup
 */
export async function sendNewsletterSubscriptionEmail(email) {
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${OWNER_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: `📨 Clarita Newsletter Subscription — ${email}`,
        "Email Address": email,
        "Status": "Subscribed",
        "Date/Time": formatDateTime(),
        _template: "table",
      }),
    });

    const result = await response.json();

    if (result.success) {
      console.log("📧 Subscription email sent successfully!");
      return { success: true };
    } else {
      console.error("❌ Email response:", result);
      return { success: false, error: result.message };
    }
  } catch (error) {
    console.error("❌ Failed to send subscription email:", error);
    return { success: false, error };
  }
}

