import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-teal-100 flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-7xl font-bold text-teal-600">404</h1>
      <p className="mt-4 text-xl font-semibold text-gray-700">
        Oops! Page not found
      </p>
      <p className="text-gray-600 mt-2">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/login"
        className="mt-6 inline-block px-4 py-2 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
