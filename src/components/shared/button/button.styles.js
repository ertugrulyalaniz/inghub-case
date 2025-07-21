import { css } from "lit";

export const buttonStyles = css`
  :host {
    display: inline-block;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-2);
    padding: 0 var(--spacing-4);
    height: var(--button-height);
    font-family: var(--font-family-base);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    line-height: 1;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
    user-select: none;
    position: relative;
    overflow: hidden;
  }

  .btn:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Variants */
  .btn--primary {
    background-color: var(--color-primary);
    color: var(--color-white);
  }

  .btn--primary:hover:not(:disabled) {
    background-color: var(--color-primary-hover);
  }

  .btn--primary:active:not(:disabled) {
    background-color: var(--color-primary-active);
  }

  .btn--secondary {
    background-color: var(--color-secondary);
    color: var(--color-white);
  }

  .btn--secondary:hover:not(:disabled) {
    background-color: var(--color-secondary-hover);
    border-color: var(--color-gray-400);
  }

  .btn--danger {
    background-color: var(--color-error);
    color: var(--color-white);
  }

  .btn--danger:hover:not(:disabled) {
    background-color: #dc2626;
  }

  .btn--ghost {
    background-color: transparent;
    color: var(--color-primary);
  }

  .btn--ghost:hover:not(:disabled) {
    background-color: var(--color-primary-light);
  }

  /* Sizes */
  .btn--small {
    height: 32px;
    padding: 0 var(--spacing-3);
    font-size: var(--font-size-xs);
  }

  .btn--large {
    height: 48px;
    padding: 0 var(--spacing-6);
    font-size: var(--font-size-base);
  }

  /* Full width */
  .btn--block {
    width: 100%;
  }

  /* Icon only */
  .btn--icon {
    width: var(--button-height);
    padding: 0;
  }

  .btn--icon.btn--small {
    width: 32px;
  }

  .btn--icon.btn--large {
    width: 48px;
  }

  /* Loading state */
  .btn--loading {
    color: transparent;
  }

  .btn__loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  .btn--primary .btn__loader,
  .btn--danger .btn__loader {
    border-color: var(--color-white);
    border-right-color: transparent;
  }

  @keyframes spin {
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  /* Ripple effect */
  .btn__ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    transform: scale(0);
    animation: ripple 0.6s ease-out;
  }

  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
