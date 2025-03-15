import { useState } from "react";
import { FormContainer, FormInput, Button } from "../components/index";
import { useInput } from "../hooks/useInput";
import { isEmail, isNotEmpty } from "../utils/validateForm";
import { doAuthentication } from "../services/authenticationService";
import { REGISTER_URL } from "../constants/authenticationContants";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [hasBackendErrors, setHasBackendErrors] = useState(null);
  const navigate = useNavigate();

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

  const {
    value: firstNameValue,
    handleInputChange: handlefirstNameChange,
    handleInputBlur: handlefirstNameBlur,
    hasError: firstNameHasError,
  } = useInput("", (value) => isNotEmpty(value));

  const {
    value: lastNameValue,
    handleInputChange: handleLastNameChange,
    handleInputBlur: handleLastNameBlur,
    hasError: lastNameHasError,
  } = useInput("", (value) => isNotEmpty(value));

  const {
    value: rePasswordValue,
    handleInputChange: handleRePasswordChange,
    handleInputBlur: handleRePasswordBlur,
  } = useInput("", (value) => isNotEmpty(value));

  async function handleSubmitForm(event) {
    event.preventDefault();
    if (
      !firstNameValue ||
      !lastNameValue ||
      !emailValue ||
      !passwordValue ||
      !rePasswordValue
    ) {
      setHasBackendErrors("Please fill out the registration form.");
      return;
    }
    const reqBody = {
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
      password: rePasswordValue,
    };
    const response = await doAuthentication(REGISTER_URL, reqBody);
    if (response?.hasError) {
      setHasBackendErrors(
        response.errorDescription || response.validationErrors
      );
    } else {
      navigate("/auth/thank-you");
    }
  }

  return (
    <div className="centered-container">
      <FormContainer
        title="Register"
        onSubmit={(event) => handleSubmitForm(event)}
      >
        <FormInput
          label="First name"
          id="firstname"
          name="firstname"
          placeholder="Enter your first name"
          value={firstNameValue}
          onBlur={(event) => {
            handlefirstNameBlur(event);
            setHasBackendErrors(null);
          }}
          onChange={(event) => {
            handlefirstNameChange(event);
            setHasBackendErrors(null);
          }}
          error={firstNameHasError && "First name must not be empty."}
        />
        <FormInput
          label="Last name"
          id="lastname"
          name="lastname"
          placeholder="Enter your last name"
          value={lastNameValue}
          onBlur={(event) => {
            handleLastNameBlur(event);
            setHasBackendErrors(null);
          }}
          onChange={(event) => {
            handleLastNameChange(event);
            setHasBackendErrors(null);
          }}
          error={lastNameHasError && "Last name must not be empty."}
        />
        <FormInput
          label="Email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={emailValue}
          onBlur={(event) => {
            handleEmailBlur(event);
            setHasBackendErrors(null);
          }}
          onChange={(event) => {
            handleEmailChange(event);
            setHasBackendErrors(null);
          }}
          error={emailHasError && "Please enter a valid email address."}
        />
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
        <Button className="rethink-button" label="Sign in"></Button>
      </FormContainer>
    </div>
  );
}
