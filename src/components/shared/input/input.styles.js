import { css } from "lit";

export const inputStyles = css`
  :host {
    display: block;
  }

  .form-group {
    margin-bottom: var(--spacing-4);
  }

  .form-label {
    display: block;
    margin-bottom: var(--spacing-2);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-gray-700);
  }

  .form-label.required::after {
    content: ' *';
    color: var(--color-error);
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .form-input {
    width: 100%;
    height: var(--input-height);
    padding: 0 var(--spacing-3);
    font-family: var(--font-family-base);
    font-size: var(--font-size-base);
    color: var(--color-gray-900);
    background-color: var(--color-white);
    border: 1px solid var(--color-gray-300);
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
    appearance: none;
  }

  .form-input:hover:not(:disabled):not(:focus) {
    border-color: var(--color-gray-400);
  }

  .form-input:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light);
  }

  .form-input:disabled {
    background-color: var(--color-gray-100);
    color: var(--color-gray-500);
    cursor: not-allowed;
  }

  .form-input:readonly {
    background-color: var(--color-gray-50);
    cursor: default;
  }

  .form-input.error {
    border-color: var(--color-error);
  }

  .form-input.error:focus {
    box-shadow: 0 0 0 3px var(--color-error-light);
  }

  /* With icon */
  .form-input.has-icon {
    padding-left: var(--spacing-10);
  }

  .input-icon {
    position: absolute;
    left: var(--spacing-3);
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--spacing-4);
    height: var(--spacing-4);
    color: var(--color-gray-500);
    pointer-events: none;
  }

  /* Character count */
  .char-count {
    position: absolute;
    right: var(--spacing-3);
    font-size: var(--font-size-xs);
    color: var(--color-gray-500);
    pointer-events: none;
  }

  .char-count.over-limit {
    color: var(--color-error);
  }

  .form-input:focus ~ .char-count {
    display: none;
  }

  /* Error and hint messages */
  .form-error,
  .form-hint {
    margin-top: var(--spacing-1);
    font-size: var(--font-size-sm);
  }

  .form-error {
    color: var(--color-error);
  }

  .form-hint {
    color: var(--color-gray-600);
  }

  /* Date input specific */
  input[type="date"]::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }

  /* Number input - hide spinners */
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  /* Animations */
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
  }

  .form-input.error {
    animation: shake 0.3s ease-in-out;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .form-input {
      font-size: 16px; /* Prevent zoom on iOS */
    }
  }
`;
