import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { WishlistContext } from "../contexts/WishlistContext";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Card, { CardBody } from "../components/ui/Card";

// Mock product data (same as in ProductListingPage)
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
    description:
      "The iPhone 13 Pro features a 6.1-inch Super Retina XDR display with ProMotion, A15 Bionic chip, pro camera system with 12MP telephoto, wide, and ultra wide cameras, and up to 28 hours of video playback.",
    specifications: {
      display: "6.1-inch Super Retina XDR display with ProMotion",
      chip: "A15 Bionic chip",
      camera: "Pro 12MP camera system: Telephoto, Wide, and Ultra Wide cameras",
      frontCamera: "12MP TrueDepth front camera",
      battery: "Up to 28 hours video playback",
      waterResistant:
        "IP68 water resistant (maximum depth of 6 meters up to 30 minutes)",
      connectivity: "5G capable",
      faceId: "Face ID",
      os: "iOS 15",
    },
    images: [
      "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1574719128055-f4f84a835363?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    ],
    colors: ["Graphite", "Gold", "Silver", "Sierra Blue"],
    storageOptions: ["128GB", "256GB", "512GB", "1TB"],
    reviews: [
      {
        id: 1,
        user: "John D.",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        rating: 5,
        date: "2023-01-15",
        title: "Best iPhone ever!",
        comment:
          "The camera quality is amazing and the battery life is much improved from previous models.",
      },
      {
        id: 2,
        user: "Sarah M.",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        rating: 4,
        date: "2023-01-10",
        title: "Great phone but expensive",
        comment:
          "Love the phone but it is quite expensive. The ProMotion display is fantastic though.",
      },
      {
        id: 3,
        user: "Mike T.",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        rating: 5,
        date: "2022-12-28",
        title: "Amazing camera system",
        comment:
          "As a photographer, I'm blown away by the camera capabilities of this phone. The macro mode is incredible!",
      },
    ],
    relatedProducts: [2, 5, 9],
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
    description:
      "The Samsung Galaxy S22 Ultra features a 6.8-inch Dynamic AMOLED 2X display, Snapdragon 8 Gen 1 processor, 108MP wide camera, and built-in S Pen functionality.",
    specifications: {
      display: "6.8-inch Dynamic AMOLED 2X display",
      chip: "Snapdragon 8 Gen 1",
      camera:
        "108MP wide, 12MP ultra-wide, 10MP telephoto with 3x optical zoom, 10MP telephoto with 10x optical zoom",
      frontCamera: "40MP front camera",
      battery: "5,000mAh",
      waterResistant: "IP68 water and dust resistant",
      connectivity: "5G capable",
      security: "Ultrasonic Fingerprint",
      os: "Android 12, One UI 4.1",
    },
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1578854360041-3f8f9497e3d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1553179459-4514c0f52f41?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    ],
    colors: ["Phantom Black", "Phantom White", "Green", "Burgundy"],
    storageOptions: ["128GB", "256GB", "512GB", "1TB"],
    reviews: [
      {
        id: 1,
        user: "Alex K.",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        rating: 5,
        date: "2023-02-05",
        title: "S Pen is a game changer",
        comment:
          "Having the S Pen built into the phone is incredibly useful. The screen is gorgeous and performance is top notch.",
      },
      {
        id: 2,
        user: "Emily R.",
        avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        rating: 4,
        date: "2023-01-22",
        title: "Great phone with amazing camera",
        comment:
          "The 108MP camera takes incredible photos, especially in low light. Battery life could be better though.",
      },
    ],
    relatedProducts: [1, 3, 7],
  },
];

