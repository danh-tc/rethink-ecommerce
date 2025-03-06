import { useState } from "react";
import "./_selectedItem.scss";

export default function SelectedItem({ onSelectItem, items = [], label }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    onSelectItem(size);
  };

  return (
    <div className="rethink-items">
      <div className="rethink-items__label">{label}</div>
      <div className="rethink-items__container">
        {items.map((size) => (
          <button
            key={size}
            className={`item ${selectedSize === size ? "item--selected" : ""}`}
            onClick={() => handleSizeSelect(size)}
          >
            <span className="item__label">{size}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
