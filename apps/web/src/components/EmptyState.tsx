'use client';

import React from 'react';

export interface EmptyStateProps {
  /** Main title text */
  title: string;
  /** Optional hint/subtitle text */
  hint?: string;
  /** Optional action button */
  action?: React.ReactNode;
  /** Optional icon or illustration */
  icon?: React.ReactNode;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Custom className */
  className?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
}

const sizeStyles: Record<string, React.CSSProperties> = {
  sm: { padding: '1rem', minHeight: '80px' },
  md: { padding: '2rem', minHeight: '120px' },
  lg: { padding: '3rem', minHeight: '160px' },
};

const sizeTextStyles: Record<string, { title: React.CSSProperties; hint: React.CSSProperties }> = {
  sm: {
    title: { fontSize: '0.875rem', fontWeight: 500 },
    hint: { fontSize: '0.75rem', marginTop: '0.25rem' },
  },
  md: {
    title: { fontSize: '1rem', fontWeight: 500 },
    hint: { fontSize: '0.875rem', marginTop: '0.5rem' },
  },
  lg: {
    title: { fontSize: '1.125rem', fontWeight: 600 },
    hint: { fontSize: '1rem', marginTop: '0.5rem' },
  },
};

export function EmptyState({
  title,
  hint,
  action,
  icon,
  size = 'md',
  className = '',
  style,
}: EmptyStateProps) {
  const baseStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: '0.75rem',
    border: '1px dashed',
    borderColor: 'var(--border-color)',
    background: 'var(--bg)',
    ...sizeStyles[size],
    ...style,
  };

  const textStyles = sizeTextStyles[size] || sizeTextStyles.md;

  return (
    <div className={className} style={baseStyle}>
      {icon && (
        <div style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
          {icon}
        </div>
      )}
      <p style={{ ...textStyles.title, color: 'var(--text-primary)', margin: 0 }}>
        {title}
      </p>
      {hint && (
        <p style={{ ...textStyles.hint, color: 'var(--text-secondary)', margin: 0 }}>
          {hint}
        </p>
      )}
      {action && (
        <div style={{ marginTop: '1rem' }}>
          {action}
        </div>
      )}
    </div>
  );
}

export default EmptyState;