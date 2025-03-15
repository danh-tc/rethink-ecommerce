import { FormContainer, FormInput, Button } from "../components/index";
import { isEmail, isNotEmpty } from "../utils/validateForm";
import { useInput } from "../hooks/useInput";
import "./_login.scss";
import { requestResetAccount } from "../services/authenticationService";
import { REQUEST_RESET_ACCOUNT_URL } from "../constants/authenticationContants";
import { useState } from "react";

export default function ResetAccountPage() {
  const [hasBackendErrors, setHasBackendErrors] = useState(null);
  const [sendMail, setSendMail] = useState(false);

  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

  async function handleSubmitForm(event) {
    event.preventDefault();
    setHasBackendErrors(null);
    const reqBody = {
      email: emailValue,
    };
    const response = await requestResetAccount(REQUEST_RESET_ACCOUNT_URL, reqBody);
    if (response?.status == 200) {
      setSendMail(true);
    } else if (response?.errorDescription) {
      setHasBackendErrors(response?.errorDescription);
    } else {
      setHasBackendErrors("Something went wrong.");
    }
  }

  return (
    <div className="centered-container">
      <FormContainer
        title="Reset your account"
        onSubmit={(event) => handleSubmitForm(event)}
      >
        <FormInput
          label="Email"
          id="email"
          name="email"
          placeholder="Please enter your email"
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

        {hasBackendErrors && (
          <p className="error-message">{hasBackendErrors}</p>
        )}

        {sendMail && (
          <p className="success-message">
            Successfully! Please check your email to reset your account.
          </p>
        )}

        {!sendMail && (
          <Button className="rethink-button" label="Reset" disable></Button>
        )}
      </FormContainer>
    </div>
  );
}