// Get all products for related products
const allMockProducts = mockProducts;

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { isInWishlist, toggleWishlistItem } = useContext(WishlistContext);

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isInWish, setIsInWish] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Find product by ID
        const foundProduct = mockProducts.find((p) => p.id === parseInt(id));

        if (foundProduct) {
          setProduct(foundProduct);
          setSelectedColor(foundProduct.colors[0]);
          setSelectedStorage(foundProduct.storageOptions[0]);

          // Get related products
          if (
            foundProduct.relatedProducts &&
            foundProduct.relatedProducts.length > 0
          ) {
            const related = allMockProducts.filter((p) =>
              foundProduct.relatedProducts.includes(p.id)
            );
            setRelatedProducts(related);
          }

          // Check if in wishlist
          setIsInWish(isInWishlist(foundProduct.id));
        } else {
          // Product not found
          navigate("/products");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate, isInWishlist]);

  const handleAddToCart = () => {
    if (product) {
      const productToAdd = {
        ...product,
        color: selectedColor,
        storage: selectedStorage,
      };
      addToCart(productToAdd, quantity);

      // Show success message or open cart sidebar
      // For now, we'll just log to console
      console.log(`Added ${quantity} ${product.name} to cart`);
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      toggleWishlistItem(product);
      setIsInWish(!isInWish);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Image gallery skeleton */}
            <div className="lg:w-1/2">
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"
                  ></div>
                ))}
              </div>
            </div>

            {/* Product info skeleton */}
            <div className="lg:w-1/2">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>

              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>

              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
              <div className="flex gap-2 mb-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"
                  ></div>
                ))}
              </div>

              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
              <div className="flex gap-2 mb-6">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-10 w-16 bg-gray-200 dark:bg-gray-700 rounded"
                  ></div>
                ))}
              </div>

              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Product Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Button variant="primary" onClick={() => navigate("/products")}>
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-6 text-sm">
        <ol className="flex items-center space-x-2">
          <li>
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Home
            </Link>
          </li>
          <li className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </li>
          <li>
            <Link
              to="/products"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Products
            </Link>
          </li>
          <li className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </li>
          <li>
            <Link
              to={`/products/${product.category}`}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 capitalize"
            >
              {product.category}
            </Link>
          </li>
          <li className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </li>
          <li className="text-gray-700 dark:text-gray-300 truncate max-w-xs">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Image Gallery */}
        <div className="lg:w-1/2">
          <div className="relative mb-4 bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-auto object-contain aspect-square"
            />
            {product.isNew && (
              <Badge variant="primary" className="absolute top-4 left-4">
                New
              </Badge>
            )}
            {product.discountPrice && (
              <Badge variant="danger" className="absolute top-4 right-4">
                Sale
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`border-2 rounded-lg overflow-hidden ${
                  selectedImage === index
                    ? "border-primary-600 dark:border-primary-400"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} - view ${index + 1}`}
                  className="w-full h-auto object-cover aspect-square"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {product.name}
          </h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
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
              <span className="ml-2 text-gray-600 dark:text-gray-400">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
            <span className="mx-4 text-gray-300 dark:text-gray-600">|</span>
            <span
              className={`${
                product.inStock
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="mb-6">
            {product.discountPrice ? (
              <div className="flex items-center">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${product.discountPrice}
                </span>
                <span className="ml-3 text-xl text-gray-500 line-through dark:text-gray-400">
                  ${product.price}
                </span>
                <Badge variant="danger" className="ml-3">
                  {Math.round(
                    (1 - product.discountPrice / product.price) * 100
                  )}
                  % OFF
                </Badge>
              </div>
            ) : (
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ${product.price}
              </span>
            )}
          </div>

          <div className="mb-6">
            <p className="text-gray-700 dark:text-gray-300">
              {product.description}
            </p>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Color
            </h3>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                    selectedColor === color
                      ? "border-primary-600 dark:border-primary-400"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  title={color}
                >
                  <span className="sr-only">{color}</span>
                  <span
                    className="w-6 h-6 rounded-full"
                    style={{
                      backgroundColor: color.toLowerCase().replace(" ", ""),
                    }}
                  ></span>
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Selected: <span className="font-medium">{selectedColor}</span>
            </p>
          </div>

          {/* Storage Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Storage
            </h3>
            <div className="flex flex-wrap gap-3">
              {product.storageOptions.map((storage) => (
                <button
                  key={storage}
                  onClick={() => setSelectedStorage(storage)}
                  className={`px-4 py-2 rounded-md border ${
                    selectedStorage === storage
                      ? "border-primary-600 bg-primary-50 text-primary-700 dark:border-primary-400 dark:bg-primary-900 dark:text-primary-300"
                      : "border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300"
                  }`}
                >
                  {storage}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Quantity
            </h3>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="p-2 border border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <div className="w-12 text-center border-t border-b border-gray-300 py-2 dark:border-gray-600 dark:text-white">
                {quantity}
              </div>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 10}
                className="p-2 border border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              disabled={!product.inStock}
              onClick={handleAddToCart}
            >
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
            <Button
              variant={isInWish ? "secondary" : "outline"}
              size="lg"
              onClick={handleWishlistToggle}
              className="flex items-center justify-center"
            >
              {isInWish ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Added to Wishlist
                </>
              ) : (
                <>
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Add to Wishlist
                </>
              )}
            </Button>
          </div>

          {/* Shipping Info */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
            <div className="flex items-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                />
              </svg>
              <span className="font-medium text-gray-900 dark:text-white">
                Free Shipping
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 ml-7">
              Delivery in 2-5 business days
            </p>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-12">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button className="border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Specifications
            </button>
            <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Reviews ({product.reviewCount})
            </button>
          </nav>
        </div>

        <div className="py-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Technical Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex">
                <div className="w-1/3 text-gray-600 dark:text-gray-400 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </div>
                <div className="w-2/3 text-gray-900 dark:text-white">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Customer Reviews
        </h3>

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="md:w-1/3">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  {product.rating}
                </div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
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
                </div>
                <div className="text-gray-600 dark:text-gray-400 mb-4">
                  Based on {product.reviewCount} reviews
                </div>
                <Button variant="primary">Write a Review</Button>
              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            {product.reviews.map((review) => (
              <div
                key={review.id}
                className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700 last:border-0 last:mb-0 last:pb-0"
              >
                <div className="flex items-center mb-2">
                  <img
                    src={review.avatar}
                    alt={review.user}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {review.user}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {review.date}
                    </div>
                  </div>
                </div>

                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  {review.title}
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  {review.comment}
                </p>
              </div>
            ))}

            <div className="text-center mt-6">
              <Button variant="outline">Load More Reviews</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-12">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            You May Also Like
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <Card
                key={product.id}
                className="h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
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
                      View
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
