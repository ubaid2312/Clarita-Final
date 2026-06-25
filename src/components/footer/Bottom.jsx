import footerData from "./FooterData";

export default function Bottom() {
  return (
    <div className="FooterBottom">
      <p>{footerData.copyright}</p>
    </div>
  );
}