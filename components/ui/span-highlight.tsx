import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const spanHighlightVariants = cva('rounded-md bg-primary/10 text-primary', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    },
    padding: {
      tight: 'px-2.5 py-[2px]',
      default: 'px-3 py-0.5',
      loose: 'px-4 py-1'
    },
    display: {
      'block': 'block',
      'inline': 'inline',
      'inline-flex': 'inline-flex items-center',
      'w-fit': 'w-fit'
    },
    gap: {
      sm: 'gap-1',
      md: 'gap-1.5',
      lg: 'gap-2'
    },
    interactive: {
      true: 'cursor-pointer transition-all duration-300 ease-in-out hover:bg-primary/15',
      false: ''
    }
  },
  defaultVariants: {
    size: 'xs',
    padding: 'default',
    display: 'inline-flex',
    gap: 'sm',
    interactive: false
  }
});

export type SpanHighlightProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  as?: React.ElementType;
} & React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof spanHighlightVariants>;

const SpanHighlight = React.forwardRef<HTMLElement, SpanHighlightProps>(
  (
    {
      className,
      children,
      size,
      padding,
      display,
      gap,
      interactive,
      icon,
      iconPosition = 'left',
      as: Component = 'code',
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          spanHighlightVariants({
            size,
            padding,
            display,
            gap,
            interactive,
            className
          })
        )}
        {...props}
      >
        {icon && iconPosition === 'left' && (
          <span className='min-h-3 min-w-3'>{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className='min-h-3 min-w-3'>{icon}</span>
        )}
      </Component>
    );
  }
);

SpanHighlight.displayName = 'SpanHighlight';

export { SpanHighlight, spanHighlightVariants };
