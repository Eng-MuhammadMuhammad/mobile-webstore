import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { CardBody } from "../components/ui/Card";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { CartContext } from "../contexts/CartContext";

// Mock product data - filtered for deals (products with discountPrice)
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
    id: 3,
    name: "Google Pixel 6 Pro",
    brand: "Google",
    image:
      "https://images.unsplash.com/photo-1635870723802-e88d76ae3b3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: 899,
    discountPrice: 799,
    rating: 4.6,
    reviewCount: 156,
    isNew: false,
    isFeatured: true,
    category: "smartphones",
    storage: "128GB",
    color: "Stormy Black",
    inStock: true,
  },
  {
    id: 4,
    name: "Xiaomi Mi 11",
    brand: "Xiaomi",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: 749,
    discountPrice: 699,
    rating: 4.5,
    reviewCount: 123,
    isNew: false,
    isFeatured: true,
    category: "smartphones",
    storage: "256GB",
    color: "Midnight Gray",
    inStock: true,
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
    id: 11,
    name: "Apple Watch Series 7",
    brand: "Apple",
    image:
      "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: 399,
    discountPrice: 349,
    rating: 4.8,
    reviewCount: 178,
    isNew: false,
    isFeatured: true,
    category: "wearables",
    storage: "32GB",
    color: "Midnight",
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
          {product.isNew && (
            <div className="absolute top-2 left-2">
              <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                New
              </span>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
              Sale
            </span>
          </div>
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
            <div className="flex items-center">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                ${product.discountPrice}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">
                ${product.price}
              </span>
              <span className="ml-2 text-sm text-green-600 dark:text-green-400">
                {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% off
              </span>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <Button 
              variant="secondary" 
              className="flex-1"
              onClick={handleAddToCart}
            >
              Add to Cart
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

const DealsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("discount-desc");
  const [deals, setDeals] = useState([]);

  // Fetch deals
  useEffect(() => {
    const fetchDeals = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        // In a real app, this would be an API call to get deals
        setDeals(mockProducts);
      } catch (error) {
        console.error("Error fetching deals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeals();
  }, []);

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Apply sorting
  const sortedDeals = [...deals].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.discountPrice - b.discountPrice;
      case "price-desc":
        return b.discountPrice - a.discountPrice;
      case "discount-desc":
        return ((b.price - b.discountPrice) / b.price) - ((a.price - a.discountPrice) / a.price);
      case "rating-desc":
        return b.rating - a.rating;
      case "newest":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default:
        return 0;
    }
  });

  return (
    <Layout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Special Deals & Offers
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Discover our best discounts and limited-time offers on top mobile devices.
          </p>
          
          {/* Banner */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-6 mb-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">Limited Time Offers</h2>
                <p className="text-primary-100">Save up to 30% on selected smartphones and accessories</p>
              </div>
              <Link to="/products">
                <Button variant="secondary" className="whitespace-nowrap">
                  Shop All Products
                </Button>
              </Link>
            </div>
          </div>

          {/* Results count and sorting */}
          {!isLoading && (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <p className="text-gray-600 dark:text-gray-400 mb-2 sm:mb-0">
                {deals.length} deals available
              </p>
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
                  <option value="discount-desc">Biggest Discount</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Highest Rated</option>
                  <option value="newest">Newest First</option>
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
        ) : deals.length === 0 ? (
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
              No deals available
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              There are currently no active deals. Please check back later.
            </p>
            <Link to="/products" className="mt-6 inline-block">
              <Button variant="primary">Browse All Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedDeals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        {/* Additional info section */}
        {!isLoading && deals.length > 0 && (
          <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              About Our Deals
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our special deals are updated regularly to bring you the best prices on top mobile devices. 
              All discounted products come with the same warranty and quality assurance as regular-priced items.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Limited time offers may expire without notice. Prices shown are inclusive of all taxes.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DealsPage;
