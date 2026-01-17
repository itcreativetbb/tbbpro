import DOMPurify from "dompurify";

export const escapeHTML = (str: string = ""): string =>
	str.replace(
		/[&<>"']/g,
		(ch) =>
			({
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				'"': "&quot;",
				"'": "&#39;",
			})[ch] || ch,
	);

export const sanitizeHTML = (html: string): string => {
	return DOMPurify.sanitize(html, {
		ALLOWED_TAGS: ["p", "br", "strong", "em", "code", "pre", "a", "ul", "ol", "li", "blockquote"],
		ALLOWED_ATTR: ["href", "target", "rel", "class"],
		ALLOW_DATA_ATTR: false,
		FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form", "input", "textarea", "select", "button"],
		FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover", "onfocus", "onblur", "onchange", "onsubmit"],
	});
};


