import { Link } from "react-router-dom";
import { FormContainer, FormInput, Button } from "../../components/index";
import { REQUEST_RESET_ACCOUNT_URL } from "../../constants/authenticationContants";
import { useState } from "react";
import { isEmail } from "../../utils/validateForm";
import doAxios from "../../services/axiosService";

export default function AuthRecoverPage() {
  const initialData = {
    emailValue: "",
    frontendErrors: "",
    backendErrors: "",
    backendSuccessResponse: "",
  };
  const [recoverForm, setRecoverForm] = useState(initialData);

  const [isLoading, setIsLoading] = useState(false);

  const handleChangeFormChange = (event) => {
    if (event.target.id === "email") {
      setRecoverForm((previousForm) => {
        return { ...previousForm, emailValue: event.target.value };
      });
    }
  };

  async function handleSubmitForm(event) {
    event.preventDefault();
    // Clear all errors message when submiting
    setRecoverForm((previousForm) => {
      return {
        ...previousForm,
        frontendErrors: "",
        backendErrors: "",
        backendSuccessResponse: "",
      };
    });
    const { emailValue } = recoverForm;
    if (!emailValue) {
      setRecoverForm((previousForm) => {
        return {
          ...previousForm,
          frontendErrors: "Please enter your email.",
        };
      });
    } else if (emailValue && !isEmail(emailValue)) {
      setRecoverForm((previousForm) => {
        return {
          ...previousForm,
          frontendErrors: "Please enter your valid email.",
        };
      });
    } else {
      setRecoverForm((previousForm) => {
        return {
          ...previousForm,
          frontendErrors: "",
          emailValue: "",
        };
      });
    }
    const reqBody = {
      email: emailValue,
    };
    let response;
    try {
      setIsLoading(true);
      response = await doAxios.post(REQUEST_RESET_ACCOUNT_URL, reqBody);
      if (response && response.status == 200 && response.data) {
        setRecoverForm(() => {
          return {
            ...initialData,
            backendSuccessResponse: response.data.message,
            frontendErrors: "",
          };
        });
      } else if (response.data) {
        setRecoverForm((previousForm) => {
          return {
            ...previousForm,
            backendErrors: response.data.errorDescription,
          };
        });
      }
      // eslint-disable-next-line no-unused-vars
    } catch (ignored) {
      setRecoverForm((previousForm) => {
        return {
          ...previousForm,
          backendErrors:
            ignored.response?.data?.errorDescription ||
            "Sorry, the server is currently down. Please try again later.",
        };
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="rethink-login">
      <FormContainer
        title="Recover account"
        onSubmit={(event) => handleSubmitForm(event)}
      >
        <div className="rethink-login__sub-header">
          Please enter your email:
        </div>
        {(recoverForm.frontendErrors || recoverForm.backendErrors) && (
          <div className="rethink__form-control">
            <div className="error-message">
              {recoverForm.frontendErrors || recoverForm.backendErrors}
            </div>
          </div>
        )}
        {recoverForm.backendSuccessResponse && (
          <div className="rethink__form-control">
            <div className="success-message">
              {recoverForm.backendSuccessResponse}
            </div>
          </div>
        )}

        <FormInput
          id="email"
          name="email"
          placeholder="Email"
          onChange={(event) => handleChangeFormChange(event)}
          value={recoverForm.emailValue}
        />

        <Button disabled={isLoading} label="RECOVER"></Button>
        <div className="create-account">
          <span>Remember your password? </span>
          <Link className="register" to="/auth/login">
            Back to login
          </Link>
        </div>
      </FormContainer>
    </div>
  );
}
