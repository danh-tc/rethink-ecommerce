import "./_form-container.scss";
// eslint-disable-next-line react/prop-types
export default function FormContainer({ children, title, ...prop }) {
  return (
    <form {...prop} className="app__form-container">
      <div className="app__form-container__title">{title}</div>
      {children}
    </form>
  );
}
