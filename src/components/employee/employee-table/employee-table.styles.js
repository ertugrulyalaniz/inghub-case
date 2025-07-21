import { css } from "lit";

export const employeeTableStyles = css`
  :host {
    display: block;
  }

  .table-container {
    background-color: var(--color-white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-base);
    overflow: hidden;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
  }

  .table th{
    padding: var(--spacing-6) var(--spacing-4);
    text-align: left;
    font-size: var(--font-size-sm);
  }
  .table td {
    padding: var(--spacing-3) var(--spacing-4);
    text-align: left;
    font-size: var(--font-size-sm);
  }

  .table th {
    background-color: var(--color-gray-50);
    font-weight: var(--font-weight-semibold);
    color: var(--color-primary);
    border-bottom: 2px solid var(--color-gray-200);
    white-space: nowrap;
  }

  .table__sortable {
    cursor: pointer;
    user-select: none;
    transition: all var(--transition-fast);
  }

  .table__sortable:hover {
    color: var(--color-gray-900);
  }

  .table__sortable span {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-1);
  }

  .table__sortable.active {
    color: var(--color-primary);
  }

  .table td {
    color: var(--color-gray-900);
    border-bottom: 1px solid var(--color-gray-100);
  }

  .table tbody tr {
    transition: background-color var(--transition-fast);
  }

  .table tbody tr:hover {
    background-color: var(--color-gray-50);
  }

  .table tbody tr.selected {
    background-color: var(--color-primary-light);
  }

  .table__checkbox-cell {
    width: 40px;
    padding: var(--spacing-3);
  }

  .table__checkbox {
    cursor: pointer;
  }

  .table__link {
    color: var(--color-primary);
    text-decoration: none;
    transition: all var(--transition-fast);
  }

  .table__link:hover {
    text-decoration: underline;
  }

  .table__badge {
    display: inline-block;
    padding: var(--spacing-1) var(--spacing-2);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    border-radius: var(--radius-sm);
    white-space: nowrap;
  }

  .table__badge--department {
    background-color: var(--color-primary-light);
    color: var(--color-primary);
  }

  .table__badge--position {
    background-color: var(--color-secondary-light);
    color: var(--color-secondary);
  }

  .table__actions {
    width: 100px;
  }

  .table__actions-header {
    text-align: center;
  }

  .table__action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    margin: 0 var(--spacing-1);
    border: none;
    background-color: transparent;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .table__action:hover {
    background-color: var(--color-gray-100);
  }

  .table__empty {
    text-align: center;
    color: var(--color-gray-500);
    padding: var(--spacing-8) !important;
  }

  /* Responsive table */
  @media (max-width: 1024px) {
    .table-container {
      overflow-x: auto;
    }

    .table {
      min-width: 800px;
    }
  }
`;
