import { FormContainer, FormInput, Button } from "../../components/index";
import "./_recover.scss";
import { RESET_ACCOUNT_URL } from "../../constants/authenticationContants";
import { useState } from "react";
import { hasMaxLength, hasMinLength } from "../../utils/validateForm";
import doAxios from "../../services/axiosService";
import { Link, useLocation } from "react-router-dom";

export default function AuthChangePassword() {
  const [recoverForm, setRecoverForm] = useState({
    passwordValue: "",
    repasswordValue: "",
    backendErrors: "",
    frontendErrors: "",
    backendSuccessResponse: "",
  });

  const location = useLocation();
  const code = new URLSearchParams(location.search)?.get("code");

  const [isLoading, setIsLoading] = useState(false);

  const handleChangeFormChange = (event) => {
    if (event.target.id === "password") {
      setRecoverForm((previousForm) => {
        return { ...previousForm, passwordValue: event.target.value };
      });
    } else if (event.target.id === "repassword") {
      setRecoverForm((previousForm) => {
        return { ...previousForm, repasswordValue: event.target.value };
      });
    }
  };

  async function handleSubmitForm(event) {
    event.preventDefault();
    // Clear all errors message when submiting
    setRecoverForm((previousForm) => {
      return {
        ...previousForm,
        backendErrors: "",
        frontendErrors: "",
        backendSuccessResponse: "",
      };
    });
    const { passwordValue, repasswordValue } = recoverForm;
    if (!passwordValue || !repasswordValue) {
      setRecoverForm((previousForm) => {
        return {
          ...previousForm,
          frontendErrors: "Please enter your password and confirm passowrd.",
        };
      });
    } else if (
      passwordValue &&
      (!hasMinLength(passwordValue, 8) || !hasMaxLength(passwordValue, 50))
    ) {
      setRecoverForm((previousForm) => {
        return {
          ...previousForm,
          frontendErrors:
            "Passwords must be at least 8 characters long and must not exceed 50 characters.",
        };
      });
    } else if (passwordValue !== repasswordValue) {
      setRecoverForm((previousForm) => {
        return {
          ...previousForm,
          frontendErrors: "Password and confirm password do not match.",
        };
      });
    } else {
      setRecoverForm((previousForm) => {
        return {
          ...previousForm,
          frontendErrors: "",
        };
      });
    }
    const reqBody = {
      token: code,
      password: passwordValue,
    };
    let response;
    try {
      setIsLoading(true);
      response = await doAxios.post(RESET_ACCOUNT_URL, reqBody);
      if (response && response.status == 200 && response.data) {
        setRecoverForm((previousForm) => {
          return {
            ...previousForm,
            frontendErrors: "",
            passwordValue: "",
            repasswordValue: "",
            backendSuccessResponse: true,
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
    <div className="rethink-auth rethink-recover">
      <FormContainer
        title="Reset password"
        onSubmit={(event) => handleSubmitForm(event)}
      >
        <div className="rethink-auth__sub-header">Please enter your email:</div>
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
              Your account was reset successfully. Please kindly click
              <Link to="/auth/login"> here</Link> to process login. Thank you.
            </div>
          </div>
        )}

        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Password"
          isHideLablel={!recoverForm.passwordValue}
          onChange={(event) => handleChangeFormChange(event)}
          value={recoverForm.passwordValue}
        />

        <FormInput
          id="repassword"
          name="repassword"
          type="password"
          label="Confirm Password"
          isHideLablel={!recoverForm.repasswordValue}
          placeholder="Confirm Password"
          onChange={(event) => handleChangeFormChange(event)}
          value={recoverForm.repasswordValue}
        />

        <Button disabled={isLoading} label="RESET"></Button>
      </FormContainer>
    </div>
  );
}
