import { Navigate, useActionData, useLoaderData } from "react-router-dom";
import { ProductForm } from "../components/ProductForm";
import { baseApi } from "../config/baseApi";
// import { useAuth } from "../context/AuthContext";

// const token = localStorage.getItem("token");
// const { token } = useAuth();

export async function loader({ params }) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${baseApi}/products/${params.productId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log({ product });
  if (response.ok) {
    const product = await response.json();
    // return { products: products.data };
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

  if (response) {
    return { success: true };
  } else {
    return { error: "Failed to update product" };
  }

  // if (response.ok) {
  //   const result = await response.json();
  //   return { success: true, product: result.data };
  // } else {
  //   const errorMessage = await response.text();
  //   return { error: `Failed to update product: ${errorMessage}` };
  // }
}

export function ProductDetailEditPage() {
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
