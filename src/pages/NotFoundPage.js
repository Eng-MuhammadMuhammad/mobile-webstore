import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 text-gray-400 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/">
            <Button variant="primary" size="lg">
              Go to Homepage
            </Button>
          </Link>
          <Link to="/products">
            <Button variant="secondary" size="lg">
              Browse Products
            </Button>
          </Link>
        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8 w-full max-w-2xl">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            You might be looking for:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/products/smartphones"
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Smartphones
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Browse our latest smartphone collection
              </p>
            </Link>
            <Link
              to="/products/tablets"
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Tablets
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Explore our tablet selection
              </p>
            </Link>
            <Link
              to="/products/wearables"
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Wearables
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Check out our smartwatches and fitness trackers
              </p>
            </Link>
            <Link
              to="/products/accessories"
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                Accessories
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Find cases, chargers, and more
              </p>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
