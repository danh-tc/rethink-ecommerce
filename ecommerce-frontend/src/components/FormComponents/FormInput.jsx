/* eslint-disable react/prop-types */
import "./_form-input.scss";
export default function FormInput({
  label,
  id,
  error,
  children,
  isHideLablel,
  ...props
}) {
  return (
    <div className="rethink__form-control">
      {!isHideLablel && <label htmlFor={id}>{label}</label>}
      <input id={id} {...props} />
      {children}
      <div className="rethink__form-control__error">
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}
