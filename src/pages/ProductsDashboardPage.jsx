import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { ProductTable } from "../components/ProductTable";
import { baseApi } from "../config/baseApi";
import useModal from "../hooks/useModal";
import { useState } from "react";
import { ModalConfirmation } from "../components/ModalConfirmation";
import usePagination from "../hooks/usePagination";
import { useAuth } from "../context/AuthContext";
import { dashboardProductUrl } from "../config/paths";

export async function loader() {
  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const username = currentUser?.username;

  const response = await fetch(`${baseApi}/users/${username}/products`, {
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
    return { products: products.data || [] };
  } else {
    return { error: "Failed to fetch products" };
  }
}

export function ProductsDashboardPage() {
  const { token } = useAuth();

  const loaderData = useLoaderData();
  const products = loaderData.products || [];
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
      try {
        const response = await fetch(`${baseApi}/products/${productId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 403) {
          alert("You don not have access to perform this operation");
          window.location.href = "/";
          return;
        } else if (response.ok) {
          alert(`Product ID ${productId} deleted successfully`);
          closeModal();
          navigate("/products");
        } else {
          alert("Failed to delete product");
        }
      } catch (error) {
        console.error("Error deleting product", error);
        alert("An error occurred while deleting the product");
      }
    });
    openModal();
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-4 w-11/12 md:w-full">
          <h1 className="text-2xl font-bold ">Products</h1>
          <Link
            to={`${dashboardProductUrl}/new`}
            className="px-4 py-2 text-white bg-blue-500 rounded"
          >
            Add Product
          </Link>
        </div>

        {products.length > 0 ? (
          <>
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
          </>
        ) : (
          <h2>No product yet</h2>
        )}

        <></>
      </div>
    </>
  );
}
