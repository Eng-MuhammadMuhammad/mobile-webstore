import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { CardBody } from "../components/ui/Card";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { CartContext } from "../contexts/CartContext";

// Mock product data - filtered for new arrivals (products with isNew: true)
const mockProducts = [
  {
    id: 1,
    name: "iPhone 13 Pro",
    brand: "Apple",
    image:
      "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: 999,
    discountPrice: 899,
    rating: 4.8,
    reviewCount: 245,
    isNew: true,
    isFeatured: true,
    category: "smartphones",
    storage: "256GB",
    color: "Graphite",
    inStock: true,
  },
  {
    id: 2,
    name: "Samsung Galaxy S22 Ultra",
    brand: "Samsung",
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: 1199,
    discountPrice: null,
    rating: 4.7,
    reviewCount: 189,
    isNew: true,
    isFeatured: true,
    category: "smartphones",
    storage: "512GB",
    color: "Phantom Black",
    inStock: true,
  },
  {
    id: 5,
    name: "OnePlus 10 Pro",
    brand: "OnePlus",
    image:
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: 899,
    discountPrice: null,
    rating: 4.7,
    reviewCount: 98,
    isNew: true,
    isFeatured: false,
    category: "smartphones",
    storage: "256GB",
    color: "Emerald Forest",
    inStock: true,
  },
  {
    id: 6,
    name: "Nothing Phone (1)",
    brand: "Nothing",
    image:
      "https://images.unsplash.com/photo-1598331668826-20cecc596b86?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: 499,
    discountPrice: null,
    rating: 4.4,
    reviewCount: 76,
    isNew: true,
    isFeatured: false,
    category: "smartphones",
    storage: "128GB",
    color: "White",
    inStock: false,
  },
  {
    id: 7,
    name: "Oppo Find X5 Pro",
    brand: "Oppo",
    image:
      "https://images.unsplash.com/photo-1616348436168-de43ad0db179?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: 999,
    discountPrice: 949,
    rating: 4.6,
    reviewCount: 87,
    isNew: true,
    isFeatured: false,
    category: "smartphones",
    storage: "256GB",
    color: "Ceramic White",
    inStock: true,
  },
  {
    id: 8,
    name: "Vivo X80 Pro",
    brand: "Vivo",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: 799,
    discountPrice: null,
    rating: 4.5,
    reviewCount: 65,
    isNew: true,
    isFeatured: false,
    category: "smartphones",
    storage: "256GB",
    color: "Cosmic Black",
    inStock: true,
  },
  {
    id: 10,
    name: "Samsung Galaxy Tab S8 Ultra",
    brand: "Samsung",
    image:
      "https://images.unsplash.com/photo-1589739900243-4b52cd9dd8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: 1099,
    discountPrice: 999,
    rating: 4.7,
    reviewCount: 124,
    isNew: true,
    isFeatured: false,
    category: "tablets",
    storage: "256GB",
    color: "Graphite",
    inStock: true,
  },
  {
    id: 12,
    name: "Samsung Galaxy Watch 5",
    brand: "Samsung",
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: 279,
    discountPrice: null,
    rating: 4.6,
    reviewCount: 112,
    isNew: true,
    isFeatured: false,
    category: "wearables",
    storage: "16GB",
    color: "Silver",
    inStock: true,
  },
];

// Product Card Component
const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  
  const handleAddToCart = () => {
    addToCart(product);
  };
  
  return (
    <Card className="h-full">
      <CardBody>
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-2 left-2">
            <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
              New
            </span>
          </div>
          {product.discountPrice && (
            <div className="absolute top-2 right-2">
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                Sale
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            <Link to={`/product/${product.id}`} className="hover:text-primary-600 dark:hover:text-primary-400">
              {product.name}
            </Link>
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {product.brand}
          </p>
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-500"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              ({product.reviewCount})
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              {product.discountPrice ? (
                <div className="flex items-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ${product.discountPrice}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">
                    ${product.price}
                  </span>
                </div>
              ) : (
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  ${product.price}
                </span>
              )}
            </div>
            <div>
              {product.inStock ? (
                <span className="text-xs text-green-600 dark:text-green-400">
                  In Stock
                </span>
              ) : (
                <span className="text-xs text-red-600 dark:text-red-400">
                  Out of Stock
                </span>
              )}
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <Button 
              variant="secondary" 
              className="flex-1"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? "Add to Cart" : "Sold Out"}
            </Button>
            <Link to={`/product/${product.id}`} className="flex-1">
              <Button variant="primary" fullWidth>
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

const NewArrivalsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [newArrivals, setNewArrivals] = useState([]);
  const [filterBrand, setFilterBrand] = useState("all");

  // Get unique brands for filter
  const brands = ["all", ...new Set(mockProducts.map(product => product.brand))];

  // Fetch new arrivals
  useEffect(() => {
    const fetchNewArrivals = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        // In a real app, this would be an API call to get new arrivals
        setNewArrivals(mockProducts);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Handle brand filter change
  const handleBrandFilterChange = (e) => {
    setFilterBrand(e.target.value);
  };

  // Apply filtering and sorting
  const filteredAndSortedProducts = [...newArrivals]
    .filter(product => filterBrand === "all" || product.brand === filterBrand)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return (a.discountPrice || a.price) - (b.discountPrice || b.price);
        case "price-desc":
          return (b.discountPrice || b.price) - (a.discountPrice || a.price);
        case "rating-desc":
          return b.rating - a.rating;
        case "newest":
          // Since all are new, we'll sort by ID (higher ID = newer)
          return b.id - a.id;
        default:
          return 0;
      }
    });

  return (
    <Layout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            New Arrivals
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Discover our latest products and stay ahead with cutting-edge technology.
          </p>
          
          {/* Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-800 rounded-lg p-6 mb-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">Just Launched</h2>
                <p className="text-blue-100">Be the first to experience our newest products</p>
              </div>
              <Link to="/products">
                <Button variant="secondary" className="whitespace-nowrap">
                  Shop All Products
                </Button>
              </Link>
            </div>
          </div>

          {/* Filters and sorting */}
          {!isLoading && (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 sm:mb-0">
                <div className="flex items-center">
                  <label htmlFor="brand-filter" className="mr-2 text-gray-600 dark:text-gray-400">
                    Brand:
                  </label>
                  <select
                    id="brand-filter"
                    value={filterBrand}
                    onChange={handleBrandFilterChange}
                    className="border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700 py-1 px-3"
                  >
                    {brands.map(brand => (
                      <option key={brand} value={brand}>
                        {brand === "all" ? "All Brands" : brand}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {filteredAndSortedProducts.length} products found
                </p>
              </div>
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-gray-600 dark:text-gray-400">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700 py-1 px-3"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Highest Rated</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : filteredAndSortedProducts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">
              No products found
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              There are currently no products matching your filters.
            </p>
            <Button 
              variant="primary" 
              className="mt-6"
              onClick={() => setFilterBrand("all")}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        {/* Additional info section */}
        {!isLoading && filteredAndSortedProducts.length > 0 && (
          <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Why Shop New Arrivals?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-primary-600 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Latest Technology
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Stay ahead with cutting-edge features and innovations.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-primary-600 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Exclusive Offers
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Special launch prices and bundle deals on new products.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-primary-600 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Extended Warranty
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Additional protection on selected new arrivals.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default NewArrivalsPage;
