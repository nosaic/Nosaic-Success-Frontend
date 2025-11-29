interface Env {
	SuccessBackend: {
		fetch: (request: Request) => Promise<Response>;
	};
}

export const onRequest = async (context: { request: Request; env: Env }) => {
	const { request, env } = context;
	if (request.method === "OPTIONS") {
		return new Response(null, {
			status: 200,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Authorization",
				"Access-Control-Allow-Credentials": "true",
			},
		});
	}
	return await env.SuccessBackend.fetch(request);
};
