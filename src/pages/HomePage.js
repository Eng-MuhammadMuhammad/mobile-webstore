import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card, { CardBody } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";

// Mock data for featured products
const mockFeaturedProducts = [
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
  },
];

// Mock data for new arrivals
const mockNewArrivals = [
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
  },
];

// Mock data for brands
const mockBrands = [
  {
    id: 1,
    name: "Apple",
    logo: "https://cdn.worldvectorlogo.com/logos/apple.svg",
  },
  {
    id: 2,
    name: "Samsung",
    logo: "https://cdn.worldvectorlogo.com/logos/samsung.svg",
  },
  {
    id: 3,
    name: "Google",
    logo: "https://cdn.worldvectorlogo.com/logos/google-icon.svg",
  },
  {
    id: 4,
    name: "Xiaomi",
    logo: "https://cdn.worldvectorlogo.com/logos/xiaomi-2.svg",
  },
  {
    id: 5,
    name: "OnePlus",
    logo: "https://cdn.worldvectorlogo.com/logos/oneplus-2.svg",
  },
  {
    id: 6,
    name: "Huawei",
    logo: "https://cdn.worldvectorlogo.com/logos/huawei-2.svg",
  },
];

// Product Card Component
const ProductCard = ({ product }) => {
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
          <Button variant="primary" size="sm">
            Add to Cart
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

// Hero Banner Component
const HeroBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-pattern"></div>
      <div className="relative px-6 py-12 md:py-20 md:px-12 lg:px-16 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            The Latest Mobile Technology at Your Fingertips
          </h1>
          <p className="mt-4 text-lg text-white text-opacity-90 max-w-md">
            Discover the newest smartphones with cutting-edge features and
            unbeatable prices.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="secondary" size="lg">
              Shop Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white bg-opacity-10 text-white border-white border-opacity-30 hover:bg-opacity-20"
            >
              View Deals
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            alt="Latest smartphones"
            className="max-w-full h-auto rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
};

// Brand Showcase Component
const BrandShowcase = ({ brands }) => {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Top Brands
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            to={`/products?brand=${brand.name}`}
            className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-12 w-12 object-contain"
            />
            <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {brand.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Featured Products Section
const FeaturedProducts = ({ products }) => {
  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Featured Products
        </h2>
        <Link
          to="/products"
          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

// New Arrivals Section
const NewArrivals = ({ products }) => {
  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          New Arrivals
        </h2>
        <Link
          to="/products/new"
          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

// Promotion Banner Component
const PromotionBanner = () => {
  return (
    <div className="bg-secondary-100 dark:bg-secondary-900 rounded-lg overflow-hidden my-12">
      <div className="px-6 py-12 md:px-12 text-center">
        <h2 className="text-3xl font-bold text-secondary-800 dark:text-secondary-200 mb-4">
          Summer Sale is On!
        </h2>
        <p className="text-lg text-secondary-700 dark:text-secondary-300 mb-8 max-w-2xl mx-auto">
          Get up to 40% off on selected smartphones and accessories. Limited
          time offer.
        </p>
        <Button variant="secondary" size="lg">
          Shop the Sale
        </Button>
      </div>
    </div>
  );
};

// Main HomePage Component
const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll simulate a loading delay
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setFeaturedProducts(mockFeaturedProducts);
        setNewArrivals(mockNewArrivals);
        setBrands(mockBrands);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto px-4">
        <div className="animate-pulse">
          {/* Hero skeleton */}
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8"></div>

          {/* Brands skeleton */}
          <div className="py-8">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mx-auto mb-6"></div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"
                ></div>
              ))}
            </div>
          </div>

          {/* Featured products skeleton */}
          <div className="py-8">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <HeroBanner />

      <BrandShowcase brands={brands} />

      <FeaturedProducts products={featuredProducts} />

      <PromotionBanner />

      <NewArrivals products={newArrivals} />

      <div className="py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Stay updated with the latest products, exclusive offers, and mobile
          tech news.
        </p>
        <div className="max-w-md mx-auto flex">
          <input
            type="email"
            placeholder="Your email address"
            className="form-input flex-grow rounded-r-none"
            required
          />
          <Button variant="primary" className="rounded-l-none">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
