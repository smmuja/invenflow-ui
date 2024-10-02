import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  LoginPage,
  HomePage,
  ProductDetailEditPage,
  ProductsAddPage,
  ProductsDashboardPage,
  RegisterPage,
  PartnersExplorePage,
  DashboardProfileEdit,
  DashboardProfileNew,
} from "./pages";
import { AuthProvider } from "./context/AuthContext.jsx";

import { action as registerAction } from "./pages/Register.jsx";
import { action as loginAction } from "./pages/Login.jsx";
import { action as productsAddAction } from "./pages/ProductsAdd.jsx";
import { action as productsDetailEditAction } from "./pages/ProductDetailEdit.jsx";
import { action as profileEditAction } from "./pages/DashboardProfileEdit.jsx";
import { action as profileNewAction } from "./pages/DashboardProfileNew.jsx";

import { loader as productsLoader } from "./pages/ProductsDashboardPage.jsx";
import {
  loader as productsAllLoader,
  ProductsExplorePage,
} from "./pages/ProductsExplore.jsx";
import { loader as productsDetailEditLoader } from "./pages/ProductDetailEdit.jsx";
import { loader as productExploreDetailLoader } from "./pages/ProductsExploreDetail.jsx";
import { loader as usersLoaderData } from "./pages/PartnersExplore.jsx";
import { loader as userDetailLoaderData } from "./pages/PartnersDetail.jsx";
import { loader as profileDetailLoader } from "./pages/DashboardProfileEdit.jsx";

import { DashboardLayout, PublicLayout } from "./layout";
import { RouteProtection } from "./components/RouteProtection.jsx";
import { ProductsExploreDetailPage } from "./pages/ProductsExploreDetail.jsx";
import { PartnersDetailPage } from "./pages/PartnersDetail.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

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
        path: "/login",
        action: loginAction,
        element: <LoginPage />,
      },
      {
        path: "/register",
        action: registerAction,
        element: <RegisterPage />,
      },
      {
        path: "/explore/products",
        loader: productsAllLoader,
        element: <ProductsExplorePage />,
      },
      {
        path: "/explore/products/:productId",
        loader: productExploreDetailLoader,
        element: <ProductsExploreDetailPage />,
      },

      {
        path: "/explore/partners",
        loader: usersLoaderData,
        element: <PartnersExplorePage />,
      },
      {
        path: "/explore/partners/:username",
        loader: userDetailLoaderData,
        element: <PartnersDetailPage />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "*",
        element: <div className="p-4">Nothing found</div>,
      },
    ],
  },

  {
    path: "/dashboard/products",
    element: (
      <RouteProtection>
        <DashboardLayout />
      </RouteProtection>
    ),
    children: [
      {
        index: true,
        loader: productsLoader,
        element: <ProductsDashboardPage />,
      },
      {
        path: "new",
        action: productsAddAction,
        element: <ProductsAddPage />,
      },
      {
        path: ":productId",
        loader: productsDetailEditLoader,
        action: productsDetailEditAction,
        element: <ProductDetailEditPage />,
      },
    ],
  },
  {
    path: "/dashboard/profile/:username",
    element: (
      <RouteProtection>
        <DashboardLayout />
      </RouteProtection>
    ),
    children: [
      {
        index: true,
        loader: userDetailLoaderData,
        element: <PartnersDetailPage />,
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
