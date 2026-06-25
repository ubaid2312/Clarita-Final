import { useState } from "react";
import footerData from "./FooterData";
import { sendNewsletterSubscriptionEmail } from "../../utils/emailService";

export default function Policies() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await sendNewsletterSubscriptionEmail(email);
      if (res.success) {
        setStatus("success");
        setMessage("Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(res.error || "Subscription failed. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <div className="FooterPolicies">
      <h1>Policies</h1>
      <hr />
      <div className="policy-links">
        <a href="#privacy">{footerData.policies[0]}</a>
        <span className="policy-divider">|</span>
        <a href="#terms">{footerData.policies[1]}</a>
      </div>
      <div className="PolicyButton">
        <form onSubmit={handleSubmit} className="subscribe-container">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="subscribe-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            required
          />
          <button
            type="submit"
            className="subscribe-btn"
            disabled={status === "loading"}
          >
            {status === "loading" ? "..." : "Subscribe"}
          </button>
        </form>
        {message && (
          <p className={`subscribe-message ${status === "success" ? "success" : "error"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

