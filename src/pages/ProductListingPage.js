import React, { useState, useEffect, useContext } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Card, { CardBody } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Input from "../components/ui/Input";
import { CartContext } from "../contexts/CartContext";

// Mock product data
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

// Available filters
const brands = [
  "Apple",
  "Samsung",
  "Google",
  "Xiaomi",
  "OnePlus",
  "Nothing",
  "Oppo",
  "Vivo",
];
const categories = ["smartphones", "tablets", "wearables", "accessories"];
const priceRanges = [
  { id: "under-500", label: "Under $500", min: 0, max: 500 },
  { id: "500-1000", label: "$500 - $1000", min: 500, max: 1000 },
  { id: "over-1000", label: "Over $1000", min: 1000, max: Infinity },
];
const sortOptions = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
];

// Product Card Component
const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  
  const handleAddToCart = () => {
    if (product.inStock) {
      addToCart(product);
    }
  };
  
  return (
    <Card className="h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
          loading="lazy"
        />
        {product.isNew && (
          <Badge variant="primary" className="absolute top-2 left-2">
            New
          </Badge>
        )}
        {product.discountPrice && (
          <Badge variant="danger" className="absolute top-2 right-2">
            Sale
          </Badge>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center rounded-t-lg">
            <span className="text-white font-medium px-3 py-1 bg-red-600 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <CardBody>
        <h3 className="text-sm text-gray-500 dark:text-gray-400">
          {product.brand}
        </h3>
        <Link to={`/product/${product.id}`} className="block mt-1">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {product.name}
          </h2>
        </Link>
        <div className="mt-2 flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
              ({product.reviewCount})
            </span>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div>
            {product.discountPrice ? (
              <div className="flex items-center">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  ${product.discountPrice}
                </span>
                <span className="ml-2 text-sm text-gray-500 line-through dark:text-gray-400">
                  ${product.price}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                ${product.price}
              </span>
            )}
          </div>
          <Button 
            variant="primary" 
            size="sm" 
            disabled={!product.inStock}
            onClick={handleAddToCart}
          >
            {product.inStock ? "Add to Cart" : "Sold Out"}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

// Filter Sidebar Component
const FilterSidebar = ({
  selectedBrands,
  setSelectedBrands,
  selectedCategories,
  setSelectedCategories,
  selectedPriceRange,
  setSelectedPriceRange,
  inStockOnly,
  setInStockOnly,
  onApplyFilters,
}) => {
  const handleBrandChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRange(range === selectedPriceRange ? null : range);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
          Brands
        </h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center">
              <input
                id={`brand-${brand}`}
                name={`brand-${brand}`}
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor={`brand-${brand}`}
                className="ml-2 text-sm text-gray-700 dark:text-gray-300"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <input
                id={`category-${category}`}
                name={`category-${category}`}
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor={`category-${category}`}
                className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
          Price Range
        </h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <div key={range.id} className="flex items-center">
              <input
                id={`price-${range.id}`}
                name="price-range"
                type="radio"
                checked={selectedPriceRange === range.id}
                onChange={() => handlePriceRangeChange(range.id)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor={`price-${range.id}`}
                className="ml-2 text-sm text-gray-700 dark:text-gray-300"
              >
                {range.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center">
          <input
            id="in-stock"
            name="in-stock"
            type="checkbox"
            checked={inStockOnly}
            onChange={() => setInStockOnly(!inStockOnly)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
          />
          <label
            htmlFor="in-stock"
            className="ml-2 text-sm text-gray-700 dark:text-gray-300"
          >
            In Stock Only
          </label>
        </div>
      </div>

      <div className="pt-4">
        <Button variant="primary" fullWidth onClick={onApplyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

// Main ProductListingPage Component
const ProductListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter states
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("price-asc");
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize from URL params
  useEffect(() => {
    const brand = searchParams.get("brand");
    const category = searchParams.get("category");
    const query = searchParams.get("q");

    if (brand) setSelectedBrands([brand]);
    if (category) setSelectedCategories([category]);
    if (query) setSearchQuery(query);
  }, [searchParams]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setProducts(mockProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Apply brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Apply price range filter
    if (selectedPriceRange) {
      const range = priceRanges.find((r) => r.id === selectedPriceRange);
      if (range) {
        result = result.filter((product) => {
          const price = product.discountPrice || product.price;
          return price >= range.min && price <= range.max;
        });
      }
    }

    // Apply in-stock filter
    if (inStockOnly) {
      result = result.filter((product) => product.inStock);
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        result.sort(
          (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price)
        );
        break;
      case "price-desc":
        result.sort(
          (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price)
        );
        break;
      case "rating-desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [
    products,
    selectedBrands,
    selectedCategories,
    selectedPriceRange,
    inStockOnly,
    sortBy,
    searchQuery,
  ]);

  const handleApplyFilters = () => {
    // Update URL params
    const params = new URLSearchParams();

    if (selectedBrands.length === 1) {
      params.set("brand", selectedBrands[0]);
    }

    if (selectedCategories.length === 1) {
      params.set("category", selectedCategories[0]);
    }

    if (searchQuery) {
      params.set("q", searchQuery);
    }

    setSearchParams(params);
    setIsMobileFilterOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleApplyFilters();
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleClearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedPriceRange(null);
    setInStockOnly(false);
    setSearchQuery("");
    setSearchParams({});
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar skeleton */}
            <div className="md:w-1/4 hidden md:block">
              <div className="h-screen bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>

            {/* Main content skeleton */}
            <div className="flex-1">
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar - Desktop */}
        <div className="md:w-1/4 hidden md:block">
          <div className="sticky top-20 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Filters
              </h2>
              <button
                onClick={handleClearFilters}
                className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Clear All
              </button>
            </div>
            <FilterSidebar
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedPriceRange={selectedPriceRange}
              setSelectedPriceRange={setSelectedPriceRange}
              inStockOnly={inStockOnly}
              setInStockOnly={setInStockOnly}
              onApplyFilters={handleApplyFilters}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <form onSubmit={handleSearchSubmit} className="flex">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-0"
                  />
                  <Button type="submit" className="ml-2">
                    Search
                  </Button>
                </form>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <label
                    htmlFor="sort-by"
                    className="mr-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    Sort by:
                  </label>
                  <select
                    id="sort-by"
                    value={sortBy}
                    onChange={handleSortChange}
                    className="form-select text-sm"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="md:hidden p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Active filters */}
            {(selectedBrands.length > 0 ||
              selectedCategories.length > 0 ||
              selectedPriceRange ||
              inStockOnly) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedBrands.map((brand) => (
                  <Badge
                    key={brand}
                    variant="primary"
                    className="flex items-center"
                  >
                    {brand}
                    <button
                      onClick={() =>
                        setSelectedBrands(
                          selectedBrands.filter((b) => b !== brand)
                        )
                      }
                      className="ml-1 p-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </Badge>
                ))}

                {selectedCategories.map((category) => (
                  <Badge
                    key={category}
                    variant="secondary"
                    className="flex items-center capitalize"
                  >
                    {category}
                    <button
                      onClick={() =>
                        setSelectedCategories(
                          selectedCategories.filter((c) => c !== category)
                        )
                      }
                      className="ml-1 p-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </Badge>
                ))}

                {selectedPriceRange && (
                  <Badge variant="info" className="flex items-center">
                    {
                      priceRanges.find((r) => r.id === selectedPriceRange)
                        ?.label
                    }
                    <button
                      onClick={() => setSelectedPriceRange(null)}
                      className="ml-1 p-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </Badge>
                )}

                {inStockOnly && (
                  <Badge variant="success" className="flex items-center">
                    In Stock Only
                    <button
                      onClick={() => setInStockOnly(false)}
                      className="ml-1 p-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              Showing {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </p>
          </div>

          {/* Product grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
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
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                No products found
              </h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Try adjusting your filters or search query.
              </p>
              <Button
                variant="primary"
                className="mt-4"
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileFilterOpen(false)}
          ></div>
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-white dark:bg-gray-800 shadow-xl overflow-y-auto">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Filters
                  </h2>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-6">
                  <FilterSidebar
                    selectedBrands={selectedBrands}
                    setSelectedBrands={setSelectedBrands}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    selectedPriceRange={selectedPriceRange}
                    setSelectedPriceRange={setSelectedPriceRange}
                    inStockOnly={inStockOnly}
                    setInStockOnly={setInStockOnly}
                    onApplyFilters={handleApplyFilters}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;
