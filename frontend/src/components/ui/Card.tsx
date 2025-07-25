import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Card Component for Sweat Shop Swag
 * 
 * Flexible card component with red/black theme variants
 * Supports modern glassmorphism effects and hover animations
 * 
 * @component
 * @example
 * <Card variant="default">
 *   <CardHeader>
 *     <CardTitle>NFC Technology</CardTitle>
 *   </CardHeader>
 *   <CardContent>Transform your business...</CardContent>
 * </Card>
 */

const cardVariants = cva(
  // Base styles with modern effects
  "rounded-xl border transition-all duration-300 ease-in-out hover:shadow-2xl transform hover:-translate-y-1",
  {
    variants: {
      variant: {
        // Default: Clean white card
        default: 
          "bg-white border-gray-200 shadow-lg hover:shadow-xl",
        
        // Primary: Red gradient theme
        primary: 
          "bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-lg hover:shadow-xl hover:from-red-100 hover:to-red-150",
        
        // Dark: Black theme card
        dark: 
          "bg-black border-gray-800 shadow-xl hover:shadow-2xl text-white",
        
        // Accent: White accent card
        accent: 
          "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 shadow-lg hover:shadow-xl",
        
        // Glass: Glassmorphism effect
        glass: 
          "bg-white/20 backdrop-blur-md border-white/30 shadow-xl hover:bg-white/30 hover:shadow-2xl",
        
        // Outlined: Border-only style
        outlined: 
          "bg-transparent border-2 border-red-600 hover:bg-red-50 hover:shadow-lg"
      },
      size: {
        sm: "p-4",
        md: "p-6", 
        lg: "p-8",
        xl: "p-10"
      },
      hover: {
        true: "cursor-pointer hover:scale-105",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      hover: false
    }
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Card content */
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, hover, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, size, hover, className }))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

// Card subcomponents for consistent structure
export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 pb-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-bold leading-none tracking-tight", className)}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-600", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn("text-gray-700", className)} 
    {...props} 
  />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-6", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";