import { FormContainer, FormInput, Button } from "../../components/index";
import "./_login.scss";
import { REGISTER_URL } from "../../constants/authenticationContants";
import { useState } from "react";
import { hasMaxLength, hasMinLength, isEmail } from "../../utils/validateForm";
import doAxios from "../../services/axiosService";

export default function AuthRegisterPage() {
  const initalData = {
    firstName: "",
    lastName: "",
    emailValue: "",
    passwordValue: "",
    frontendErrors: "",
    backendErrors: "",
    backendSuccessResponse: "",
  };
  const [registerForm, setRegisterForm] = useState(initalData);

  const [isLoading, setIsLoading] = useState(false);

  const handleChangeFormChange = (event) => {
    if (event.target.id === "email") {
      setRegisterForm((previousForm) => {
        return { ...previousForm, emailValue: event.target.value };
      });
    } else if (event.target.id === "password") {
      setRegisterForm((previousForm) => {
        return { ...previousForm, passwordValue: event.target.value };
      });
    } else if (event.target.id === "firstName") {
      setRegisterForm((previousForm) => {
        return { ...previousForm, firstName: event.target.value };
      });
    } else if (event.target.id === "lastName") {
      setRegisterForm((previousForm) => {
        return { ...previousForm, lastName: event.target.value };
      });
    }
  };

  async function handleSubmitForm(event) {
    event.preventDefault();
    // Clear all errors message when submiting
    setRegisterForm((previousForm) => {
      return {
        ...previousForm,
        frontendErrors: "",
        backendErrors: "",
        backendSuccessResponse: "",
      };
    });
    const { emailValue, passwordValue, firstName, lastName } = registerForm;
    if (!emailValue || !passwordValue || !firstName || !lastName) {
      setRegisterForm((previousForm) => {
        return {
          ...previousForm,
          frontendErrors: "Please fill out the form.",
        };
      });
    } else if (emailValue && !isEmail(emailValue)) {
      setRegisterForm((previousForm) => {
        return {
          ...previousForm,
          frontendErrors: "Please input a valid email.",
        };
      });
    } else if (
      passwordValue &&
      (!hasMinLength(passwordValue, 8) || !hasMaxLength(passwordValue, 50))
    ) {
      setRegisterForm((previousForm) => {
        return {
          ...previousForm,
          frontendErrors:
            "Passwords must be at least 8 characters long and must not exceed 50 characters.",
        };
      });
    } else {
      setRegisterForm((previousForm) => {
        return {
          ...previousForm,
          frontendErrors: "",
        };
      });
    }
    const reqBody = {
      email: emailValue,
      password: passwordValue,
      firstName: firstName,
      lastName: lastName,
    };
    let response;
    try {
      setIsLoading(true);
      response = await doAxios.post(REGISTER_URL, reqBody);
      if (response && response.status == 200 && response.data) {
        setRegisterForm(() => {
          return {
            ...initalData,
            backendSuccessResponse: response.data.message,
          };
        });
      } else if (response.data) {
        setRegisterForm((previousForm) => {
          return {
            ...previousForm,
            backendErrors: response.data.errorDescription,
          };
        });
      }
      // eslint-disable-next-line no-unused-vars
    } catch (ignored) {
      setRegisterForm((previousForm) => {
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
        title="Register"
        onSubmit={(event) => handleSubmitForm(event)}
      >
        <div className="rethink-login__sub-header">
          Please fill in the information below:
        </div>
        {(registerForm.frontendErrors || registerForm.backendErrors) && (
          <div className="rethink__form-control">
            <div className="rethink-login__error">
              {registerForm.frontendErrors || registerForm.backendErrors}
            </div>
          </div>
        )}
        {registerForm.backendSuccessResponse && (
          <div className="rethink__form-control">
            <div className="success-message">
              {registerForm.backendSuccessResponse}
            </div>
          </div>
        )}

        <FormInput
          id="firstName"
          name="firstName"
          type="text"
          placeholder="First Name"
          onChange={(event) => handleChangeFormChange(event)}
          value={registerForm.firstName}
        />

        <FormInput
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Last Name"
          onChange={(event) => handleChangeFormChange(event)}
          value={registerForm.lastName}
        />

        <FormInput
          id="email"
          name="email"
          placeholder="Email"
          onChange={(event) => handleChangeFormChange(event)}
          value={registerForm.emailValue}
        />

        <FormInput
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          onChange={(event) => handleChangeFormChange(event)}
          value={registerForm.passwordValue}
        />

        <Button disabled={isLoading} label="Create my account"></Button>
      </FormContainer>
    </div>
  );
}
