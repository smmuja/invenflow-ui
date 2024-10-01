import { useNavigate, useRouteError } from "react-router-dom";

function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  if (error.status === 404) {
    return (
      <>
        <h2>Not found</h2>
        <p onClick={() => navigate(-1)}>Go Back</p>
      </>
    );
  }

  return (
    <>
      <h2>An error occurred: {error.statusText}</h2>
      <p
        className="hover:cursor-pointer hover:underline mt-2"
        onClick={() => navigate(-1)}
      >
        ← Go Back
      </p>
    </>
  );
}

export default ErrorBoundary;
