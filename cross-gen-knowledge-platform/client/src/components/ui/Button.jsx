import React from "react";

export const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`transition-all duration-300 font-bold rounded-lg shadow-md ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};


export default Button;
