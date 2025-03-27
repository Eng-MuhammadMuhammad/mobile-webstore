import React, { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useInView, useDeferredLoading } from "../utils/performance";

// Component for implementing code splitting and lazy loading of components
const LazyComponent = ({
  component: Component,
  fallback,
  delay = 200,
  ...props
}) => {
  const shouldLoad = useDeferredLoading(delay);
  const { ref, inView } = useInView({
    rootMargin: "200px 0px",
    threshold: 0.1,
  });
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (inView && shouldLoad && !shouldRender) {
      setShouldRender(true);
    }
  }, [inView, shouldLoad, shouldRender]);

  return (
    <div ref={ref} className="w-full">
      {shouldRender ? <Component {...props} /> : fallback}
    </div>
  );
};

// Component for optimizing font loading
const FontOptimizer = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Check if the browser supports the Font Loading API
    if ("fonts" in document) {
      Promise.all([
        document.fonts.load("1em Inter"),
        document.fonts.load("700 1em Inter"),
      ])
        .then(() => {
          setFontsLoaded(true);
        })
        .catch(() => {
          // Fallback if font loading fails
          setFontsLoaded(true);
        });
    } else {
      // Fallback for browsers that don't support the Font Loading API
      const timeoutId = setTimeout(() => {
        setFontsLoaded(true);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, []);

  return (
    <div
      className={`font-optimization ${
        fontsLoaded ? "fonts-loaded" : "fonts-loading"
      } ${theme}`}
    >
      {children}
    </div>
  );
};

// Component for optimizing animations based on user preferences
const AnimationOptimizer = ({ children }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <div
      className={`animation-optimization ${
        prefersReducedMotion ? "reduced-motion" : "standard-motion"
      }`}
    >
      {children}
    </div>
  );
};

// Component for optimizing image loading with WebP support
const ImageOptimizer = ({ src, fallbackSrc, alt, ...props }) => {
  const [supportsWebP, setSupportsWebP] = useState(false);

  useEffect(() => {
    const checkWebPSupport = async () => {
      try {
        const webPCheck = new Image();
        webPCheck.onload = () => {
          setSupportsWebP(true);
        };
        webPCheck.onerror = () => {
          setSupportsWebP(false);
        };
        webPCheck.src =
          "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
      } catch (e) {
        setSupportsWebP(false);
      }
    };

    checkWebPSupport();
  }, []);

  // Extract file extension and path
  const getOptimizedSrc = () => {
    if (!supportsWebP || !src) return src || fallbackSrc;

    const hasWebPVersion = src.includes(".webp");
    if (hasWebPVersion) return src;

    // Check if src is a URL or a local path
    const isURL = src.startsWith("http");

    if (isURL) {
      // For URLs, we assume there's a WebP version available with the same name but .webp extension
      const urlParts = src.split(".");
      if (urlParts.length > 1) {
        urlParts[urlParts.length - 1] = "webp";
        return urlParts.join(".");
      }
    } else {
      // For local paths, we assume there's a WebP version available with the same name but .webp extension
      const pathParts = src.split(".");
      if (pathParts.length > 1) {
        pathParts[pathParts.length - 1] = "webp";
        return pathParts.join(".");
      }
    }

    return src;
  };

  return <img src={getOptimizedSrc()} alt={alt} {...props} />;
};

export { LazyComponent, FontOptimizer, AnimationOptimizer, ImageOptimizer };
