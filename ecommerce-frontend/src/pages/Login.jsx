import { Link, useLocation, useNavigate } from "react-router-dom";
import { FormContainer, FormInput, Button } from "../components/index";
import { isEmail, isNotEmpty } from "../utils/validateForm";
import { useInput } from "../hooks/useInput";
import "./_login.scss";
import { doAuthentication } from "../services/authenticationService";
import { LOGIN_URL } from "../constants/authenticationContants";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authenticationActions } from "../store/authenticationSlice";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [hasBackendErrors, setHasBackendErrors] = useState(null);

  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => isNotEmpty(value));

  async function handleSubmitForm(event) {
    event.preventDefault();
    const reqBody = {
      email: emailValue,
      password: passwordValue,
    };
    const response = await doAuthentication(LOGIN_URL, reqBody);
    if (response?.hasError) {
      setHasBackendErrors(response?.errorDescription);
    } else {
      const { userProfileDTO } = response;
      dispatch(authenticationActions.authenticate(userProfileDTO));
      let navigateTo = location?.state?.previousUrl || "/";
      if (navigateTo.includes("login") || navigateTo.includes("register"))
        navigateTo = "/";
      navigate(navigateTo);
    }
  }

  return (
    <div className="rethink-login">
      <FormContainer
        title="Login"
        onSubmit={(event) => handleSubmitForm(event)}
      >
        <div className="rethink-login__sub-header">Please enter your e-mail and password:</div>
        <FormInput
          id="email"
          name="email"
          placeholder="Email"
          onBlur={(event) => {
            handleEmailBlur(event);
            setHasBackendErrors(null);
          }}
          onChange={(event) => {
            handleEmailChange(event);
            setHasBackendErrors(null);
          }}
          value={emailValue}
          error={emailHasError && "Please enter a valid email address."}
        />
        <FormInput
          id="password"
          name="password"
          type="password"
          placeholder="Password"
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
        {hasBackendErrors && (
          <p className="error-message">{hasBackendErrors}</p>
        )}
        <Link className="reset-pwd" to="/auth/reset-account">
          Forgot your password?
        </Link>
        <Button label="Sign in"></Button>
        <div className="create-account">
          <span>Don&apos;t have an account?</span>
          <Link className="register" to="/auth/register">
            Create an account
          </Link>
        </div>
      </FormContainer>
    </div>
  );
}
