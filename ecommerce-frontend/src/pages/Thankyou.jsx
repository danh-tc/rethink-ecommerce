import { Link } from "react-router-dom";
import "./_thankyou.scss";
export default function Thankyou() {
  return (
    <div className="app__thank-you centered-container">
      <h1 className="app__thank-you__header">Thank you</h1>
      <div className="app__thank-you__desc">
        <strong>Please check your email</strong> for futher instructions on how
        to complete your account setup.
      </div>
      <hr />
      <Link
        className="app__thank-you__btn"
        to="/"
        state={{ previousUrl: location.pathname }}
      >
        Continue to home page
      </Link>
    </div>
  );
}
