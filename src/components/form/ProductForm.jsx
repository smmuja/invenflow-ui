import { Form, useActionData, useNavigate } from "react-router-dom";
import { dashboardProductUrl } from "@/config/paths";
import { Input, Select } from "./base";

export function ProductForm({ product = {} }) {
  const actionData = useActionData();

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };

  const categoriesOptions = [
    "fruit",
    "fashion",
    "food",
    "flower",
    "accessories",
    "drink",
  ];

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
          <h2 className="text-2xl font-black text-center">
            {" "}
            {product._id ? "Edit Product" : "Add Product"}{" "}
          </h2>
          {actionData?.error && (
            <p className="text-red-500">{actionData.error}</p>
          )}

          <Form
            method={product._id ? "PUT" : "POST"}
            action={
              product._id
                ? `${dashboardProductUrl}/${product._id}`
                : `${dashboardProductUrl}/new`
            }
          >
            <div className="space-y-4">
              <Input
                label="Name"
                type="text"
                name="name"
                id="name"
                required
                placeholder="Product Name"
                defaultValue={product.name}
              />
              <Input
                label="Price"
                type="number"
                name="price"
                id="price"
                required
                placeholder="0"
                defaultValue={product.price}
              />
              <Input
                label="Quantity"
                type="number"
                name="quantity"
                id="quantity"
                required
                placeholder="0"
                defaultValue={product.quantity}
              />

              <Select
                label="Category"
                name="category"
                id="category"
                options={categoriesOptions}
                defaultValue={product?.category || ""}
                placeholder="Select Category"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleCancel}
                  className=" bg-gray-300 px-4 py-2 rounded-md "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className=" bg-blue-500 px-4 py-2 rounded-md text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
