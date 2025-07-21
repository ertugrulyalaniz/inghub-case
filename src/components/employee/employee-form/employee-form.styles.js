import { css } from "lit";

export const employeeFormStyles = css`
  :host {
    display: block;
  }

  .form-container {
    background-color: var(--color-white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-base);
    padding: var(--spacing-8);
    max-width: 1400px;
    margin: 0 auto;
  }

  .form-title {
    margin: 0 0 var(--spacing-6) 0;
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-gray-900);
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-6);
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-6) 8rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .form-label {
    margin-bottom: var(--spacing-2);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-gray-700);
  }

  .form-label.required::after {
    content: ' *';
    color: var(--color-error);
  }

  .form-select {
    width: 100%;
    height: var(--input-height);
    padding: 0 var(--spacing-3);
    font-family: var(--font-family-base);
    font-size: var(--font-size-base);
    color: var(--color-gray-900);
    background-color: var(--color-white);
    border: 1px solid var(--color-gray-300);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%236b7280' d='M8 11L3 6h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right var(--spacing-3) center;
    padding-right: var(--spacing-10);
  }

  .form-select:hover:not(:disabled) {
    border-color: var(--color-gray-400);
  }

  .form-select:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light);
  }

  .form-select:disabled {
    background-color: var(--color-gray-100);
    cursor: not-allowed;
  }

  .form-select.error {
    border-color: var(--color-error);
  }

  .form-select.error:focus {
    box-shadow: 0 0 0 3px var(--color-error-light);
  }

  .form-error {
    margin-top: var(--spacing-1);
    font-size: var(--font-size-sm);
    color: var(--color-error);
  }

  .form-actions {
    display: flex;
    justify-content: space-between;
    gap: var(--spacing-3);
    padding-top: var(--spacing-4);
    border-top: 1px solid var(--color-gray-200);
  }

  /* Mobile styles */
  @media (max-width: 768px) {
    .form-container {
      padding: var(--spacing-6);
    }

    .form-grid {
      grid-template-columns: 1fr;
      gap: var(--spacing-4);
    }

    .form-actions {
      flex-direction: column-reverse;
    }

    .form-actions app-button {
      width: 100%;
    }
  }
`;
