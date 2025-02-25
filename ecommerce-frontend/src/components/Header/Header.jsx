import { Link, useLocation } from "react-router-dom";
import "./_header.scss";
import { useDispatch, useSelector } from "react-redux";
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import doAxios from "../../services/axiosService";
import { authenticationActions } from "../../store/authenticationSlice";
import { images } from "../../constants";

export default function Header() {
  const location = useLocation();
  const isAuthentication = useSelector((state) => state.auth.isAuthenticated);
  const userProfile = useSelector((state) => state.auth.userProfile);
  const dispatch = useDispatch();

  const callSecureEndpoint = async () => {
    const response = await doAxios.get("http://localhost:8080/api/v1/secure-endpoint");
    console.log(response);
  };

  const doLogout = async () => {
    const response = await doAxios.post(
      "http://localhost:8080/api/v1/auth/logout"
    );
    dispatch(authenticationActions.unAuthenticate());
    console.log(response);
  };
  return (
    <div className="app__header">
      <div className="app__header__logo">
        <Link to="/" state={{ previousUrl: location.pathname }}>
          <img src={images.rethinkMainLogo} alt="rethink-logo" />
        </Link>
      </div>
      <div className="app__header__nav-bar">
        <Link to="/" state={{ previousUrl: location.pathname }}>
          Home
        </Link>
        <button onClick={callSecureEndpoint}>Secure Enpoint</button>
        <div>DUMMY ITEM</div>
        <div>DUMMY ITEM</div>
        <div>DUMMY ITEM</div>
        <div>DUMMY ITEM</div>
        <button onClick={doLogout}>LOG OUT TEST</button>
      </div>
      <div className="app__header__icons">
        <FaSearch />
        <FaShoppingCart />
        <Link
          className="user-group"
          to="/auth/login"
          state={{ previousUrl: location.pathname }}
        >
          <FaUser />
          {isAuthentication && userProfile && (
            <p className="user-info">Hi, {userProfile.firstName}</p>
          )}
          {/* TODO dynamic name instead of Hi, Danh -> Hi, Someone Else */}
        </Link>
      </div>
    </div>
  );
}
