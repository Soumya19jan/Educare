// UI Component Library for EduSure
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility to merge tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Button Component
export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className,
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}) {
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-400 hover:to-primary-500',
    secondary: 'bg-dark-800 border border-dark-600 text-dark-100 hover:bg-dark-700 hover:border-dark-500',
    ghost: 'text-dark-300 hover:text-white hover:bg-dark-800/50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button 
      className={cn(
        'rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// Input Component
export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full px-4 py-3 bg-dark-800/50 border border-dark-700 rounded-xl text-dark-100',
        'placeholder:text-dark-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30',
        'transition-all duration-200',
        className
      )}
      {...props}
    />
  );
}

// Card Component
export function Card({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn(
        'glass-card p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Badge Component
export function Badge({
  children,
  variant = 'default',
  className,
}: {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}) {
  const variants = {
    default: 'bg-dark-700 text-dark-200',
    success: 'bg-green-500/20 text-green-400',
    warning: 'bg-yellow-500/20 text-yellow-400',
    danger: 'bg-red-500/20 text-red-400',
    info: 'bg-blue-500/20 text-blue-400',
  };
  
  return (
    <span className={cn('px-2 py-1 text-xs font-medium rounded-full', variants[variant], className)}>
      {children}
    </span>
  );
}

// Avatar Component
export function Avatar({
  src,
  alt,
  fallback,
  className,
}: {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
}) {
  return (
    <div className={cn('w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center', className)}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full rounded-full object-cover" />
      ) : (
        <span className="text-white font-semibold">{fallback || '?'}</span>
      )}
    </div>
  );
}

export default {
  cn,
  Button,
  Input,
  Card,
  Badge,
  Avatar,
};