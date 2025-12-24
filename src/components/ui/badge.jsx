import React from 'react';
import { cn } from '../../lib/utils.js';

const Badge = ({ className, children, ...props }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export { Badge };