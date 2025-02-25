import "./_form-input.scss";
// eslint-disable-next-line react/prop-types
export default function FormInput({ label, id, error, ...props }) {
  return (
    <div className="app__form-control">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      <div className="app__form-control__error">{error && <p>{error}</p>}</div>
    </div>
  );
}
