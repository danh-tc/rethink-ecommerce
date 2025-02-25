import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ACTIVATION_URL } from "../constants/authenticationContants";
import "./_activation.scss";
import { FaCheckCircle } from "react-icons/fa";
import { doActivation } from "../services/authenticationService";

// Fix strict mode in local

export default function ActivationPage() {
  const [isActivated, setIsActivated] = useState(false);
  const [hasError, setHasError] = useState(null);
  const location = useLocation();
  const code = new URLSearchParams(location.search)?.get("code");

  useEffect(() => {
    const regex = /^\d{6}$/;
    if (code && regex.test(code)) {
      activateAccount(code);
    }
  }, [code]);

  async function activateAccount(code) {
    const response = await doActivation(ACTIVATION_URL, code);
    if (response?.status === 200) {
      setIsActivated(true);
    } else {
      setHasError(response.error || "Something went wrong, please try again.");
    }
  }

  return (
    <div
      style={{
        textAlign: "center",
        padding: 50,
        color: "#000",
      }}
      className="centered-container"
    >
      {!isActivated && !hasError && (
        <h3 className="app__activation__header">
          Please wait a few seconds, your account are activating...
        </h3>
      )}
      {hasError && !isActivated && (
        <p className="error-message app__activation__error-message">
          {hasError}
        </p>
      )}
      {isActivated && (
        <div className="card">
          <div className="card__upper-side">
            <FaCheckCircle className="card__checkmark " />
            <h3 className="card__status">Success</h3>
          </div>
          <div className="card__lower-side">
            <p className="card__message">
              Congratulations, your account has been successfully created.
            </p>
            <Link to="/" className="card__btn">
              Home page
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
