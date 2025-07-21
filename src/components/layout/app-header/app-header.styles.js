import { css } from "lit";

export const appHeaderStyles = css`
  :host {
    display: block;
  }

  .header {
    height: var(--header-height);
    background-color: var(--color-white);
    border-bottom: 1px solid var(--color-gray-200);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--spacing-6);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .header__left {
    display: flex;
    align-items: center;
  }

  .header__right {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
  }

  .header__brand {
    display: flex;
    align-items: center;
  }

  .header__logo {
    margin-right: var(--spacing-2);
  }
  
  .header__title{
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
  }

  .header__label {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-gray-800);
    margin-right: auto;
  }

  /* Language Selector */
  .header__language {
    position: relative;
  }

  .header__language-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 1px solid var(--color-gray-300);
    background-color: var(--color-white);
    border-radius: var(--radius-md);
    cursor: pointer;
    font-size: 20px;
    transition: all var(--transition-fast);
  }

  .header__language-toggle:hover {
    border-color: var(--color-gray-400);
    background-color: var(--color-gray-50);
  }

  .header__language-menu {
    position: absolute;
    top: calc(100% + var(--spacing-2));
    right: 0;
    background-color: var(--color-white);
    border: 1px solid var(--color-gray-200);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    min-width: 140px;
    overflow: hidden;
    animation: dropdownOpen var(--transition-fast);
  }

  .header__language-option {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    width: 100%;
    padding: var(--spacing-3) var(--spacing-4);
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
    color: var(--color-gray-700);
    font-size: var(--font-size-sm);
    transition: all var(--transition-fast);
  }

  .header__language-option:hover {
    background-color: var(--color-gray-50);
  }

  .header__language-option.active {
    background-color: var(--color-primary-light);
    color: var(--color-primary);
    font-weight: var(--font-weight-medium);
  }

  /* Mobile Styles */
  @media (max-width: 768px) {
    .header {
      padding: 0 var(--spacing-4);
    }

    .header__label {
      display: none;
    }
  }

  /* Animations */
  @keyframes dropdownOpen {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
