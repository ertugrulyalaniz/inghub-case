import { LitElement, html, css } from "lit";
import { initRouter } from "./router.js";
import "@components/layout/app-header/app-header.js";

/**
 * Main App Component
 * @element employee-app
 */
export class EmployeeApp extends LitElement {
	static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-color: var(--color-gray-50);
    }
    
    .app-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    
    .app-content {
      flex: 1;
      overflow-y: auto;
      padding: var(--spacing-2);
      max-width: 1400px;
      width: 100%;
      margin: 0 auto;
    }
    
    @media (max-width: 768px) {
      .app-content {
        padding: var(--spacing-4);
      }
    }
    
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: var(--z-index-modal);
    }
    
    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--color-gray-300);
      border-top-color: var(--color-primary);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;

	static properties = {
		loading: { type: Boolean },
	};

	constructor() {
		super();
		this.loading = false;
	}

	firstUpdated() {
		const outlet = this.shadowRoot.querySelector("#outlet");
		initRouter(outlet);
	}

	render() {
		return html`
      <app-header></app-header>
      
      <main class="app-main">
        <div class="app-content">
          <div id="outlet"></div>
        </div>
      </main>
      
      ${
				this.loading
					? html`
        <div class="loading-overlay">
          <div class="loading-spinner"></div>
        </div>
      `
					: ""
			}
    `;
	}

	setLoading(loading) {
		this.loading = loading;
	}
}

customElements.define("employee-app", EmployeeApp);
