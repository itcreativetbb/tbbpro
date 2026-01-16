import {
	type Article,
	type Person,
	type WebSite,
	type WithContext,
} from "schema-dts";
import avatar from "../assets/avatar.png";
import type { CollectionEntry } from "astro:content";

export const thoughtsWebsite: WithContext<WebSite> = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	url: `${import.meta.env.SITE}/thoughts/`,
	name: "Elorm Oscar • Thoughts",
	description: "Thoughts, writings from Elorm Oscar",
	inLanguage: "en_US",
};

export const mainWebsite: WithContext<WebSite> = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	url: import.meta.env.SITE,
	name: "Elorm Oscar",
	description: "Elorm Oscar's personal portfolio website",
	inLanguage: "en_US",
};

export const personSchema: WithContext<Person> = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Elorm Oscar",
	url: `${import.meta.env.SITE}`,
	image: `${import.meta.env.SITE}${avatar.src}`,
	sameAs: [
		"https://www.twitter.com/itniggatbb",
		"https://www.instagram.com/itniggatbb/",
		"https://www.linkedin.com/in/elorm-oscar/",
	],
};

export function getArticleSchema(post: CollectionEntry<"thoughts">) {
	const articleStructuredData: WithContext<Article> = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: post.data.title,
		url: `${import.meta.env.SITE}/thoughts/${post.id}/`,
		image: {
			"@type": "ImageObject",
			url: `${import.meta.env.SITE}${post.data.cover.src}/`,
		},
		description: post.data.excerpt,
		datePublished: post.data.date.toString(),
		publisher: {
			"@type": "Person",
			name: "Elorm Oscar",
			url: import.meta.env.SITE,
			image: import.meta.env.SITE + avatar.src,
		},
		author: {
			"@type": "Person",
			name: "Elorm Oscar",
			url: import.meta.env.SITE,
			image: import.meta.env.SITE + avatar.src,
		},
	};
	return articleStructuredData;
}
