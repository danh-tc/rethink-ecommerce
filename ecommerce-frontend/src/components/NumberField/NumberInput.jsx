import { useId } from "react";
import "./_number-input.scss";
import { NumberField } from "@base-ui-components/react/number-field";

export default function NumberInput() {
  const id = useId();
  return (
    <NumberField.Root
      id={id}
      defaultValue={1}
      min={1}
      className="rethink-number-input"
    >
      <NumberField.ScrubArea>
        <label htmlFor={id} className="rethink-number-input__label">
          Quantity:
        </label>
        <NumberField.ScrubAreaCursor>
          <CursorGrowIcon />
        </NumberField.ScrubAreaCursor>
      </NumberField.ScrubArea>

      <NumberField.Group className="rethink-number-input__group">
        <NumberField.Decrement className="icon minus-icon">
          <MinusIcon />
        </NumberField.Decrement>
        <NumberField.Input className="input-area" />
        <NumberField.Increment className="icon plus-icon">
          <PlusIcon />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  );
}

function CursorGrowIcon({ props }) {
  return (
    <svg
      width="26"
      height="14"
      viewBox="0 0 24 14"
      fill="black"
      stroke="white"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
    </svg>
  );
}

function PlusIcon({ props }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 5H5M10 5H5M5 5V0M5 5V10" />
    </svg>
  );
}

function MinusIcon({ props }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 5H10" />
    </svg>
  );
}
