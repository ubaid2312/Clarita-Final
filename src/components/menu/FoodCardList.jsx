import FoodCard from "./FoodCard";

export default function FoodCardList({ items, onBuyNow }) {
  return (
    <div className="food-cards">
      {items.map((item, index) => (
        <FoodCard key={index} {...item} onBuyNow={onBuyNow} />
      ))}
    </div>
  );
}
