import React, { useState, useEffect } from "react";

// Custom hook for lazy loading images
const useLazyLoading = () => {
  const [observer, setObserver] = useState(null);

  useEffect(() => {
    // Create IntersectionObserver instance
    const observerInstance = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            const src = lazyImage.getAttribute("data-src");

            if (src) {
              lazyImage.src = src;
              lazyImage.classList.remove("lazy");
              observerInstance.unobserve(lazyImage);
            }
          }
        });
      },
      {
        rootMargin: "200px 0px", // Start loading images 200px before they appear in viewport
        threshold: 0.01,
      }
    );

    setObserver(observerInstance);

    // Cleanup observer on unmount
    return () => {
      if (observerInstance) {
        observerInstance.disconnect();
      }
    };
  }, []);

  // Function to observe new images
  const observe = (element) => {
    if (observer && element) {
      observer.observe(element);
    }
  };

  return { observe };
};

// LazyImage component
const LazyImage = ({ src, alt, className, placeholderSrc, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { observe } = useLazyLoading();
  const defaultPlaceholder =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlMmUyZTIiLz48L3N2Zz4=";

  // Reference to the image element
  const imgRef = React.useRef(null);

  useEffect(() => {
    if (imgRef.current) {
      observe(imgRef.current);
    }
  }, [observe]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
    setIsLoaded(true);
  };

  return (
    <div
      className={`relative overflow-hidden ${className || ""}`}
      style={props.style}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      )}
      <img
        ref={imgRef}
        className={`lazy w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        src={placeholderSrc || defaultPlaceholder}
        data-src={src}
        alt={alt || "Image"}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
