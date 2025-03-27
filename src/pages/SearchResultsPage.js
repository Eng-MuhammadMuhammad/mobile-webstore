import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { CardBody } from "../components/ui/Card";
import LoadingSpinner from "../components/ui/LoadingSpinner";

// Mock product data - same as ProductListingPage
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
    id: 9,
    name: 'iPad Pro 12.9"',
    brand: "Apple",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: 1099,
    discountPrice: null,
    rating: 4.9,
    reviewCount: 201,
    isNew: false,
    isFeatured: true,
    category: "tablets",
    storage: "512GB",
    color: "Space Gray",
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

// Product Card Component - same as in ProductListingPage
const ProductCard = ({ product }) => {
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
            {product.name}
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

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  // Get search query from URL
  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  // Fetch search results
  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          const results = mockProducts.filter(
            (product) =>
              product.name.toLowerCase().includes(query) ||
              product.brand.toLowerCase().includes(query) ||
              product.category.toLowerCase().includes(query) ||
              product.color.toLowerCase().includes(query) ||
              product.storage.toLowerCase().includes(query)
          );
          setSearchResults(results);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Apply sorting
  const sortedResults = [...searchResults].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return (a.discountPrice || a.price) - (b.discountPrice || b.price);
      case "price-desc":
        return (b.discountPrice || b.price) - (a.discountPrice || a.price);
      case "rating-desc":
        return b.rating - a.rating;
      case "newest":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default:
        // Default to relevance (no additional sorting)
        return 0;
    }
  });

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("searchQuery");
    
    if (query.trim()) {
      const params = new URLSearchParams(searchParams);
      params.set("q", query);
      window.history.pushState({}, "", `/search?${params.toString()}`);
      setSearchQuery(query);
    }
  };

  return (
    <Layout>
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Search Results for "{searchQuery}"
          </h1>
          
          {/* Search form */}
          <form onSubmit={handleSearchSubmit} className="mb-6">
            <div className="flex w-full md:w-2/3 lg:w-1/2">
              <Input
                type="text"
                name="searchQuery"
                placeholder="Search products..."
                defaultValue={searchQuery}
                className="flex-grow"
              />
              <Button type="submit" variant="primary" className="ml-2">
                Search
              </Button>
            </div>
          </form>

          {/* Results count and sorting */}
          {!isLoading && (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <p className="text-gray-600 dark:text-gray-400 mb-2 sm:mb-0">
                {searchResults.length} {searchResults.length === 1 ? "result" : "results"} found
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
                  <option value="relevance">Relevance</option>
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
        ) : searchResults.length === 0 ? (
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">
              No results found
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              We couldn't find any products matching "{searchQuery}".
            </p>
            <div className="mt-6">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Try adjusting your search or browse our categories:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {["smartphones", "tablets", "wearables", "accessories"].map((category) => (
                  <Link
                    key={category}
                    to={`/products/${category}`}
                    className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/products" className="mt-6 inline-block">
              <Button variant="primary">Browse All Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchResultsPage;
