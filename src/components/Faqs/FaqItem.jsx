import { useState } from "react";

export default function FaqItem({ question, answer, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const settoggle = () => {
    setIsOpen((prev) => !prev);
  };
  
  return (
    <li className={`faq-item ${isOpen ? "is-open" : ""}`}>
      <div className="faq-item-header" onClick={settoggle}>
        <h3 className="faq-question">{question}</h3>
        <button type="button" className="faq-toggle-btn" aria-expanded={isOpen} aria-label="Toggle FAQ answer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
      <div className="faq-answer-wrapper">
        <div className="faq-answer-content">
          <p className="faq-answer">{answer}</p>
        </div>
      </div>
    </li>
  );
}
