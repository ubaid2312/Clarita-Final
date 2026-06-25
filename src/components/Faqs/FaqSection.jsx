import { FaqData } from "./FaqData.js";
import FaqItem from "./FaqItem.jsx";
import "./Faq.css";

const FlourishIcon = () => (
  <svg width="68" height="24" viewBox="0 0 68 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 12H44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M36 12C38 9.5 40.5 8.5 42.5 10.5C40.5 12 38.5 13 36 12Z" fill="currentColor" />
    <path d="M44 12C46.5 12 49.5 9.5 50.5 7.5C52 4.5 55.5 4.5 57.5 7.5C59 9.5 57.5 13 54 13C51 13 50 10 52 8C54 6 58 10 61 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="65" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export default function FaqSection() {
  return (
    <div className="faq-outer-wrapper">
      <div className="faq-card">
        <header className="faq-header">
          <h1 className="faq-title">FAQs</h1>
          <div className="faq-subheading-wrap">
            <div className="faq-flourish">
              <FlourishIcon />
            </div>
            <p className="faq-subheading">We're Got Answers!</p>
            <div className="faq-flourish faq-flourish-right">
              <FlourishIcon />
            </div>
          </div>
        </header>

        <ul className="faq-list">
          {FaqData.map((item, index) => (
            <FaqItem key={item.id} question={item.question} answer={item.answer} defaultOpen={index === 0} />
          ))}
        </ul>
      </div>
    </div>
  );
}
