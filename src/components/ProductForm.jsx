import { Form, useActionData, useNavigate } from "react-router-dom";

export function ProductForm({ product = {} }) {
  const actionData = useActionData();

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };

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
                ? `/dashboard/products/${product._id}`
                : "/dashboard/products/new"
            }
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={product.name}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  defaultValue={product.price}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  defaultValue={product.quantity}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  defaultValue={product.category}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
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
