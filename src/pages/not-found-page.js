import { LitElement, html, css } from "lit";
import { navigateTo } from "../router.js";

export class NotFoundPage extends LitElement {
	static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 400px;
      text-align: center;
    }
    
    h1 {
      font-size: var(--font-size-3xl);
      color: var(--color-gray-900);
      margin-bottom: var(--spacing-2);
    }
    
    p {
      color: var(--color-gray-600);
      margin-bottom: var(--spacing-6);
    }
    
    .error-code {
      font-size: 120px;
      font-weight: var(--font-weight-bold);
      color: var(--color-gray-300);
      margin: 0;
    }
  `;

	render() {
		return html`
      <div class="error-code">404</div>
      <h1>Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <app-button @click=${() => navigateTo("/")}>
        Go to Home
      </app-button>
    `;
	}
}

customElements.define("not-found-page", NotFoundPage);
