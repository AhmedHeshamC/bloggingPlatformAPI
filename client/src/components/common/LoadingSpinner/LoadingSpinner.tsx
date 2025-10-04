/**
 * LoadingSpinner Component
 * A reusable loading spinner component with customizable sizes
 */

import React from 'react';
import { LoadingSpinnerProps } from '../../../types';

/**
 * Loading spinner component for indicating loading states
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className = '',
  size = 'md',
}) => {
  // Size classes for different spinner sizes
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  // Combine classes
  const classes = `
    loading-spinner
    ${sizeClasses[size]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div
      className={classes}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;