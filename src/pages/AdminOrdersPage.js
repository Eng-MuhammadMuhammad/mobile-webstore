import React, { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";

const AdminOrdersPage = () => {
  // Mock data for orders
  const [orders, setOrders] = useState([
    {
      id: "ORD-123456",
      customer: {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
      },
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
        },
        {
          id: 4,
          name: "AirPods Pro",
          image:
            "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          price: 249.99,
          quantity: 1,
        },
      ],
      shipping: {
        address: "123 Main St, Apt 4B",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
      },
      payment: {
        method: "Credit Card",
        cardLast4: "4242",
      },
    },
    {
      id: "ORD-123455",
      customer: {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
      },
      date: "March 14, 2025",
      status: "Processing",
      total: 499.99,
      items: [
        {
          id: 3,
          name: "Google Pixel 7",
          image:
            "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          price: 499.99,
          quantity: 1,
        },
      ],
      shipping: {
        address: "456 Park Ave, Suite 200",
        city: "Boston",
        state: "MA",
        zipCode: "02108",
        country: "United States",
      },
      payment: {
        method: "PayPal",
        email: "jane.smith@example.com",
      },
    },
    {
      id: "ORD-123454",
      customer: {
        id: 3,
        name: "Robert Johnson",
        email: "robert.johnson@example.com",
      },
      date: "March 14, 2025",
      status: "Shipped",
      total: 899.99,
      items: [
        {
          id: 2,
          name: "Samsung Galaxy S23",
          image:
            "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          price: 899.99,
          quantity: 1,
        },
      ],
      shipping: {
        address: "789 Oak St",
        city: "Chicago",
        state: "IL",
        zipCode: "60601",
        country: "United States",
      },
      payment: {
        method: "Credit Card",
        cardLast4: "1234",
      },
    },
    {
      id: "ORD-123453",
      customer: {
        id: 4,
        name: "Emily Davis",
        email: "emily.davis@example.com",
      },
      date: "March 13, 2025",
      status: "Pending",
      total: 199.99,
      items: [
        {
          id: 6,
          name: "Samsung Galaxy Watch 5",
          image:
            "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          price: 199.99,
          quantity: 1,
        },
      ],
      shipping: {
        address: "321 Elm St",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105",
        country: "United States",
      },
      payment: {
        method: "Credit Card",
        cardLast4: "5678",
      },
    },
    {
      id: "ORD-123452",
      customer: {
        id: 5,
        name: "Michael Wilson",
        email: "michael.wilson@example.com",
      },
      date: "March 12, 2025",
      status: "Delivered",
      total: 749.99,
      items: [
        {
          id: 5,
          name: "Apple Watch Ultra",
          image:
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          price: 749.99,
          quantity: 1,
        },
      ],
      shipping: {
        address: "555 Pine St",
        city: "Seattle",
        state: "WA",
        zipCode: "98101",
        country: "United States",
      },
      payment: {
        method: "PayPal",
        email: "michael.wilson@example.com",
      },
    },
  ]);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // Get unique statuses for filter
  const statuses = [...new Set(orders.map((order) => order.status))];

  // Filter orders based on search and filters
  const filteredOrders = orders.filter((order) => {
    return (
      (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) &&
      (statusFilter === "" || order.status === statusFilter) &&
      (dateFilter === "" || filterByDate(order.date, dateFilter))
    );
  });

  // Filter by date helper function
  const filterByDate = (orderDate, filter) => {
    const today = new Date();
    const orderDateObj = new Date(orderDate);

    switch (filter) {
      case "today":
        return orderDateObj.toDateString() === today.toDateString();
      case "yesterday":
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        return orderDateObj.toDateString() === yesterday.toDateString();
      case "last7days":
        const last7Days = new Date(today);
        last7Days.setDate(last7Days.getDate() - 7);
        return orderDateObj >= last7Days;
      case "last30days":
        const last30Days = new Date(today);
        last30Days.setDate(last30Days.getDate() - 30);
        return orderDateObj >= last30Days;
      case "thisMonth":
        return (
          orderDateObj.getMonth() === today.getMonth() &&
          orderDateObj.getFullYear() === today.getFullYear()
        );
      default:
        return true;
    }
  };

  // Toggle order details
  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
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
      case "Pending":
        return "default";
      case "Cancelled":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
          Orders
        </h1>
        <div className="flex items-center">
          <Button variant="outline" size="sm" className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Export
          </Button>
          <Button variant="outline" size="sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filter
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Search
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by order ID, customer name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="statusFilter"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Status
              </label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-select block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="dateFilter"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Date
              </label>
              <select
                id="dateFilter"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="form-select block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last7days">Last 7 Days</option>
                <option value="last30days">Last 30 Days</option>
                <option value="thisMonth">This Month</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <Card>
            <div className="p-6 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                No orders found
              </h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          </Card>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id}>
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {order.id}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {order.date}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0 flex items-center">
                    <Badge
                      variant={getStatusVariant(order.status)}
                      className="mr-4"
                    >
                      {order.status}
                    </Badge>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleOrderDetails(order.id)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        {expandedOrderId === order.id ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Customer
                    </p>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {order.customer.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {order.customer.email}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Total
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      ${order.total.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {order.items.length} item(s)
                    </p>
                  </div>
                </div>

                {expandedOrderId === order.id && (
                  <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                          Order Items
                        </h3>
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center">
                              <div className="flex-shrink-0 h-16 w-16">
                                <img
                                  className="h-16 w-16 rounded-md object-cover"
                                  src={item.image}
                                  alt={item.name}
                                />
                              </div>
                              <div className="ml-4 flex-1">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {item.name}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  ${item.price.toFixed(2)} x {item.quantity}
                                </div>
                              </div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="mb-4">
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                            Shipping Address
                          </h3>
                          <div className="text-sm text-gray-900 dark:text-white">
                            <p>{order.shipping.address}</p>
                            <p>
                              {order.shipping.city}, {order.shipping.state}{" "}
                              {order.shipping.zipCode}
                            </p>
                            <p>{order.shipping.country}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                            Payment Method
                          </h3>
                          <div className="text-sm text-gray-900 dark:text-white">
                            {order.payment.method === "Credit Card" ? (
                              <p>
                                Credit Card ending in {order.payment.cardLast4}
                              </p>
                            ) : (
                              <p>PayPal ({order.payment.email})</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                            Update Status
                          </h3>
                          <div className="flex space-x-2">
                            {[
                              "Pending",
                              "Processing",
                              "Shipped",
                              "Delivered",
                              "Cancelled",
                            ].map((status) => (
                              <Button
                                key={status}
                                variant={
                                  order.status === status
                                    ? "primary"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() =>
                                  updateOrderStatus(order.id, status)
                                }
                                disabled={order.status === status}
                              >
                                {status}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                          />
                        </svg>
                        Print Invoice
                      </Button>
                      <Button variant="outline" size="sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        Email Customer
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
