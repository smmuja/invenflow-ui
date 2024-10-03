import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  authLoginUrl,
  authRegisterUrl,
  dashboardProductUrl,
  dashboardProfileUrl,
  exploreProductUrl,
  exploreUserUrl,
} from "./config/paths.js";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  DashboardProductsPage,
  DashboardProductsAddPage,
  DashboardProductDetailEditPage,
  DashboardProfileDetailPage,
  DashboardProfileEdit,
  DashboardProfileNew,
  ExploreUsersPage,
  ExploreUserDetailPage,
  ExploreProductDetailPage,
  ExploreProductsPage,
} from "./pages";
import { AuthProvider } from "./context/AuthContext.jsx";

import { action as registerAction } from "./pages/auth/Register.jsx";
import { action as loginAction } from "./pages/auth/Login.jsx";
import { action as productsAddAction } from "./pages/dashboard/DashboardProductsAdd.jsx";
import { action as productsDetailEditAction } from "./pages/dashboard/DashboardProductDetailEdit.jsx";
import { action as profileEditAction } from "./pages/dashboard/DashboardProfileEdit.jsx";
import { action as profileNewAction } from "./pages/dashboard/DashboardProfileNew.jsx";

import { loader as productsLoader } from "./pages/dashboard/DashboardProducts.jsx";
import { loader as productsAllLoader } from "./pages/explore/ExploreProducts.jsx";
import { loader as productsDetailEditLoader } from "./pages/dashboard/DashboardProductDetailEdit.jsx";
import { loader as productExploreDetailLoader } from "./pages/explore/ExploreProductDetail.jsx";
import { loader as usersLoaderData } from "./pages/explore/ExploreUsers.jsx";
import { loader as userDetailLoaderData } from "./pages/explore/ExploreUserDetail.jsx";
import { loader as profileDetailLoader } from "./pages/dashboard/DashboardProfileEdit.jsx";

import { DashboardLayout, PublicLayout } from "./layout";
import { RouteProtection } from "./components/common/RouteProtection.jsx";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout></PublicLayout>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: authLoginUrl,
        action: loginAction,
        element: <LoginPage />,
      },
      {
        path: authRegisterUrl,
        action: registerAction,
        element: <RegisterPage />,
      },
      {
        path: exploreProductUrl,
        loader: productsAllLoader,
        element: <ExploreProductsPage />,
      },
      {
        path: `${exploreProductUrl}/:productId`,
        loader: productExploreDetailLoader,
        element: <ExploreProductDetailPage />,
      },

      {
        path: exploreUserUrl,
        loader: usersLoaderData,
        element: <ExploreUsersPage />,
      },
      {
        path: `${exploreUserUrl}/:username`,
        loader: userDetailLoaderData,
        element: <ExploreUserDetailPage />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "*",
        element: <div className="p-4">Nothing found</div>,
      },
    ],
  },

  {
    path: dashboardProductUrl,
    element: (
      <RouteProtection>
        <DashboardLayout />
      </RouteProtection>
    ),
    children: [
      {
        index: true,
        loader: productsLoader,
        element: <DashboardProductsPage />,
      },
      {
        path: "new",
        action: productsAddAction,
        element: <DashboardProductsAddPage />,
      },
      {
        path: ":productId",
        loader: productsDetailEditLoader,
        action: productsDetailEditAction,
        element: <DashboardProductDetailEditPage />,
      },
    ],
  },
  {
    path: `${dashboardProfileUrl}/:username`,
    element: (
      <RouteProtection>
        <DashboardLayout />
      </RouteProtection>
    ),
    children: [
      {
        index: true,
        loader: userDetailLoaderData,
        element: <DashboardProfileDetailPage />,
      },

      {
        path: "edit",
        loader: profileDetailLoader,
        action: profileEditAction,
        element: <DashboardProfileEdit />,
      },
      {
        path: "new",
        action: profileNewAction,
        element: <DashboardProfileNew />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
