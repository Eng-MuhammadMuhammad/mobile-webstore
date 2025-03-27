import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);

  // Checkout steps
  const [currentStep, setCurrentStep] = useState(1);

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // Handle shipping info change
  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle card info change
  const handleCardInfoChange = (e) => {
    const { name, value } = e.target;
    setCardInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate shipping info
  const validateShippingInfo = () => {
    const newErrors = {};

    if (!shippingInfo.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!shippingInfo.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!shippingInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(shippingInfo.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!shippingInfo.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!shippingInfo.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!shippingInfo.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!shippingInfo.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!shippingInfo.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate payment info
  const validatePaymentInfo = () => {
    const newErrors = {};

    if (paymentMethod === "credit-card") {
      if (!cardInfo.cardNumber.trim()) {
        newErrors.cardNumber = "Card number is required";
      } else if (!/^\d{16}$/.test(cardInfo.cardNumber.replace(/\s/g, ""))) {
        newErrors.cardNumber = "Card number must be 16 digits";
      }

      if (!cardInfo.cardName.trim()) {
        newErrors.cardName = "Name on card is required";
      }

      if (!cardInfo.expiryDate.trim()) {
        newErrors.expiryDate = "Expiry date is required";
      } else if (!/^\d{2}\/\d{2}$/.test(cardInfo.expiryDate)) {
        newErrors.expiryDate = "Expiry date must be in MM/YY format";
      }

      if (!cardInfo.cvv.trim()) {
        newErrors.cvv = "CVV is required";
      } else if (!/^\d{3,4}$/.test(cardInfo.cvv)) {
        newErrors.cvv = "CVV must be 3 or 4 digits";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateShippingInfo()) {
        setCurrentStep(2);
        window.scrollTo(0, 0);
      }
    } else if (currentStep === 2) {
      if (validatePaymentInfo()) {
        setCurrentStep(3);
        window.scrollTo(0, 0);
      }
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  // Handle place order
  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    try {
      // In a real app, this would be an API call to process the order
      // For UI demonstration, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate a random order number
      const randomOrderNumber = Math.floor(
        100000000 + Math.random() * 900000000
      ).toString();
      setOrderNumber(randomOrderNumber);

      // Clear the cart
      clearCart();

      // Set order as complete
      setIsOrderComplete(true);
    } catch (error) {
      console.error("Error processing order:", error);
      setErrors({
        general: "There was an error processing your order. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // If cart is empty and order is not complete, redirect to products
  if (cartItems.length === 0 && !isOrderComplete) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Add some products to your cart before proceeding to checkout.
        </p>
        <Button variant="primary" onClick={() => navigate("/products")}>
          Browse Products
        </Button>
      </div>
    );
  }

  // Order complete view
  if (isOrderComplete) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Card>
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600 dark:text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Order Confirmed!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Thank you for your purchase. Your order has been received and is
              being processed.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6 inline-block">
              <p className="text-gray-700 dark:text-gray-300">
                Order Number: <span className="font-bold">{orderNumber}</span>
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We've sent a confirmation email to{" "}
              <span className="font-medium">{shippingInfo.email}</span> with all
              the details of your order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" onClick={() => navigate("/")}>
                Continue Shopping
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/account/orders")}
              >
                View Order History
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Checkout Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= 1
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
              }`}
            >
              1
            </div>
            <span
              className={`ml-2 text-sm font-medium ${
                currentStep >= 1
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Shipping
            </span>
          </div>
          <div
            className={`w-12 h-1 mx-2 ${
              currentStep >= 2
                ? "bg-primary-600"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          ></div>
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= 2
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
              }`}
            >
              2
            </div>
            <span
              className={`ml-2 text-sm font-medium ${
                currentStep >= 2
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Payment
            </span>
          </div>
          <div
            className={`w-12 h-1 mx-2 ${
              currentStep >= 3
                ? "bg-primary-600"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          ></div>
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= 3
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
              }`}
            >
              3
            </div>
            <span
              className={`ml-2 text-sm font-medium ${
                currentStep >= 3
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Review
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-2/3">
          <Card className="mb-6">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Shipping Information
                </h2>

                {errors.general && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md dark:bg-red-900 dark:text-red-200">
                    {errors.general}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={shippingInfo.firstName}
                    onChange={handleShippingInfoChange}
                    error={errors.firstName}
                    required
                  />

                  <Input
                    label="Last Name"
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={shippingInfo.lastName}
                    onChange={handleShippingInfoChange}
                    error={errors.lastName}
                    required
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    id="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleShippingInfoChange}
                    error={errors.email}
                    required
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    id="phone"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleShippingInfoChange}
                    error={errors.phone}
                    required
                  />

                  <div className="md:col-span-2">
                    <Input
                      label="Address"
                      type="text"
                      id="address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingInfoChange}
                      error={errors.address}
                      required
                    />
                  </div>

                  <Input
                    label="City"
                    type="text"
                    id="city"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleShippingInfoChange}
                    error={errors.city}
                    required
                  />

                  <Input
                    label="State / Province"
                    type="text"
                    id="state"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleShippingInfoChange}
                    error={errors.state}
                    required
                  />

                  <Input
                    label="ZIP / Postal Code"
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={handleShippingInfoChange}
                    error={errors.zipCode}
                    required
                  />

                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleShippingInfoChange}
                      className="form-select block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Japan">Japan</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button variant="primary" onClick={handleNextStep}>
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Payment Method
                </h2>

                {errors.general && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md dark:bg-red-900 dark:text-red-200">
                    {errors.general}
                  </div>
                )}

                <div className="mb-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="credit-card"
                        name="payment-method"
                        type="radio"
                        checked={paymentMethod === "credit-card"}
                        onChange={() => setPaymentMethod("credit-card")}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <label
                        htmlFor="credit-card"
                        className="ml-3 flex items-center"
                      >
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                          Credit Card
                        </span>
                        <div className="flex space-x-1">
                          <svg
                            className="h-6 w-auto"
                            viewBox="0 0 36 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="36"
                              height="24"
                              rx="4"
                              fill="#1A1F71"
                            />
                            <path
                              d="M15.0703 15.9844H12.3047L14.0859 8.01562H16.8516L15.0703 15.9844Z"
                              fill="white"
                            />
                            <path
                              d="M23.1328 8.20312C22.5703 8.01562 21.7266 7.78125 20.7188 7.78125C18.3281 7.78125 16.6641 9.02344 16.6641 10.7812C16.6641 12.1172 17.8594 12.8203 18.7969 13.2422C19.7344 13.6641 20.0156 13.9453 20.0156 14.3203C20.0156 14.8828 19.3125 15.1641 18.6562 15.1641C17.7188 15.1641 16.7344 14.8828 15.9844 14.5078L15.6562 14.3672L15.2812 16.6641C15.9375 16.9453 17.1328 17.1797 18.375 17.1797C20.9062 17.1797 22.5234 15.9375 22.5234 14.0391C22.5234 13 21.8672 12.1562 20.4375 11.5469C19.5938 11.125 19.0781 10.8438 19.0781 10.4219C19.0781 10.0469 19.5 9.67188 20.3906 9.67188C21.1406 9.625 21.7266 9.82031 22.1484 10.0469L22.3828 10.1875L22.7578 8.01562L23.1328 8.20312Z"
                              fill="white"
                            />
                            <path
                              d="M26.5781 8.01562H24.4922L22.1484 15.9844H24.3047L24.6797 14.7891H27.1641L27.3516 15.9844H29.5078L27.6562 8.01562H26.5781ZM25.2422 13.0547C25.3828 12.6328 26.0859 10.7344 26.0859 10.7344C26.0859 10.7344 26.2734 10.2656 26.3672 9.98438L26.5078 10.6875C26.5078 10.6875 26.9297 12.6328 27.0234 13.0547H25.2422Z"
                              fill="white"
                            />
                            <path
                              d="M10.5234 8.01562L8.36719 13.3359L8.13281 12.2578C7.71094 10.9219 6.44531 9.53906 5.03906 8.85938L7.00781 15.9375H9.21094L12.7266 8.01562H10.5234Z"
                              fill="white"
                            />
                            <path
                              d="M6.91406 8.01562H3.51562L3.46875 8.20312C6.07031 8.85938 7.80469 10.4219 8.50781 12.2578L7.71094 8.85938C7.57031 8.20312 7.28906 8.01562 6.91406 8.01562Z"
                              fill="#FAA61A"
                            />
                          </svg>
                          <svg
                            className="h-6 w-auto"
                            viewBox="0 0 36 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="36"
                              height="24"
                              rx="4"
                              fill="#252525"
                            />
                            <path
                              d="M14.9531 16.0781C18.4219 16.0781 21.2344 13.2656 21.2344 9.79688C21.2344 6.32812 18.4219 3.51562 14.9531 3.51562C11.4844 3.51562 8.67188 6.32812 8.67188 9.79688C8.67188 13.2656 11.4844 16.0781 14.9531 16.0781Z"
                              fill="#EB001B"
                            />
                            <path
                              d="M21.0938 16.0781C24.5625 16.0781 27.375 13.2656 27.375 9.79688C27.375 6.32812 24.5625 3.51562 21.0938 3.51562C17.625 3.51562 14.8125 6.32812 14.8125 9.79688C14.8125 13.2656 17.625 16.0781 21.0938 16.0781Z"
                              fill="#F79E1B"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M18.0234 5.20312C19.6875 6.51562 20.7188 8.53125 20.7188 10.7812C20.7188 13.0312 19.6875 15.0469 18.0234 16.3594C16.3594 15.0469 15.3281 13.0312 15.3281 10.7812C15.3281 8.53125 16.3594 6.51562 18.0234 5.20312Z"
                              fill="#FF5F00"
                            />
                          </svg>
                          <svg
                            className="h-6 w-auto"
                            viewBox="0 0 36 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="36"
                              height="24"
                              rx="4"
                              fill="#016FD0"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M6.75 15.75H9.75L10.5 13.5H14.25L15 15.75H18.75L15 6.75H10.5L6.75 15.75ZM13.5 11.25H11.25L12.375 8.25L13.5 11.25Z"
                              fill="white"
                            />
                            <path
                              d="M18.75 12.75H21.75V15.75H24.75V12.75H27V10.5H24.75V7.5H21.75V10.5H18.75V12.75Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="paypal"
                        name="payment-method"
                        type="radio"
                        checked={paymentMethod === "paypal"}
                        onChange={() => setPaymentMethod("paypal")}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <label
                        htmlFor="paypal"
                        className="ml-3 flex items-center"
                      >
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                          PayPal
                        </span>
                        <svg
                          className="h-6 w-auto"
                          viewBox="0 0 36 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="36" height="24" rx="4" fill="#F7F7F7" />
                          <path
                            d="M15.0938 10.5C15.0938 12.1875 13.7812 13.5 12.0938 13.5H9.84375C9.65625 13.5 9.51562 13.3594 9.51562 13.1719L8.29688 6.32812C8.29688 6.14062 8.4375 6 8.625 6H11.9531C13.6406 6 15.0938 7.3125 15.0938 9V10.5Z"
                            fill="#253B80"
                          />
                          <path
                            d="M24.8438 10.5C24.8438 12.1875 23.5312 13.5 21.8438 13.5H19.5938C19.4062 13.5 19.2656 13.3594 19.2656 13.1719L18.0469 6.32812C18.0469 6.14062 18.1875 6 18.375 6H21.7031C23.3906 6 24.8438 7.3125 24.8438 9V10.5Z"
                            fill="#179BD7"
                          />
                          <path
                            d="M19.5938 13.5H21.8438C23.5312 13.5 24.8438 12.1875 24.8438 10.5V9C24.8438 10.6875 23.5312 12 21.8438 12H19.5938C19.4062 12 19.2656 11.8594 19.2656 11.6719L19.0781 10.5L18.0469 6.32812C18.0469 6.14062 18.1875 6 18.375 6H15.0938C15.0938 6 15.0938 6 15.0938 6.04688C15.0469 6.04688 15.0469 6.04688 15.0469 6.09375C15.0469 6.09375 15.0469 6.09375 15.0469 6.14062V6.1875C15 6.1875 15 6.1875 15 6.23438V6.28125C15 6.28125 15 6.28125 15 6.32812L13.7812 13.1719C13.7812 13.3594 13.9219 13.5 14.1094 13.5H16.3594C16.3594 13.5 16.3594 13.5 16.3594 13.4531C16.4062 13.4531 16.4062 13.4531 16.4062 13.4062C16.4062 13.4062 16.4062 13.4062 16.4062 13.3594V13.3125C16.4531 13.3125 16.4531 13.3125 16.4531 13.2656V13.2188C16.4531 13.2188 16.4531 13.2188 16.4531 13.1719L17.6719 6.32812C17.6719 6.14062 17.8125 6 18 6H18.375C18.1875 6 18.0469 6.14062 18.0469 6.32812L19.2656 13.1719C19.2656 13.3594 19.4062 13.5 19.5938 13.5Z"
                            fill="#253B80"
                          />
                          <path
                            d="M8.29688 6.32812L9.51562 13.1719C9.51562 13.3594 9.65625 13.5 9.84375 13.5H12.0938C13.7812 13.5 15.0938 12.1875 15.0938 10.5V9C15.0938 10.6875 13.7812 12 12.0938 12H9.84375C9.65625 12 9.51562 11.8594 9.51562 11.6719L8.29688 6.32812Z"
                            fill="#179BD7"
                          />
                        </svg>
                      </label>
                    </div>
                  </div>
                </div>

                {paymentMethod === "credit-card" && (
                  <div className="mt-6">
                    <div className="grid grid-cols-1 gap-4">
                      <Input
                        label="Card Number"
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={cardInfo.cardNumber}
                        onChange={handleCardInfoChange}
                        placeholder="1234 5678 9012 3456"
                        error={errors.cardNumber}
                        required
                      />

                      <Input
                        label="Name on Card"
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={cardInfo.cardName}
                        onChange={handleCardInfoChange}
                        error={errors.cardName}
                        required
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Expiry Date"
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={cardInfo.expiryDate}
                          onChange={handleCardInfoChange}
                          placeholder="MM/YY"
                          error={errors.expiryDate}
                          required
                        />

                        <Input
                          label="CVV"
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={cardInfo.cvv}
                          onChange={handleCardInfoChange}
                          placeholder="123"
                          error={errors.cvv}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "paypal" && (
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-md">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      You will be redirected to PayPal to complete your payment
                      securely.
                    </p>
                  </div>
                )}

                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Back to Shipping
                  </Button>
                  <Button variant="primary" onClick={handleNextStep}>
                    Continue to Review
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Review Order */}
            {currentStep === 3 && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Review Your Order
                </h2>

                {errors.general && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md dark:bg-red-900 dark:text-red-200">
                    {errors.general}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Shipping Information
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                    <p className="text-gray-700 dark:text-gray-300">
                      {shippingInfo.firstName} {shippingInfo.lastName}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {shippingInfo.address}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {shippingInfo.city}, {shippingInfo.state}{" "}
                      {shippingInfo.zipCode}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {shippingInfo.country}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                      {shippingInfo.email}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {shippingInfo.phone}
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="mt-2 text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400"
                  >
                    Edit
                  </button>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Payment Method
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                    {paymentMethod === "credit-card" ? (
                      <div>
                        <p className="text-gray-700 dark:text-gray-300 flex items-center">
                          <span className="mr-2">Credit Card</span>
                          <svg
                            className="h-6 w-auto"
                            viewBox="0 0 36 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="36"
                              height="24"
                              rx="4"
                              fill="#1A1F71"
                            />
                            <path
                              d="M15.0703 15.9844H12.3047L14.0859 8.01562H16.8516L15.0703 15.9844Z"
                              fill="white"
                            />
                            <path
                              d="M23.1328 8.20312C22.5703 8.01562 21.7266 7.78125 20.7188 7.78125C18.3281 7.78125 16.6641 9.02344 16.6641 10.7812C16.6641 12.1172 17.8594 12.8203 18.7969 13.2422C19.7344 13.6641 20.0156 13.9453 20.0156 14.3203C20.0156 14.8828 19.3125 15.1641 18.6562 15.1641C17.7188 15.1641 16.7344 14.8828 15.9844 14.5078L15.6562 14.3672L15.2812 16.6641C15.9375 16.9453 17.1328 17.1797 18.375 17.1797C20.9062 17.1797 22.5234 15.9375 22.5234 14.0391C22.5234 13 21.8672 12.1562 20.4375 11.5469C19.5938 11.125 19.0781 10.8438 19.0781 10.4219C19.0781 10.0469 19.5 9.67188 20.3906 9.67188C21.1406 9.625 21.7266 9.82031 22.1484 10.0469L22.3828 10.1875L22.7578 8.01562L23.1328 8.20312Z"
                              fill="white"
                            />
                            <path
                              d="M26.5781 8.01562H24.4922L22.1484 15.9844H24.3047L24.6797 14.7891H27.1641L27.3516 15.9844H29.5078L27.6562 8.01562H26.5781ZM25.2422 13.0547C25.3828 12.6328 26.0859 10.7344 26.0859 10.7344C26.0859 10.7344 26.2734 10.2656 26.3672 9.98438L26.5078 10.6875C26.5078 10.6875 26.9297 12.6328 27.0234 13.0547H25.2422Z"
                              fill="white"
                            />
                            <path
                              d="M10.5234 8.01562L8.36719 13.3359L8.13281 12.2578C7.71094 10.9219 6.44531 9.53906 5.03906 8.85938L7.00781 15.9375H9.21094L12.7266 8.01562H10.5234Z"
                              fill="white"
                            />
                            <path
                              d="M6.91406 8.01562H3.51562L3.46875 8.20312C6.07031 8.85938 7.80469 10.4219 8.50781 12.2578L7.71094 8.85938C7.57031 8.20312 7.28906 8.01562 6.91406 8.01562Z"
                              fill="#FAA61A"
                            />
                          </svg>
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mt-1">
                          **** **** **** {cardInfo.cardNumber.slice(-4)}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          Expires {cardInfo.expiryDate}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-700 dark:text-gray-300 flex items-center">
                        <span className="mr-2">PayPal</span>
                        <svg
                          className="h-6 w-auto"
                          viewBox="0 0 36 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="36" height="24" rx="4" fill="#F7F7F7" />
                          <path
                            d="M15.0938 10.5C15.0938 12.1875 13.7812 13.5 12.0938 13.5H9.84375C9.65625 13.5 9.51562 13.3594 9.51562 13.1719L8.29688 6.32812C8.29688 6.14062 8.4375 6 8.625 6H11.9531C13.6406 6 15.0938 7.3125 15.0938 9V10.5Z"
                            fill="#253B80"
                          />
                          <path
                            d="M24.8438 10.5C24.8438 12.1875 23.5312 13.5 21.8438 13.5H19.5938C19.4062 13.5 19.2656 13.3594 19.2656 13.1719L18.0469 6.32812C18.0469 6.14062 18.1875 6 18.375 6H21.7031C23.3906 6 24.8438 7.3125 24.8438 9V10.5Z"
                            fill="#179BD7"
                          />
                          <path
                            d="M19.5938 13.5H21.8438C23.5312 13.5 24.8438 12.1875 24.8438 10.5V9C24.8438 10.6875 23.5312 12 21.8438 12H19.5938C19.4062 12 19.2656 11.8594 19.2656 11.6719L19.0781 10.5L18.0469 6.32812C18.0469 6.14062 18.1875 6 18.375 6H15.0938C15.0938 6 15.0938 6 15.0938 6.04688C15.0469 6.04688 15.0469 6.04688 15.0469 6.09375C15.0469 6.09375 15.0469 6.09375 15.0469 6.14062V6.1875C15 6.1875 15 6.1875 15 6.23438V6.28125C15 6.28125 15 6.28125 15 6.32812L13.7812 13.1719C13.7812 13.3594 13.9219 13.5 14.1094 13.5H16.3594C16.3594 13.5 16.3594 13.5 16.3594 13.4531C16.4062 13.4531 16.4062 13.4531 16.4062 13.4062C16.4062 13.4062 16.4062 13.4062 16.4062 13.3594V13.3125C16.4531 13.3125 16.4531 13.3125 16.4531 13.2656V13.2188C16.4531 13.2188 16.4531 13.2188 16.4531 13.1719L17.6719 6.32812C17.6719 6.14062 17.8125 6 18 6H18.375C18.1875 6 18.0469 6.14062 18.0469 6.32812L19.2656 13.1719C19.2656 13.3594 19.4062 13.5 19.5938 13.5Z"
                            fill="#253B80"
                          />
                          <path
                            d="M8.29688 6.32812L9.51562 13.1719C9.51562 13.3594 9.65625 13.5 9.84375 13.5H12.0938C13.7812 13.5 15.0938 12.1875 15.0938 10.5V9C15.0938 10.6875 13.7812 12 12.0938 12H9.84375C9.65625 12 9.51562 11.8594 9.51562 11.6719L8.29688 6.32812Z"
                            fill="#179BD7"
                          />
                        </svg>
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="mt-2 text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400"
                  >
                    Edit
                  </button>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Order Items
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                      {cartItems.map((item, index) => (
                        <li
                          key={`${item.id}-${item.color}-${item.storage}-${index}`}
                          className="py-4 first:pt-0 last:pb-0"
                        >
                          <div className="flex items-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-16 w-16 object-cover rounded-md"
                            />
                            <div className="ml-4 flex-1">
                              <div className="flex justify-between">
                                <div>
                                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                    {item.name}
                                  </h4>
                                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    {item.color}, {item.storage}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    $
                                    {(item.discountPrice || item.price) *
                                      item.quantity}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    ${item.discountPrice || item.price} x{" "}
                                    {item.quantity}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Back to Payment
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Place Order"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="sticky top-20">
            <Card>
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Subtotal
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Shipping
                    </span>
                    <span className="text-gray-900 dark:text-white">Free</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Tax
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      ${(cartTotal * 0.1).toFixed(2)}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between font-bold">
                      <span className="text-gray-900 dark:text-white">
                        Total
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        ${(cartTotal + cartTotal * 0.1).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                        or
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <input
                      type="text"
                      placeholder="Discount code"
                      className="form-input block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    <button className="mt-2 w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Need Help?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Our customer service is available 24/7 to assist you with any
                questions.
              </p>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  +1 (800) 123-4567
                </span>
              </div>
              <div className="flex items-center mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2"
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
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  support@mobilewebstore.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
