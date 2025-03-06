import { useState } from "react";
import "./_product-color.scss";
export default function ProductColor({
  onColorSelect,
  colorOptions = [],
  label = "Color:",
}) {
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    onColorSelect(color);
  };

  return (
    <div className="rethink-product-color">
      <div className="rethink-product-color__label">
        <span>{label}</span>
      </div>
      <div className="rethink-product-color__container">
        <span className="selected-color--label">{selectedColor.name}</span>
        <div className="colors">
          {colorOptions.map((colorOption, index) => (
            <div
              key={colorOption + index}
              className={`color-option ${
                selectedColor.color === colorOption.color
                  ? "color-option--selected"
                  : undefined
              }`}
              onClick={() => handleColorSelect(colorOption)}
            >
              <div
                className="color-option--symbol"
                style={{
                  backgroundColor: colorOption.color,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
