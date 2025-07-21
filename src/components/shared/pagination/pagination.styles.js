import { css } from "lit";

export const paginationStyles = css`
  :host {
    display: block;
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-4);
    padding: var(--spacing-4) 0;
    flex-wrap: wrap;
  }

  /* Info section */
  .pagination__info {
    font-size: var(--font-size-sm);
    color: var(--color-gray-600);
    white-space: nowrap;
  }

  /* Pages section */
  .pagination__pages {
    display: flex;
    align-items: center;
    gap: var(--spacing-1);
  }

  /* Page buttons */
  .pagination__page,
  .pagination__nav {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    padding: 0 var(--spacing-2);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-gray-700);
    background-color: var(--color-white);
    border: 1px solid var(--color-gray-300);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
    user-select: none;
  }

  .pagination__page:hover:not(:disabled),
  .pagination__nav:hover:not(:disabled) {
    background-color: var(--color-gray-50);
    border-color: var(--color-gray-400);
  }

  .pagination__page:focus-visible,
  .pagination__nav:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  .pagination__page:disabled,
  .pagination__nav:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .pagination__page--active {
    background-color: var(--color-primary);
    color: var(--color-white);
    border-color: var(--color-primary);
  }

  .pagination__page--active:hover {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
  }

  /* Navigation buttons */
  .pagination__nav {
    gap: var(--spacing-1);
  }

  .pagination__nav svg {
    width: 16px;
    height: 16px;
  }

  .pagination__nav--previous,
  .pagination__nav--next {
    padding: 0 var(--spacing-3);
  }

  /* Ellipsis */
  .pagination__ellipsis {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    color: var(--color-gray-500);
    user-select: none;
  }

  /* Page size selector */
  .pagination__size {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    white-space: nowrap;
  }

  .pagination__size-label {
    font-size: var(--font-size-sm);
    color: var(--color-gray-600);
  }

  .pagination__size-select {
    height: 32px;
    padding: 0 var(--spacing-8) 0 var(--spacing-2);
    font-size: var(--font-size-sm);
    color: var(--color-gray-700);
    background-color: var(--color-white);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%236b7280' d='M8 11L3 6h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right var(--spacing-2) center;
    border: 1px solid var(--color-gray-300);
    border-radius: var(--radius-md);
    cursor: pointer;
    appearance: none;
    transition: all var(--transition-fast);
  }

  .pagination__size-select:hover {
    border-color: var(--color-gray-400);
  }

  .pagination__size-select:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light);
  }

  /* Compact mode */
  .pagination--compact {
    justify-content: center;
  }

  .pagination--compact .pagination__pages {
    gap: var(--spacing-2);
  }

  .pagination__compact-info {
    display: inline-flex;
    align-items: center;
    padding: 0 var(--spacing-3);
    font-size: var(--font-size-sm);
    color: var(--color-gray-700);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .pagination {
      justify-content: center;
    }

    .pagination__info,
    .pagination__size {
      display: none;
    }

    .pagination__nav span {
      display: none;
    }

    .pagination__nav {
      min-width: 32px;
      padding: 0;
    }
  }
`;
