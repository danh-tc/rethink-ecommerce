import { Link, useLocation, useNavigate } from "react-router-dom";
import { FormContainer, FormInput, Button } from "../../components/index";
import "./_login.scss";
import { LOGIN_URL } from "../../constants/authenticationContants";
import { useDispatch } from "react-redux";
import { authenticationActions } from "../../store/authenticationSlice";
import { useState } from "react";
import { isEmail } from "../../utils/validateForm";
import doAxios from "../../services/axiosService";

export default function AuthLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [loginForm, setLoginForm] = useState({
    emailValue: null,
    passwordValue: null,
    frontendErrors: null,
    backendErrors: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChangeFormChange = (event) => {
    if (event.target.id === "email") {
      setLoginForm((previousForm) => {
        return { ...previousForm, emailValue: event.target.value };
      });
    } else if (event.target.id === "password") {
      setLoginForm((previousForm) => {
        return { ...previousForm, passwordValue: event.target.value };
      });
    }
  };

  async function handleSubmitForm(event) {
    event.preventDefault();
    // Clear all errors message when submiting
    setLoginForm((previousForm) => {
      return {
        ...previousForm,
        frontendErrors: null,
        backendErrors: null,
      };
    });
    const { emailValue, passwordValue } = loginForm;
    if (!emailValue || !passwordValue) {
      setLoginForm((previousForm) => {
        return {
          ...previousForm,
          frontendErrors: "Please input your email and password.",
        };
      });
    } else if (emailValue && !isEmail(emailValue)) {
      setLoginForm((previousForm) => {
        return {
          ...previousForm,
          frontendErrors: "Please a valid email.",
        };
      });
    } else {
      setLoginForm((previousForm) => {
        return {
          ...previousForm,
          frontendErrors: null,
        };
      });
    }
    const reqBody = {
      email: emailValue,
      password: passwordValue,
    };
    let response;
    try {
      setIsLoading(true);
      response = await doAxios.post(LOGIN_URL, reqBody);
      if (response && response.status == 200 && response.data) {
        const { userProfileDTO } = response;
        dispatch(authenticationActions.authenticate(userProfileDTO));
        let navigateTo = location?.state?.previousUrl || "/";
        if (navigateTo.includes("login") || navigateTo.includes("register"))
          navigateTo = "/";
        navigate(navigateTo);
      } else if (response.data) {
        setLoginForm((previousForm) => {
          return {
            ...previousForm,
            backendErrors: response.data.errorDescription,
          };
        });
      }
      // eslint-disable-next-line no-unused-vars
    } catch (ignored) {
      setLoginForm((previousForm) => {
        return {
          ...previousForm,
          backendErrors:
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
        title="Login"
        onSubmit={(event) => handleSubmitForm(event)}
      >
        <div className="rethink-login__sub-header">
          Please enter your e-mail and password:
        </div>
        {(loginForm.frontendErrors || loginForm.backendErrors) && (
          <div className="rethink__form-control">
            <div className="rethink-login__error">
              {loginForm.frontendErrors || loginForm.backendErrors}
            </div>
          </div>
        )}

        <FormInput
          id="email"
          name="email"
          placeholder="Email"
          onChange={(event) => handleChangeFormChange(event)}
          value={loginForm.emailValue}
        />
        <FormInput
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          onChange={(event) => handleChangeFormChange(event)}
          value={loginForm.passwordValue}
        >
          <Link className="reset-pwd" to="/auth/reset-account">
            Forgot password?
          </Link>
        </FormInput>

        <Button disabled={isLoading} label="Login"></Button>

        <div className="sub-text">
          To our loyal customers who weren&apos;t able to login to our new
          website, please kindly create a new account
        </div>
        <div className="create-account">
          <span>Don&apos;t have an account? </span>
          <Link className="register" to="/auth/register">
            Create an account
          </Link>
        </div>
      </FormContainer>
    </div>
  );
}
