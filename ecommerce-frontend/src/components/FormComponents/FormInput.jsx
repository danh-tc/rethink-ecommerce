import "./_form-input.scss";
// eslint-disable-next-line react/prop-types
export default function FormInput({ label, id, error, children, ...props }) {
  return (
    <div className="rethink__form-control">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      {children}
      <div className="rethink__form-control__error">
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}
