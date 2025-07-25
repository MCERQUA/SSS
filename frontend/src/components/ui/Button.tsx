import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Button Component for Sweat Shop Swag
 * 
 * Reusable button component with red/black/yellow theme variants
 * Supports modern animations and interactions
 * 
 * @component
 * @example
 * <Button variant="primary" size="lg">Get Started</Button>
 * <Button variant="secondary" size="sm">Learn More</Button>
 * <Button variant="accent" disabled>Coming Soon</Button>
 */

const buttonVariants = cva(
  // Base styles - modern, animated, accessible
  "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
  {
    variants: {
      variant: {
        // Primary: Red gradient with hover effects
        primary: 
          "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:from-red-700 hover:to-red-800 hover:shadow-xl focus:ring-red-300",
        
        // Secondary: Black with red accent on hover
        secondary: 
          "bg-black text-white border-2 border-black hover:bg-red-600 hover:border-red-600 shadow-lg hover:shadow-xl focus:ring-gray-300",
        
        // Accent: White accent
        accent: 
          "bg-white text-black font-bold hover:bg-gray-100 shadow-lg hover:shadow-xl focus:ring-gray-200",
        
        // Outline: Transparent with red border
        outline: 
          "bg-transparent text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white shadow-md hover:shadow-lg focus:ring-red-300",
        
        // Ghost: Minimal style for subtle actions
        ghost: 
          "bg-transparent text-gray-700 hover:bg-gray-100 hover:text-black focus:ring-gray-200",
        
        // Destructive: For dangerous actions
        destructive: 
          "bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl focus:ring-red-300"
      },
      size: {
        sm: "px-4 py-2 text-sm h-9",
        md: "px-6 py-3 text-base h-11", 
        lg: "px-8 py-4 text-lg h-14",
        xl: "px-10 py-5 text-xl h-16",
        icon: "h-10 w-10 p-0"
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Button content */
  children: React.ReactNode;
  /** Loading state */
  loading?: boolean;
  /** Icon to display before text */
  leftIcon?: React.ReactNode;
  /** Icon to display after text */
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth, 
    children, 
    loading = false,
    leftIcon,
    rightIcon,
    disabled,
    ...props 
  }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        
        {!loading && leftIcon && (
          <span className="mr-2 flex items-center">{leftIcon}</span>
        )}
        
        <span className={loading ? "opacity-70" : ""}>{children}</span>
        
        {!loading && rightIcon && (
          <span className="ml-2 flex items-center">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";