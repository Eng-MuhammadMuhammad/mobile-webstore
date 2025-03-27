import React, { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";

const OrdersPage = () => {
  // Mock data for orders
  const orders = [
    {
      id: "ORD-123456",
      date: "March 15, 2025",
      status: "Delivered",
      total: 1299.99,
      items: [
        {
          id: 1,
          name: "iPhone 14 Pro",
          image:
            "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          price: 999.99,
          quantity: 1,
          color: "Deep Purple",
          storage: "256GB",
        },
        {
          id: 2,
          name: "AirPods Pro",
          image:
            "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          price: 249.99,
          quantity: 1,
          color: "White",
          storage: "N/A",
        },
        {
          id: 3,
          name: "Apple Watch Ultra",
          image:
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          price: 799.99,
          quantity: 1,
          color: "Titanium",
          storage: "N/A",
        },
      ],
      shipping: {
        method: "Express Shipping",
        cost: 15.99,
        address: {
          name: "John Doe",
          street: "123 Main St, Apt 4B",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "United States",
        },
        tracking: {
          number: "1Z999AA10123456784",
          url: "https://www.ups.com/track?loc=en_US&tracknum=1Z999AA10123456784",
        },
      },
      payment: {
        method: "Credit Card",
        last4: "4242",
      },
    },
    {
      id: "ORD-123455",
      date: "February 28, 2025",
      status: "Processing",
      total: 499.99,
      items: [
        {
          id: 4,
          name: "Samsung Galaxy S23",
          image:
            "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          price: 499.99,
          quantity: 1,
          color: "Phantom Black",
          storage: "128GB",
        },
      ],
      shipping: {
        method: "Standard Shipping",
        cost: 9.99,
        address: {
          name: "John Doe",
          street: "123 Main St, Apt 4B",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "United States",
        },
        tracking: null,
      },
      payment: {
        method: "PayPal",
        last4: null,
      },
    },
    {
      id: "ORD-123454",
      date: "January 15, 2025",
      status: "Delivered",
      total: 349.99,
      items: [
        {
          id: 5,
          name: "Google Pixel 7",
          image:
            "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          price: 349.99,
          quantity: 1,
          color: "Snow",
          storage: "128GB",
        },
      ],
      shipping: {
        method: "Standard Shipping",
        cost: 9.99,
        address: {
          name: "John Doe",
          street: "123 Main St, Apt 4B",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "United States",
        },
        tracking: {
          number: "1Z999AA10123456783",
          url: "https://www.ups.com/track?loc=en_US&tracknum=1Z999AA10123456783",
        },
      },
      payment: {
        method: "Credit Card",
        last4: "4242",
      },
    },
  ];

  // State for expanded order details
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // Toggle order details
  const toggleOrderDetails = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  // Get status badge variant
  const getStatusVariant = (status) => {
    switch (status) {
      case "Delivered":
        return "success";
      case "Processing":
        return "warning";
      case "Shipped":
        return "info";
      case "Cancelled":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Order History
      </h1>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            {/* Order Header */}
            <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 dark:border-gray-700">
              <div className="mb-4 sm:mb-0">
                <div className="flex items-center">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {order.id}
                  </h2>
                  <Badge
                    variant={getStatusVariant(order.status)}
                    className="ml-3"
                  >
                    {order.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Placed on {order.date}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center">
                <p className="text-lg font-medium text-gray-900 dark:text-white mb-2 sm:mb-0 sm:mr-6">
                  ${order.total.toFixed(2)}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleOrderDetails(order.id)}
                >
                  {expandedOrderId === order.id
                    ? "Hide Details"
                    : "View Details"}
                </Button>
              </div>
            </div>

            {/* Order Details (Expandable) */}
            {expandedOrderId === order.id && (
              <div className="p-4 sm:p-6">
                {/* Order Items */}
                <div className="mb-6">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                    Items
                  </h3>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="ml-4 flex-1">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {item.color}, {item.storage}
                          </p>
                          <div className="flex items-center mt-1">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              ${item.price.toFixed(2)} × {item.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <Button variant="text" size="xs" className="mt-2">
                            Buy Again
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Shipping Information */}
                  <div>
                    <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                      Shipping Information
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Method:</span>{" "}
                        {order.shipping.method}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                        <span className="font-medium">Address:</span>
                      </p>
                      <div className="text-sm text-gray-700 dark:text-gray-300 mt-1 ml-4">
                        <p>{order.shipping.address.name}</p>
                        <p>{order.shipping.address.street}</p>
                        <p>
                          {order.shipping.address.city},{" "}
                          {order.shipping.address.state}{" "}
                          {order.shipping.address.zipCode}
                        </p>
                        <p>{order.shipping.address.country}</p>
                      </div>
                      {order.shipping.tracking && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-medium">Tracking:</span>
                          </p>
                          <a
                            href={order.shipping.tracking.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400"
                          >
                            {order.shipping.tracking.number}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div>
                    <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                      Payment Information
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Method:</span>{" "}
                        {order.payment.method}
                        {order.payment.last4 &&
                          ` ending in ${order.payment.last4}`}
                      </p>

                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Subtotal
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            ${(order.total - order.shipping.cost).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Shipping
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            ${order.shipping.cost.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Total
                          </p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            ${order.total.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap gap-3 justify-end">
                  <Button variant="outline" size="sm">
                    Need Help?
                  </Button>
                  {order.status === "Delivered" && (
                    <Button variant="outline" size="sm">
                      Return Items
                    </Button>
                  )}
                  <Button variant="primary" size="sm">
                    Download Invoice
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
