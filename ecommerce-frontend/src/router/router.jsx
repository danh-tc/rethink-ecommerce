import { createBrowserRouter } from "react-router-dom";
import {
  RootLayout,
  LoginPage,
  RegisterPage,
  Thankyou,
  ActivationPage,
  HomePage,
  ResetAccountPage,
  ChangePasswordPage,
} from "../pages/index";
import UnAuthenticatedRoute from "../utils/UnAuthenticatedRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/auth",
        element: <UnAuthenticatedRoute />,
        children: [
          { path: "register", element: <RegisterPage /> },
          { path: "login", element: <LoginPage /> },
          { path: "thank-you", element: <Thankyou /> },
          {
            path: "activate-account",
            element: <ActivationPage />,
          },
          {
            path: "reset-account",
            element: <ResetAccountPage />,
          },
          {
            path: "change-password",
            element: <ChangePasswordPage />,
          },
        ],
      },
    ],
  },
]);
