import React from "react";

const Card = ({
  children,
  className = "",
  variant = "default",
  hover = false,
  ...props
}) => {
  const baseClasses = "rounded-lg overflow-hidden transition-all duration-200";

  const variantClasses = {
    default: "bg-white shadow-md dark:bg-gray-800",
    flat: "bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700",
    elevated: "bg-white shadow-lg dark:bg-gray-800",
    outline: "bg-transparent border border-gray-300 dark:border-gray-700",
  };

  const hoverClasses = hover ? "hover:shadow-lg hover:-translate-y-1" : "";

  const cardClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${hoverClasses}
    ${className}
  `;

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardBody = ({ children, className = "", ...props }) => {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`px-6 py-4 border-t border-gray-200 dark:border-gray-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
