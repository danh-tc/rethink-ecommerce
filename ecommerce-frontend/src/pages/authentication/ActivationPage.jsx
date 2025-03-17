import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FormContainer } from "../../components";
import { ACTIVATION_URL } from "../../constants/authenticationContants";
import doAxios from "../../services/axiosService";

// Fix strict mode in local
let isCall = false;
export default function AuthActivationPage() {
  const location = useLocation();
  const [activatedState, setActivatedState] = useState({
    activated: false,
    didActivated: false,
  });
  const code = new URLSearchParams(location.search)?.get("code");

  useEffect(() => {
    const regex = /^\d{6}$/;
    if (code && regex.test(code) && !isCall) {
      isCall = true;
      activateAccount(code);
    }
  }, [code]);

  async function activateAccount(code) {
    let response;
    try {
      response = await doAxios.get(ACTIVATION_URL + code);
      if (response && response.status == 200 && response.data) {
        setActivatedState({ activated: true, didActivated: true });
      } else {
        setActivatedState({ activated: false, didActivated: true });
      }
      // eslint-disable-next-line no-unused-vars
    } catch (ignored) {
      setActivatedState({
        activated: false,
        didActivated: true,
        errorMessage: ignored.response.data.error,
      });
    }
  }

  return (
    <div className="rethink-login">
      <FormContainer title="Account activation">
        {!activatedState.didActivated && (
          <div className="rethink-login__sub-header">
            Please wait a few seconds, your account is activating ...
          </div>
        )}
        {activatedState.didActivated && !activatedState.activated && (
          <div className="rethink__form-control">
            <div className="error-message">
              {activatedState.errorMessage ||
                "Sorry, the server is currently down. Please try again later."}
            </div>
          </div>
        )}
        {activatedState.didActivated && activatedState.activated && (
          <div className="rethink__form-control">
            <div className="success-message">
              Congratulation, your account has been activated. Please click
              <Link to="/auth/login"> here</Link> to login.
            </div>
          </div>
        )}
      </FormContainer>
    </div>
  );
}
