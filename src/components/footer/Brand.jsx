import footerData from "./FooterData";

export default function Brand() {
  return (
    <div className="FooterBrand">
      <h1>Clarita.</h1>
      <hr />
      <p>{footerData.brands[0]}</p>
      <hr />
      <p>{footerData.brands[1]}</p>
    </div>
  );
}
