import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../lib';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: ' bg-primary text-white hover:bg-primary/80',
        secondary:
          ' bg-secondary text-white',
        success:
          ' bg-green-700 text-white',

          gray:
          ' bg-gray-600 text-white',

        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground border border-gray-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
