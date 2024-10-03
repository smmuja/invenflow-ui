import { Navigate, useActionData, useLoaderData } from "react-router-dom";
import { ProductForm } from "@/components/form";
import { baseApi } from "@/config/baseApi";

export async function loader({ params }) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${baseApi}/products/${params.productId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const product = await response.json();
    return { product: product.data };
  } else {
    return { error: "Failed to fetch product detail" };
  }
}

export async function action({ request, params }) {
  const token = localStorage.getItem("token");

  const formData = await request.formData();
  const updateProduct = {
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    category: formData.get("category"),
  };

  const response = await fetch(`${baseApi}/products/${params.productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(updateProduct),
  });

  if (response.status === 403) {
    alert("You do not have access to perform this operation");
    window.location.href = "/";
    return;
  }
  if (response) {
    return { success: true };
  } else {
    return { error: "Failed to update product" };
  }
}

export function DashboardProductDetailEditPage() {
  const { product } = useLoaderData();
  const actionData = useActionData();

  if (actionData?.error) {
    return <div className="text-red-500">{actionData.error}</div>;
  }

  if (actionData?.success) {
    return <Navigate to="/products" />;
  }

  return (
    <>
      <ProductForm product={product} />
    </>
  );
}
