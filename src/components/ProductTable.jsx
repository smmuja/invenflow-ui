import { Link } from "react-router-dom";
import { currencyFormatter, firstEachWordCapitalize } from "../utils";

export function ProductTable({ products, onDelete }) {
  return (
    <>
      <div className=" w-11/12 overflow-x-scroll md:overflow-auto border-2">
        <table className="md:min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-2 md:px-4 border-b">Name</th>
              <th className="py-2 px-2 md:px-4 border-b">Price</th>
              <th className="py-2 px-2 md:px-4 border-b">Quantity</th>
              <th className="py-2 px-2 md:px-4 border-b">Category</th>
              <th className="py-2 px-2 md:px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="py-2 px-2 md:px-4 border-b">
                  {firstEachWordCapitalize(product.name)}
                </td>
                <td className="py-2 px-2 md:px-4 border-b">
                  {currencyFormatter(product.price)}
                </td>
                <td className="py-2 px-2 md:px-4 border-b">
                  {product.quantity}
                </td>
                <td className="py-2 px-2 md:px-4 border-b">
                  {product.category}
                </td>
                <td className="py-2 px-2 md:px-4 border-b">
                  <Link
                    to={`/dashboard/products/${product._id}`}
                    className="px-2 py-1 text-white bg-green-500 rounded ml-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => onDelete(product._id)}
                    className="px-2 py-1 text-white bg-red-500 rounded ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
