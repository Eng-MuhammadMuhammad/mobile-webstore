import React from "react";

const Sidebar = ({
  isOpen,
  onClose,
  position = "left",
  width = "md",
  overlay = true,
  className = "",
  children,
}) => {
  // Width classes
  const widthClasses = {
    sm: "w-64",
    md: "w-80",
    lg: "w-96",
    full: "w-full",
  };

  // Position classes
  const positionClasses = {
    left: `left-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`,
    right: `right-0 ${isOpen ? "translate-x-0" : "translate-x-full"}`,
  };

  return (
    <>
      {/* Overlay */}
      {overlay && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 bottom-0 ${widthClasses[width]} ${positionClasses[position]} 
          bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 ease-in-out
          overflow-y-auto ${className}
        `}
      >
        {children}
      </div>
    </>
  );
};

export const SidebarHeader = ({ children, className = "", onClose }) => {
  return (
    <div
      className={`px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between ${className}`}
    >
      <div className="font-medium">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          aria-label="Close sidebar"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export const SidebarBody = ({ children, className = "" }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

export const SidebarFooter = ({ children, className = "" }) => {
  return (
    <div
      className={`px-4 py-3 border-t border-gray-200 dark:border-gray-700 ${className}`}
    >
      {children}
    </div>
  );
};

export default Sidebar;
