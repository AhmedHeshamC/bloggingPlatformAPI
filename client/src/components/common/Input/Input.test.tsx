/**
 * Input Component Tests
 * Comprehensive unit tests following TDD principles
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Input from './Input';

describe('Input Component', () => {
  // Test rendering
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Input />);

      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('input');
    });

    it('renders with custom className', () => {
      render(<Input className="custom-class" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-class');
    });

    it('renders with different types', () => {
      const { rerender } = render(<Input type="text" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');

      rerender(<Input type="email" />);
      expect(screen.getByDisplayValue('')).toHaveAttribute('type', 'email');

      rerender(<Input type="password" />);
      expect(screen.getByDisplayValue('')).toHaveAttribute('type', 'password');
    });

    it('renders with placeholder', () => {
      render(<Input placeholder="Enter your email" />);

      const input = screen.getByPlaceholderText(/enter your email/i);
      expect(input).toBeInTheDocument();
    });

    it('renders with value', () => {
      render(<Input value="test value" />);

      const input = screen.getByDisplayValue('test value');
      expect(input).toBeInTheDocument();
    });

    it('renders with required attribute', () => {
      render(<Input required />);

      const input = screen.getByRole('textbox');
      expect(input).toBeRequired();
    });

    it('renders error state correctly', () => {
      render(<Input error="This field is required" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveClass('border-red-300');

      const errorMessage = screen.getByText(/this field is required/i);
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveAttribute('role', 'alert');
    });
  });

  // Test interactions
  describe('Interactions', () => {
    it('calls onChange handler when value changes', () => {
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'new value' } });

      expect(handleChange).toHaveBeenCalledWith('new value');
    });

    it('handles controlled component correctly', () => {
      const handleChange = vi.fn();
      render(<Input value="initial" onChange={handleChange} />);

      const input = screen.getByDisplayValue('initial');
      fireEvent.change(input, { target: { value: 'changed' } });

      expect(handleChange).toHaveBeenCalledWith('changed');
      expect(input).toHaveDisplayValue('initial'); // Still controlled by parent
    });

    it('does not call onChange when not provided', () => {
      render(<Input />);

      const input = screen.getByRole('textbox');
      expect(() => {
        fireEvent.change(input, { target: { value: 'test' } });
      }).not.toThrow();
    });
  });

  // Test accessibility
  describe('Accessibility', () => {
    it('supports ref forwarding', () => {
      const ref = { current: null };
      render(<Input ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('has proper ARIA attributes when there is an error', () => {
      render(<Input id="test-input" error="Error message" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('aria-describedby', 'test-input-error');

      const errorMessage = screen.getByRole('alert');
      expect(errorMessage).toHaveAttribute('id', 'test-input-error');
    });

    it('maintains focus states', () => {
      render(<Input />);

      const input = screen.getByRole('textbox');
      input.focus();

      expect(input).toHaveFocus();
    });

    it('associates label with input properly', () => {
      render(
        <label htmlFor="test-input">
          Test Label
          <Input id="test-input" />
        </label>
      );

      const input = screen.getByRole('textbox');
      const label = screen.getByLabelText(/test label/i);

      expect(input).toHaveAttribute('id', 'test-input');
      expect(label).toBeInTheDocument();
    });
  });

  // Test edge cases
  describe('Edge Cases', () => {
    it('handles undefined className', () => {
      render(<Input className={undefined} />);

      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).not.toHaveClass('undefined');
    });

    it('passes through additional props', () => {
      render(<Input data-testid="custom-input" name="test-name" />);

      const input = screen.getByTestId('custom-input');
      expect(input).toHaveAttribute('name', 'test-name');
    });

    it('handles empty error message gracefully', () => {
      render(<Input error="" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('maintains proper styling with multiple states', () => {
      render(
        <Input
          error="Error"
          className="custom-class"
          placeholder="Placeholder"
          required
        />
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('input', 'border-red-300', 'custom-class');
      expect(input).toHaveAttribute('placeholder', 'Placeholder');
      expect(input).toBeRequired();
    });
  });
});