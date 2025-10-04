/**
 * Button Component Tests
 * Comprehensive unit tests following TDD principles
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Button from './Button';

describe('Button Component', () => {
  // Test rendering
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Button>Click me</Button>);

      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('btn', 'btn-primary');
    });

    it('renders with custom className', () => {
      render(<Button className="custom-class">Click me</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('renders different variants correctly', () => {
      const { rerender } = render(<Button variant="primary">Primary</Button>);
      expect(screen.getByRole('button')).toHaveClass('btn-primary');

      rerender(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByRole('button')).toHaveClass('btn-secondary');

      rerender(<Button variant="ghost">Ghost</Button>);
      expect(screen.getByRole('button')).toHaveClass('btn-ghost');
    });

    it('renders with different types', () => {
      render(<Button type="submit">Submit</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('is accessible when disabled', () => {
      render(<Button disabled>Disabled Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('disabled:opacity-50');
    });
  });

  // Test interactions
  describe('Interactions', () => {
    it('calls onClick handler when clicked', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(<Button disabled onClick={handleClick}>Disabled</Button>);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('handles keyboard interactions', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole('button');
      fireEvent.keyDown(button, { key: 'Enter' });

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  // Test accessibility
  describe('Accessibility', () => {
    it('supports ref forwarding', () => {
      const ref = { current: null };
      render(<Button ref={ref}>Button with ref</Button>);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('has proper ARIA attributes when disabled', () => {
      render(<Button disabled>Disabled Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('maintains focus states', () => {
      render(<Button>Focus Button</Button>);

      const button = screen.getByRole('button');
      button.focus();

      expect(button).toHaveFocus();
    });
  });

  // Test edge cases
  describe('Edge Cases', () => {
    it('renders empty children gracefully', () => {
      render(<Button>{null}</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('handles undefined className', () => {
      render(<Button className={undefined}>Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).not.toHaveClass('undefined');
    });

    it('passes through additional props', () => {
      render(<Button data-testid="custom-button">Custom Button</Button>);

      const button = screen.getByTestId('custom-button');
      expect(button).toBeInTheDocument();
    });
  });
});