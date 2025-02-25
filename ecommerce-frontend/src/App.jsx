import "./scss/main.scss";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import doAxios from "./services/axiosService";
import { REFRESH_TOKEN_URL } from "./constants/authenticationContants";
import { useDispatch } from "react-redux";
import { authenticationActions } from "./store/authenticationSlice";

let hasRun = false;
// FIX strict mode in dev environtment
function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuthenticationStatus = async () => {
      try {
        const response = await doAxios.post(REFRESH_TOKEN_URL);
        if (response.status === 200) {
          const userProfileDTO = response.data;
          dispatch(authenticationActions.authenticate(userProfileDTO));
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    if (!hasRun) {
      checkAuthenticationStatus();
      hasRun = true;
    }
  }, [dispatch]);
  return loading ? (
    <div className="centered-container loader-container">
      <PulseLoader
        id="loader"
        loading={true}
        size={30}
        aria-label="Loading Spinner"
      />
    </div>
  ) : (
    <RouterProvider router={router} />
  );
}

export default App;
