/**
 * Card Component
 * A flexible card component following compound component pattern
 */

import React from 'react';
import { BaseComponentProps } from '../../../types';

/**
 * Card container component
 */
export const Card: React.FC<BaseComponentProps> = ({
  children,
  className = '',
}) => {
  const classes = `
    card
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

/**
 * Card header component
 */
export const CardHeader: React.FC<BaseComponentProps> = ({
  children,
  className = '',
}) => {
  const classes = `
    card-header
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

/**
 * Card body component
 */
export const CardBody: React.FC<BaseComponentProps> = ({
  children,
  className = '',
}) => {
  const classes = `
    card-body
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

/**
 * Card footer component
 */
export const CardFooter: React.FC<BaseComponentProps> = ({
  children,
  className = '',
}) => {
  const classes = `
    px-4 py-4 sm:px-6 bg-gray-50 border-t border-gray-200
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

// Export components as compound
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;