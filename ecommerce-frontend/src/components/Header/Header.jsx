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
    const response = await doAxios.get(
      "http://localhost:8080/api/v1/secure-endpoint"
    );
    console.log(response);
  };

  const adminEndpoint = async () => {
    const response = await doAxios.get(
      "http://localhost:8080/api/v1/admin/admin-only"
    );
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
        <Link>New In</Link>
        <Link>Category</Link>
        <Link>Shop All</Link>
        <Link>Sale</Link>
        <button onClick={callSecureEndpoint}>Secure Enpoint</button>
        <button onClick={adminEndpoint}>ADMIN</button>
        <button onClick={doLogout}>LOG OUT TEST</button>
      </div>
      <div className="app__header__icons">
        <Link
          className="user-group"
          to="/auth/login"
          state={{ previousUrl: location.pathname }}
        >
          Account
        </Link>
        <button>Search</button>
        <Cart />
      </div>
    </div>
  );
}

function Cart() {
  return (
    <div className="rethink-cart">
      <svg viewBox="0 0 17 20">
        <path
          d="M0 20V4.995l1 .006v.015l4-.002V4c0-2.484 1.274-4 3.5-4C10.518 0 12 1.48 12 4v1.012l5-.003v.985H1V19h15V6.005h1V20H0zM11 4.49C11 2.267 10.507 1 8.5 1 6.5 1 6 2.27 6 4.49V5l5-.002V4.49z"
          fill="currentColor"
        ></path>
      </svg>
      <span className="rethink-cart-count">(0)</span>
    </div>
  );
}
