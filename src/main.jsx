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
} from "./pages";
import { AuthProvider } from "./context/AuthContext.jsx";

import { action as registerAction } from "./pages/Register.jsx";
import { action as loginAction } from "./pages/Login.jsx";
import { action as productsAddAction } from "./pages/ProductsAdd.jsx";
import { action as productsDetailEditAction } from "./pages/ProductDetailEdit.jsx";

import { loader as productsLoader } from "./pages/ProductsDashboardPage.jsx";
import { loader as productsAllLoader } from "./pages/AllProducts.jsx";
import { loader as productsDetailEditLoader } from "./pages/ProductDetailEdit.jsx";

import { DashboardLayout, PublicLayout } from "./layout";
import { RouteProtection } from "./components/RouteProtection.jsx";
import { AllProductsPage } from "./pages/AllProducts.jsx";

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
        element: <AllProductsPage />,
      },
      {
        path: "/explore/products/:id",
        loader: productsAllLoader,
        element: <AllProductsPage />,
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
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
