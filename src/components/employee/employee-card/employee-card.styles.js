import { css } from "lit";

export const employeeCardStyles = css`
  :host {
    display: block;
  }

  .card {
    background-color: var(--color-white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-base);
    overflow: hidden;
    transition: all var(--transition-base);
  }

  .card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  .card__name {
    margin: 0;
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-gray-900);
  }

  .card__actions {
    display: flex;
    gap: var(--spacing-2);
    padding: var(--spacing-6);
    padding-top: var(--spacing-0);

  }

  .card__body {
    padding: var(--spacing-6);
    padding-bottom: var(--spacing-0);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .card__row {
    display: flex;
    align-items: flex-start;
    margin-bottom: var(--spacing-3);
    gap: var(--spacing-2);
  }

  .card__row:last-child {
    margin-bottom: 0;
  }
  .card__cell {
    display: flex;
    width: 50%;
    margin-bottom: var(--spacing-3);
    gap: var(--spacing-0);
    flex-direction: column;
  }

  .card__cell:last-child {
    margin-bottom: 0;
  }

  .card__label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-gray-400);
  }

  .card__value {
    flex: 1;
    font-size: var(--font-size-md);
    color: var(--color-black);
  }

  .card__badge {
    display: inline-block;
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    border-radius: var(--radius-sm);
  }

  @media (max-width: 768px) {

    .card__body {
      padding: var(--spacing-4);
    }

    .card__row {
      flex-direction: column;
      gap: var(--spacing-1);
    }
    .card__cell {
      width: 100%;
    }

    .card__label {
      flex: none;
    }
  }
`;
