import React from 'react';

interface ProgressBarProps {
  progress: number;
  variant?: 'primary' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export default function ProgressBar({
  progress,
  variant = 'primary',
  size = 'md',
  showLabel = false,
  className = ''
}: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  const variantStyles = {
    primary: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500'
  };
  
  const sizeStyles = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6'
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeStyles[size]}`}>
        <div
          className={`${variantStyles[variant]} transition-all duration-500 ease-out ${sizeStyles[size]}`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-sm text-gray-600 text-right">
          {clampedProgress}%
        </div>
      )}
    </div>
  );
} 