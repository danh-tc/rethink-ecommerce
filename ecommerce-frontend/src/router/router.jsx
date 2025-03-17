import { createBrowserRouter } from "react-router-dom";
import {
  RootLayout,
  HomePage,
  ProductCreatingPage,
  AdminRootPage,
  CategoryCreatingPage,
  AuthRecoverPage,
  AuthChangePassword,
  AuthLoginPage,
  AuthRegisterPage,
  AuthActivationPage,
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
          { path: "register", element: <AuthRegisterPage /> },
          { path: "login", element: <AuthLoginPage /> },
          {
            path: "activate-account",
            element: <AuthActivationPage />,
          },
          {
            path: "reset-account",
            element: <AuthRecoverPage />,
          },
          {
            path: "change-password",
            element: <AuthChangePassword />,
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
