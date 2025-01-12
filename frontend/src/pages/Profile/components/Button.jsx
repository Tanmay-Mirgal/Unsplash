import React from 'react';

const Button = ({ className, size, onClick, children }) => {
  return (
    <button
      className={`btn ${className} ${size === 'lg' ? 'btn-lg' : ''} sm:w-full sm:py-2`}
      onClick={onClick}
      style={{ maxWidth: '100%', padding: '10px' }}
    >
      {children}
    </button>
  );
};

export default Button;
