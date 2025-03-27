import React from "react";

// Skeleton loader for product cards
const ProductCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>

      {/* Content */}
      <div className="p-4">
        {/* Title placeholder */}
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>

        {/* Rating placeholder */}
        <div className="flex items-center mb-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded"
              ></div>
            ))}
          </div>
          <div className="w-10 h-4 bg-gray-300 dark:bg-gray-700 rounded ml-2"></div>
        </div>

        {/* Price placeholder */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
        </div>

        {/* Button placeholder */}
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
};

// Skeleton loader for product details
const ProductDetailSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image gallery placeholder */}
        <div>
          <div className="h-80 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-20 bg-gray-300 dark:bg-gray-700 rounded"
              ></div>
            ))}
          </div>
        </div>

        {/* Product info placeholder */}
        <div>
          {/* Title placeholder */}
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>

          {/* Rating placeholder */}
          <div className="flex items-center mb-4">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded"
                ></div>
              ))}
            </div>
            <div className="w-20 h-5 bg-gray-300 dark:bg-gray-700 rounded ml-2"></div>
          </div>

          {/* Price placeholder */}
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>

          {/* Description placeholder */}
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
          </div>

          {/* Variants placeholder */}
          <div className="mb-6">
            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
            <div className="flex space-x-2 mb-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"
                ></div>
              ))}
            </div>

            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
            <div className="flex space-x-2 mb-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-16 h-8 bg-gray-300 dark:bg-gray-700 rounded"
                ></div>
              ))}
            </div>
          </div>

          {/* Quantity and buttons placeholder */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-32 h-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="flex-1 h-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>

      {/* Specs placeholder */}
      <div className="mt-12">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex">
              <div className="w-1/3 h-5 bg-gray-300 dark:bg-gray-700 rounded mr-2"></div>
              <div className="w-2/3 h-5 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Skeleton loader for order history
const OrderHistorySkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
        >
          <div className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-32 mb-1"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
              </div>
              <div className="mt-2 sm:mt-0 flex items-center">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-20 mr-4"></div>
                <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between">
              <div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16 mb-1"></div>
                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-32 mb-1"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-40"></div>
              </div>
              <div className="mt-2 sm:mt-0">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16 mb-1"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-24 mb-1"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Skeleton loader for user dashboard
const DashboardSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-start">
              <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full mr-4"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center">
              <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded mr-4"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
              </div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Export all skeleton components
export {
  ProductCardSkeleton,
  ProductDetailSkeleton,
  OrderHistorySkeleton,
  DashboardSkeleton,
};
