import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { ProductTable } from "../components/ProductTable";
import { baseApi } from "../config/baseApi";
import useModal from "../hooks/useModal";
import { useState } from "react";
import { ModalConfirmation } from "../components/ModalConfirmation";
import usePagination from "../hooks/usePagination";
import { useAuth } from "../context/AuthContext";

export async function loader() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${baseApi}/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401 && !response.ok) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    alert("Login expired");
  }

  if (response.ok) {
    const products = await response.json();
    return { products: products.data };
  } else {
    return { error: "Failed to fetch products" };
  }
}

export function ProductsPage() {
  const { token } = useAuth();

  const loaderData = useLoaderData();
  const products = loaderData.products;
  const { currentPage, setCurrentPage, paginatedData, totalPage } =
    usePagination(products, 10);

  if (loaderData?.error) {
    return <div>Something went wrong. Please refresh</div>;
  }

  const navigate = useNavigate();

  const { isModalOpen, openModal, closeModal } = useModal();

  const [modalMessage, setModalMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);

  const handleDelete = (productId) => {
    setModalMessage("Are you sure you want to delete this product?");
    setConfirmAction(() => async () => {
      await fetch(`${baseApi}/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      alert(`Product ID ${productId} deleted successfully`);
      closeModal();
      navigate("/products");
    });
    openModal();
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-4 w-11/12 md:w-full">
          <h1 className="text-2xl font-bold ">Products</h1>
          <Link
            to="/products/new"
            className="px-4 py-2 text-white bg-blue-500 rounded"
          >
            Add Product
          </Link>
        </div>
        <ProductTable products={paginatedData} onDelete={handleDelete} />

        <p className="text-end mt-3">
          Page {currentPage} of {totalPage}
        </p>
        <div className="flex gap-4 justify-end mt-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={paginatedData.length < 10}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Next
          </button>
        </div>
        {isModalOpen && (
          <ModalConfirmation
            message={modalMessage}
            onConfirm={confirmAction}
            onCancel={closeModal}
          />
        )}
      </div>
    </>
  );
}
