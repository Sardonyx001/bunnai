const main = async (endpoint: string): Promise<string[]> => {
	try {
		const response = await fetch(`${endpoint.replace(/\/$/, "")}/api/tags`);
		if (!response.ok)
			throw new Error("Failed to fetch models from Ollama endpoint");
		const data = await response.json();
		if (Array.isArray(data.models)) {
			return data.models
				.map((m: any) => m.name || m.model || "")
				.filter(Boolean);
		}
		if (Array.isArray(data.tags)) {
			return data.tags
				.map((t: any) => t.name || t.tag || "")
				.filter(Boolean);
		}
		return [];
	} catch (e) {
		console.error("Error fetching Ollama models:", e);
		return [];
	}
};

const endpoint = "http://localhost:11434";
await main(endpoint)
	.then((models) => {
		console.log("Available models:", models);
	})
	.catch((error) => {
		console.error("Error:", error);
	});
