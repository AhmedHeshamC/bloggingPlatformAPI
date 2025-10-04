/**
 * Input Component
 * A reusable, accessible input component following OOP and SOLID principles
 */

import React, { forwardRef, ChangeEvent } from 'react';
import { InputProps } from '../../../types';

/**
 * Input component with consistent styling and behavior
 * Uses forwardRef for proper ref forwarding
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      type = 'text',
      placeholder,
      value,
      error,
      required = false,
      onChange,
      ...props
    },
    ref
  ) => {
    // Handle input change
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    // Base classes that apply to all input variants
    const baseClasses = 'input block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 sm:text-sm';

    // State-based classes
    const stateClasses = error !== undefined
      ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500';

    // Combine all classes
    const classes = `
      ${baseClasses}
      ${stateClasses}
      ${className}
    `.trim().replace(/\s+/g, ' ');

    return (
      <div className="relative">
        <input
          ref={ref}
          type={type}
          className={classes}
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={handleChange}
          aria-invalid={error !== undefined ? 'true' : 'false'}
          aria-describedby={error !== undefined && error.trim() ? `${props.id || 'input'}-error` : undefined}
          {...props}
        />

        {/* Error message */}
        {error !== undefined && error.trim() && (
          <p
            id={`${props.id || 'input'}-error`}
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

// Set display name for debugging
Input.displayName = 'Input';

export default Input;