import { LitElement, html, svg } from "lit";
import { iconStyles } from "./icon.styles.js";

/**
 * @element app-icon
 *
 * @prop {String} name - Icon name
 * @prop {String} size - Icon size: small, medium, large, or custom number
 * @prop {String} color - Icon color (CSS color value)
 * @prop {Number} strokeWidth - Stroke width for outline icons
 */
export class AppIcon extends LitElement {
	static styles = [iconStyles];

	static properties = {
		name: { type: String },
		size: { type: String },
		color: { type: String },
		strokeWidth: { type: Number },
	};

	constructor() {
		super();
		this.name = "";
		this.size = "medium";
		this.color = "currentColor";
		this.strokeWidth = 2;
	}

	render() {
		const size = this._getSize();
		const icon = this._getIcon();

		if (!icon) {
			console.warn(`Icon "${this.name}" not found`);
			return html``;
		}

		return html`
      <svg
        class="icon"
        width=${size}
        height=${size}
        viewBox="0 0 24 24"
        fill="none"
        stroke=${this.color}
        stroke-width=${this.strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        ${icon}
      </svg>
    `;
	}

	_getSize() {
		const sizes = {
			small: 16,
			medium: 20,
			large: 24,
		};

		return sizes[this.size] || this.size;
	}

	_getIcon() {
		const icons = {
			// Navigation
			menu: svg`
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      `,
			close: svg`
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      `,
			"chevron-left": svg`
        <polyline points="15 18 9 12 15 6"></polyline>
      `,
			"chevron-right": svg`
        <polyline points="9 18 15 12 9 6"></polyline>
      `,
			"chevron-down": svg`
        <polyline points="6 9 12 15 18 9"></polyline>
      `,
			"chevron-up": svg`
        <polyline points="18 15 12 9 6 15"></polyline>
      `,

			// Actions
			edit: svg`
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      `,
			delete: svg`
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      `,
			save: svg`
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
        <polyline points="17 21 17 13 7 13 7 21"></polyline>
        <polyline points="7 3 7 8 15 8"></polyline>
      `,
			plus: svg`
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      `,
			minus: svg`
        <line x1="5" y1="12" x2="19" y2="12"></line>
      `,
			check: svg`
        <polyline points="20 6 9 17 4 12"></polyline>
      `,
			x: svg`
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      `,

			// User/Profile
			user: svg`
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      `,
			users: svg`
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      `,

			// Communication
			mail: svg`
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      `,
			phone: svg`
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      `,

			// Date/Time
			calendar: svg`
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      `,
			clock: svg`
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      `,

			// UI Elements
			search: svg`
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      `,
			filter: svg`
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
      `,
			settings: svg`
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M12 1v6m0 6v6m4.22-10.22l4.24-4.24M6.34 17.66l4.24-4.24m0-2.83l-4.24-4.24m12.12 12.12l-4.24-4.24"></path>
      `,
			info: svg`
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      `,
			"alert-circle": svg`
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      `,
			"help-circle": svg`
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      `,

			// View modes
			grid: svg`
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
      `,
			list: svg`
        <line x1="8" y1="6" x2="21" y2="6"></line>
        <line x1="8" y1="12" x2="21" y2="12"></line>
        <line x1="8" y1="18" x2="21" y2="18"></line>
        <line x1="3" y1="6" x2="3.01" y2="6"></line>
        <line x1="3" y1="12" x2="3.01" y2="12"></line>
        <line x1="3" y1="18" x2="3.01" y2="18"></line>
      `,

			// Status
			"check-circle": svg`
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      `,
			"x-circle": svg`
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      `,
			"alert-triangle": svg`
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      `,

			// Arrows
			"arrow-left": svg`
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      `,
			"arrow-right": svg`
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      `,
			"arrow-up": svg`
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5 12 12 5 19 12"></polyline>
      `,
			"arrow-down": svg`
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <polyline points="19 12 12 19 5 12"></polyline>
      `,

			// Business
			briefcase: svg`
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      `,
			building: svg`
        <path d="M3 21h18"></path>
        <path d="M9 8h1"></path>
        <path d="M9 12h1"></path>
        <path d="M9 16h1"></path>
        <path d="M14 8h1"></path>
        <path d="M14 12h1"></path>
        <path d="M14 16h1"></path>
        <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path>
      `,

			// Language
			globe: svg`
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      `,
		};

		return icons[this.name];
	}
}

customElements.define("app-icon", AppIcon);
