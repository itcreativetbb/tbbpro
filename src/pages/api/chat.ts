import type { APIRoute } from "astro";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText, convertToCoreMessages } from "ai";
import aboutMe from "../../utils/aboutMe";
import { validateMessageContent } from "../../utils/sanitize";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	try {
		const apiKey = import.meta.env.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY;
		if (!apiKey) {
			console.error("Missing GOOGLE_API_KEY");
			return new Response(JSON.stringify({ error: "Server configuration error" }), {
				status: 500,
				headers: { "Content-Type": "application/json" },
			});
		}

		const google = createGoogleGenerativeAI({
			apiKey: apiKey,
		});

		const { messages } = await request.json();

		if (!Array.isArray(messages)) {
			return new Response(JSON.stringify({ error: "Invalid messages format" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		for (const message of messages) {
			if (message.role === "user" && !validateMessageContent(message.content)) {
				return new Response(JSON.stringify({ error: "Invalid message content" }), {
					status: 400,
					headers: { "Content-Type": "application/json" },
				});
			}
		}

		const result = streamText({
			model: google("gemini-1.5-flash"),
			system: aboutMe(),
			temperature: 0.5,
			messages: convertToCoreMessages(messages),
		});

		return result.toDataStreamResponse();
	} catch (error) {
		console.error("Chat API Error:", error);
		return new Response(JSON.stringify({ error: "Internal server error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
};
