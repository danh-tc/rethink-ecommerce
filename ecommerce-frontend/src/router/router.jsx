import { createBrowserRouter } from "react-router-dom";
import {
  RootLayout,
  AuthLoginPage,
  RegisterPage,
  Thankyou,
  ActivationPage,
  HomePage,
  ResetAccountPage,
  ChangePasswordPage,
  ProductCreatingPage,
  AdminRootPage,
  CategoryCreatingPage,
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
          { path: "login", element: <AuthLoginPage /> },
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
  {
    path: "/admin",
    element: <AdminRootPage />,
    children: [
      {
        path: "products",
        children: [{ path: "create", element: <ProductCreatingPage /> }],
      },
      {
        path: "categories",
        children: [{ path: "create", element: <CategoryCreatingPage /> }],
      },
    ],
  },
]);
