import { useEffect, useState } from "react";

// Performance optimization utilities for React components

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - The function to debounce
 * @param {number} wait - The debounce delay in milliseconds
 * @returns {Function} - The debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function to limit how often a function can be called
 * @param {Function} func - The function to throttle
 * @param {number} limit - The throttle limit in milliseconds
 * @returns {Function} - The throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * Custom hook for detecting when an element is in viewport
 * @param {Object} options - IntersectionObserver options
 * @returns {Object} - ref to attach to element and inView boolean
 */
export const useInView = (options = {}) => {
  const [ref, setRef] = useState(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    observer.observe(ref);

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, options]);

  return { ref: setRef, inView };
};

/**
 * Custom hook for deferred loading of components
 * @param {number} delay - Delay in milliseconds before loading
 * @returns {boolean} - Whether the component should be loaded
 */
export const useDeferredLoading = (delay = 200) => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return shouldLoad;
};

/**
 * Custom hook for measuring component render performance
 * @param {string} componentName - Name of the component to measure
 * @returns {void}
 */
export const useRenderPerformance = (componentName) => {
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      console.log(
        `[Performance] ${componentName} rendered in ${endTime - startTime}ms`
      );
    };
  }, [componentName]);
};

/**
 * Memoize expensive function results
 * @param {Function} fn - Function to memoize
 * @returns {Function} - Memoized function
 */
export const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

/**
 * Custom hook for detecting network status
 * @returns {boolean} - Whether the user is online
 */
export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
};

/**
 * Custom hook for detecting idle time
 * @param {number} timeout - Idle timeout in milliseconds
 * @returns {boolean} - Whether the user is idle
 */
export const useIdleDetection = (timeout = 60000) => {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let idleTimer;

    const handleActivity = () => {
      setIsIdle(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsIdle(true), timeout);
    };

    // Set up initial timer
    idleTimer = setTimeout(() => setIsIdle(true), timeout);

    // Events to track user activity
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];
    events.forEach((event) => {
      document.addEventListener(event, handleActivity);
    });

    return () => {
      clearTimeout(idleTimer);
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [timeout]);

  return isIdle;
};
