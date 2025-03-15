import { FormContainer, FormInput, Button } from "../components/index";
import { isNotEmpty } from "../utils/validateForm";
import { useInput } from "../hooks/useInput";
import "./_login.scss";
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { requestResetAccount } from "../services/authenticationService";
import { RESET_ACCOUNT_URL } from "../constants/authenticationContants";

export default function ChangePasswordPage() {
  const [hasBackendErrors, setHasBackendErrors] = useState(null);
  const [resetSuccessfully, setResetSuccessfully] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const code = new URLSearchParams(location.search)?.get("code");

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => isNotEmpty(value));

  const {
    value: rePasswordValue,
    handleInputChange: handleRePasswordChange,
    handleInputBlur: handleRePasswordBlur,
  } = useInput("", (value) => isNotEmpty(value));

  async function handleSubmitForm(event) {
    event.preventDefault();
    if (!passwordHasError && passwordValue === rePasswordValue) {
      const reqBody = {
        token: code,
        password: passwordValue,
      };
      const response = await requestResetAccount(RESET_ACCOUNT_URL, reqBody);
      if (response.status === 200) {
        setResetSuccessfully(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setHasBackendErrors(response.data.message || "Something went wrong.");
      }
    }
  }

  return (
    <div className="centered-container">
      {!resetSuccessfully ? (
        <FormContainer
          title="Change your password"
          onSubmit={(event) => handleSubmitForm(event)}
        >
          <FormInput
            label="Password"
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={passwordValue}
            onBlur={(event) => {
              handlePasswordBlur(event);
              setHasBackendErrors(null);
            }}
            onChange={(event) => {
              handlePasswordChange(event);
              setHasBackendErrors(null);
            }}
            error={passwordHasError && "Password must not be empty."}
          />
          <FormInput
            label="Re-password"
            id="re-password"
            name="re-password"
            type="password"
            placeholder="Enter your re-password"
            value={rePasswordValue}
            onBlur={(event) => {
              handleRePasswordBlur(event);
              setHasBackendErrors(null);
            }}
            onChange={(event) => {
              handleRePasswordChange(event);
              setHasBackendErrors(null);
            }}
            error={
              passwordValue !== rePasswordValue &&
              !passwordHasError &&
              "Password does not match."
            }
          />

          {hasBackendErrors && (
            <p className="error-message">{hasBackendErrors}</p>
          )}

          <Button className="rethink-button" label="Confirm"></Button>
        </FormContainer>
      ) : (
        <h3 className="app__activation__header" style={{ textAlign: "center" }}>
          Your account has been reset, kindly click{" "}
          <Link to="/auth/login">here</Link> to login. Thank you.
        </h3>
      )}
    </div>
  );
}
