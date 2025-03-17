import "./_form-container.scss";
// eslint-disable-next-line react/prop-types
export default function FormContainer({ children, title, ...prop }) {
  return (
    <form {...prop} className="rethink-form-container">
      <div className="rethink-form-container__title h1">{title}</div>
      {children}
    </form>
  );
}
