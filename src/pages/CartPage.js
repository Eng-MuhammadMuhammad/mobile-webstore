import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import Button from "../components/ui/Button";
import Layout from "../components/layout/Layout";

const CartPage = () => {
  const {
    cartItems,
    cartTotal,
    removeFromCart,
    updateItemQuantity,
  } = useContext(CartContext);

  // Handle quantity change
  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      updateItemQuantity(item.id, item.color, item.storage, newQuantity);
    }
  };

  // Handle remove item
  const handleRemoveItem = (item) => {
    removeFromCart(item.id, item.color, item.storage);
  };

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">
              Your cart is empty
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/products">
              <Button variant="primary" className="mt-6">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cartItems.map((item, index) => (
                    <li
                      key={`${item.id}-${item.color}-${item.storage}-${index}`}
                      className="p-4 sm:p-6"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-24 w-24 object-cover rounded-md"
                        />
                        <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <h3 className="text-base font-medium text-gray-900 dark:text-white">
                                {item.name}
                              </h3>
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {item.color}, {item.storage}
                              </p>
                              <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                                ${(item.discountPrice || item.price).toFixed(2)} each
                              </p>
                            </div>
                            <p className="mt-2 sm:mt-0 text-base font-medium text-gray-900 dark:text-white">
                              ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                              <button
                                onClick={() =>
                                  handleQuantityChange(item, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                -
                              </button>
                              <span className="px-3 py-1 text-gray-900 dark:text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(item, item.quantity + 1)
                                }
                                disabled={item.quantity >= 10}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item)}
                              className="flex items-center text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex justify-between">
                <Link to="/products">
                  <Button variant="secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Order Summary
                </h2>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between mb-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Subtotal</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      ${cartTotal.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Shipping</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Calculated at checkout
                    </p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Tax</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Calculated at checkout
                    </p>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                    <p className="text-base font-medium text-gray-900 dark:text-white">
                      Total
                    </p>
                    <p className="text-base font-medium text-gray-900 dark:text-white">
                      ${cartTotal.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link to="/checkout">
                    <Button variant="primary" fullWidth>
                      Proceed to Checkout
                    </Button>
                  </Link>
                </div>
                <div className="mt-4">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Secure checkout
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
