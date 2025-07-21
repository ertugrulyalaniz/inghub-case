import { I18nMixin } from "./utils/i18n-mixin.js";

window.__testMode = true;

const mockTranslations = {
	"common.save": "Save",
	"common.cancel": "Cancel",
	"common.confirm": "Confirm",
	"common.close": "Close",
	"validation.required": "This field is required",
	"validation.invalidEmail": "Invalid email",
	"validation.invalidPhone": "Invalid phone",
	"validation.minLength": "Minimum {min} characters",
	"validation.maxLength": "Maximum {max} characters",
	"pagination.showing": "Showing",
	"pagination.to": "to",
	"pagination.of": "of",
	"pagination.items": "items",
	"pagination.page": "Page",
	"pagination.first": "First",
	"pagination.last": "Last",
	"pagination.previous": "Previous",
	"pagination.next": "Next",
	"pagination.itemsPerPage": "Items per page",
	"pagination.noItems": "No items",
};

const originalT = I18nMixin.prototype.t;
I18nMixin.prototype.t = function (key, params = {}) {
	const translation = mockTranslations[key] || key;
	if (params && Object.keys(params).length > 0) {
		return translation.replace(/{(\w+)}/g, (match, paramKey) => {
			return params[paramKey] !== undefined ? params[paramKey] : match;
		});
	}
	return translation;
};
