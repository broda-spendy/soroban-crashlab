'use client';

import React from 'react';
import { GenericPageSkeleton } from './LoadingSkeleton';
import { EmptyState } from './EmptyState';

export type ListStateProps =
  | { state: 'loading'; skeleton?: React.ReactNode }
  | { state: 'error'; message?: React.ReactNode; onRetry?: () => void }
  | { state: 'empty'; message?: React.ReactNode; action?: React.ReactNode }
  | { state: 'success'; children: React.ReactNode };

export function ListState(props: ListStateProps) {
  switch (props.state) {
    case 'loading':
      return (
        <div role="status" aria-live="polite" className="fade-in">
          {props.skeleton ? props.skeleton : <GenericPageSkeleton variant="table" rows={5} />}
        </div>
      );
    case 'error':
      return (
        <div role="alert" className="card card-padding text-center py-8 sm:py-12 fade-in" style={{ borderLeft: '4px solid #CC1016' }}>
          <span className="text-2xl sm:text-3xl mb-2 sm:mb-3 block">⚠</span>
          <p className="font-semibold" style={{ color: '#CC1016' }}>
            {props.message || 'An error occurred while loading data.'}
          </p>
          {props.onRetry && (
            <div className="mt-3 sm:mt-4">
              <button type="button" onClick={props.onRetry} className="btn-primary text-xs sm:text-sm">
                Retry
              </button>
            </div>
          )}
        </div>
      );
    case 'empty':
      return (
        <EmptyState
          title={typeof props.message === 'string' ? props.message : 'No items found.'}
          action={props.action}
          size="md"
        />
      );
    case 'success':
      return <>{props.children}</>;
    default:
      // Type-level coverage assertion proving compile-time exhaustiveness enforcement.
      const _exhaustiveCheck: never = props;
      return _exhaustiveCheck;
  }
}
