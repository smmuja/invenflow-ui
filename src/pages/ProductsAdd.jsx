import { Navigate, useActionData } from "react-router-dom";
import { ProductForm } from "../components/ProductForm";
import { baseApi } from "../config/baseApi";
import { dashboardProductUrl } from "../config/paths";

export async function action({ request }) {
  const formData = await request.formData();
  const newProduct = {
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    category: formData.get("category"),
  };

  const token = localStorage.getItem("token");

  const response = await fetch(`${baseApi}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newProduct),
  });

  if (response) {
    return { success: true };
  } else {
    return { error: "Failed to create product" };
  }
}

export function ProductsAddPage() {
  const actionData = useActionData();

  if (actionData?.error) {
    return <div className="text-red-500">{actionData.error}</div>;
  }
  if (actionData?.success) {
    return <Navigate to={dashboardProductUrl} />;
  }

  return (
    <>
      <ProductForm />
    </>
  );
}
