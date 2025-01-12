import React from 'react';

const Button = ({ className, size, onClick, children }) => {
  return (
    <button
      className={`btn ${className} ${size === 'lg' ? 'btn-lg' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;