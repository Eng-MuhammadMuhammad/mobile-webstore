import React, { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Badge from "../components/ui/Badge";

const AddressesPage = () => {
  // Mock data for addresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      name: "John Doe",
      address: "123 Main St, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      phone: "(555) 123-4567",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      name: "John Doe",
      address: "456 Business Ave, Suite 200",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      country: "United States",
      phone: "(555) 987-6543",
      isDefault: false,
    },
  ]);

  // State for new address form
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [formData, setFormData] = useState({
    type: "Home",
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
    isDefault: false,
  });
  const [errors, setErrors] = useState({});

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (editingAddressId) {
      // Update existing address
      setAddresses(
        addresses.map((address) =>
          address.id === editingAddressId
            ? { ...formData, id: editingAddressId }
            : address
        )
      );
      setEditingAddressId(null);
    } else {
      // Add new address
      const newAddress = {
        ...formData,
        id: Date.now(), // Simple way to generate unique ID
      };

      // If this is the first address or marked as default, update other addresses
      if (formData.isDefault || addresses.length === 0) {
        setAddresses((prevAddresses) =>
          prevAddresses
            .map((address) => ({
              ...address,
              isDefault: false,
            }))
            .concat(newAddress)
        );
      } else {
        setAddresses([...addresses, newAddress]);
      }
    }

    // Reset form
    setFormData({
      type: "Home",
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      phone: "",
      isDefault: false,
    });
    setIsAddingAddress(false);
  };

  // Handle edit address
  const handleEditAddress = (address) => {
    setFormData(address);
    setEditingAddressId(address.id);
    setIsAddingAddress(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle delete address
  const handleDeleteAddress = (addressId) => {
    const addressToDelete = addresses.find(
      (address) => address.id === addressId
    );

    // If deleting the default address, make another one default
    if (addressToDelete.isDefault && addresses.length > 1) {
      const remainingAddresses = addresses.filter(
        (address) => address.id !== addressId
      );
      remainingAddresses[0].isDefault = true;
      setAddresses(remainingAddresses);
    } else {
      setAddresses(addresses.filter((address) => address.id !== addressId));
    }
  };

  // Handle set as default
  const handleSetAsDefault = (addressId) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        isDefault: address.id === addressId,
      }))
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Saved Addresses
        </h1>
        <Button
          variant="primary"
          onClick={() => {
            setIsAddingAddress(!isAddingAddress);
            setEditingAddressId(null);
            setFormData({
              type: "Home",
              name: "",
              address: "",
              city: "",
              state: "",
              zipCode: "",
              country: "United States",
              phone: "",
              isDefault: false,
            });
          }}
        >
          {isAddingAddress ? "Cancel" : "Add New Address"}
        </Button>
      </div>

      {/* Add/Edit Address Form */}
      {isAddingAddress && (
        <Card className="mb-8">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {editingAddressId ? "Edit Address" : "Add New Address"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Address Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="form-select block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <Input
                  label="Full Name"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                  required
                />

                <div className="md:col-span-2">
                  <Input
                    label="Street Address"
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    error={errors.address}
                    required
                  />
                </div>

                <Input
                  label="City"
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  error={errors.city}
                  required
                />

                <Input
                  label="State / Province"
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  error={errors.state}
                  required
                />

                <Input
                  label="ZIP / Postal Code"
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
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
                    value={formData.country}
                    onChange={handleInputChange}
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

                <Input
                  label="Phone Number"
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={errors.phone}
                  required
                />
              </div>

              <div className="flex items-center mb-6">
                <input
                  id="isDefault"
                  name="isDefault"
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                />
                <label
                  htmlFor="isDefault"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Set as default address
                </label>
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="mr-3"
                  onClick={() => setIsAddingAddress(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  {editingAddressId ? "Update Address" : "Save Address"}
                </Button>
              </div>
            </form>
          </div>
        </Card>
      )}

      {/* Addresses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <Card key={address.id}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {address.type}
                    </h3>
                    {address.isDefault && (
                      <Badge variant="primary" className="ml-2">
                        Default
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {address.name}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditAddress(address)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
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
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address.id)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <p>{address.address}</p>
                <p>
                  {address.city}, {address.state} {address.zipCode}
                </p>
                <p>{address.country}</p>
                <p className="mt-1">{address.phone}</p>
              </div>

              {!address.isDefault && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSetAsDefault(address.id)}
                >
                  Set as Default
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {addresses.length === 0 && (
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              No addresses saved
            </h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Add a new address to save it for future orders.
            </p>
            <Button
              variant="primary"
              className="mt-4"
              onClick={() => setIsAddingAddress(true)}
            >
              Add New Address
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AddressesPage;
