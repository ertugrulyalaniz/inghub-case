import { css } from "lit";

export const dialogStyles = css`
  :host {
    --dialog-max-width-small: 400px;
    --dialog-max-width-medium: 600px;
    --dialog-max-width-large: 800px;
  }

  .dialog-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-4);
    z-index: var(--z-index-modal);
    animation: fadeIn var(--transition-fast);
  }

  .dialog {
    background-color: var(--color-white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xl);
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - var(--spacing-8));
    width: 100%;
    animation: slideIn var(--transition-base);
  }

  .dialog--small {
    max-width: var(--dialog-max-width-small);
  }

  .dialog--medium {
    max-width: var(--dialog-max-width-medium);
  }

  .dialog--large {
    max-width: var(--dialog-max-width-large);
  }

  /* Header */
  .dialog__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-6);
    border-bottom: 1px solid var(--color-gray-200);
  }

  .dialog__title {
    margin: 0;
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-gray-900);
  }

  .dialog__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    background: none;
    border: none;
    border-radius: var(--radius-md);
    color: var(--color-gray-500);
    cursor: pointer;
    transition: all var(--transition-fast);
    margin-left: auto;
  }

  .dialog__close:hover {
    background-color: var(--color-gray-100);
    color: var(--color-gray-700);
  }

  .dialog__close:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  /* Body */
  .dialog__body {
    flex: 1;
    padding: var(--spacing-6);
    overflow-y: auto;
    color: var(--color-gray-700);
  }

  /* Footer */
  .dialog__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--spacing-3);
    padding: var(--spacing-6);
    border-top: 1px solid var(--color-gray-200);
  }

  /* Buttons (reusing button styles) */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 var(--spacing-4);
    height: var(--button-height);
    font-family: var(--font-family-base);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
    position: relative;
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn--primary {
    background-color: var(--color-primary);
    color: var(--color-white);
  }

  .btn--primary:hover:not(:disabled) {
    background-color: var(--color-primary-hover);
  }

  .btn--secondary {
    background-color: var(--color-white);
    color: var(--color-gray-700);
    border-color: var(--color-gray-300);
  }

  .btn--secondary:hover:not(:disabled) {
    background-color: var(--color-gray-50);
  }

  .btn--danger {
    background-color: var(--color-error);
    color: var(--color-white);
  }

  .btn--danger:hover:not(:disabled) {
    background-color: #dc2626;
  }

  /* Loader */
  .btn__loader {
    width: 16px;
    height: 16px;
    border: 2px solid var(--color-white);
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Responsive */
  @media (max-width: 768px) {
    .dialog {
      max-width: 100%;
      margin: 0;
    }

    .dialog__header,
    .dialog__body,
    .dialog__footer {
      padding: var(--spacing-4);
    }

    .dialog__footer {
      flex-direction: column-reverse;
      gap: var(--spacing-2);
    }

    .dialog__footer .btn {
      width: 100%;
    }
  }
`;
