
import * as React from "react";

import { cn } from "@/lib/utils"; // Ensure this path is correct

// Base Card component - Generally, responsiveness is applied where these components are used.

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Base styles from original code
      "rounded-xl border bg-card text-card-foreground shadow dark:bg-darkbg dark:text-white",
      // Add any base mobile styles here if needed, though often handled in usage
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Base styles from original code (mobile first)
      "flex flex-col space-y-1.5 p-4", // Mobile padding (example)
      // Desktop overrides
      "md:p-6", // Desktop padding from original
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <h3 // Changed div to h3 for semantics
    ref={ref}
    className={cn(
      // Base styles from original code (mobile first)
      "font-semibold leading-none tracking-tight text-base", // Example mobile text size
      // Desktop overrides
      "md:text-lg", // Example desktop text size (adjust as needed)
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <p // Changed div to p for semantics
    ref={ref}
    className={cn(
      // Base styles from original code (mobile first)
      "text-xs text-muted-foreground", // Example mobile text size
      // Desktop overrides
      "md:text-sm", // Desktop text size from original
      className
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Base styles from original code (mobile first)
      "p-4 pt-0", // Mobile padding (example)
      // Desktop overrides
      "md:p-6 md:pt-0", // Desktop padding from original
      className
    )}
    {...props}
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Base styles from original code (mobile first)
      "flex items-center p-4 pt-0", // Mobile padding (example)
      // Desktop overrides
      "md:p-6 md:pt-0", // Desktop padding from original
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};

