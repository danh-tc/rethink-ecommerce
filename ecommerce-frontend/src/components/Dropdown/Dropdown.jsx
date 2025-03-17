/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import "./_dropdown.scss";
import { GoChevronDown } from "react-icons/go";

export default function Dropdown({ options = [], onSelect, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prevState) => !prevState);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="rethink-dropdown--container">
      <span className="rethink-dropdown__label">{label}</span>
      <div className="rethink-dropdown" ref={dropdownRef}>
        <button
          type="button"
          className="rethink-dropdown__place-holder"
          onClick={toggleDropdown}
        >
          {!selectedOption && (
            <span style={{ color: "#929292" }}>Please select</span>
          )}
          {selectedOption}
        </button>
        <div className="rethink-dropdown__icon">
          <GoChevronDown />
        </div>
        {isOpen && (
          <div className="rethink-dropdown__menu">
            {options.map((option, index) => (
              <button
                type="button"
                className={`rethink-dropdown__menu__item ${
                  selectedOption === option ? "item-selected" : ""
                }`}
                data-uuid={option}
                key={index + option}
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
