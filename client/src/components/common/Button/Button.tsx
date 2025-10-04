/**
 * Button Component
 * A reusable, accessible button component following OOP and SOLID principles
 */

import React, { forwardRef } from 'react';
import { ButtonProps } from '../../../types';

/**
 * Button component with consistent styling and behavior
 * Uses forwardRef for proper ref forwarding
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      type = 'button',
      disabled = false,
      onClick,
      ...props
    },
    ref
  ) => {
    // Base classes that apply to all button variants
    const baseClasses = 'btn inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    // Variant-specific classes
    const variantClasses = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      ghost: 'btn-ghost',
    };

    // Size classes
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    // Combine all classes
    const classes = `
      ${baseClasses}
      ${variantClasses[variant]}
      ${sizeClasses.md}
      ${className}
    `.trim().replace(/\s+/g, ' ');

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        disabled={disabled}
        onClick={onClick}
        onKeyDown={disabled ? undefined : (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
        aria-disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

// Set display name for debugging
Button.displayName = 'Button';

export default Button;