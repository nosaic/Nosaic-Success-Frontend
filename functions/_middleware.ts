import type { EventContext, Fetcher } from "@cloudflare/workers-types";

/*
This middleware function acts as a universal proxy.
It intercepts all requests made to the /functions/* path on the Pages deployment.
Each incoming request is forwarded directly to the backend API worker via the 'SuccessBackend' service binding.
This consolidates the proxy logic into a single file, avoiding code duplication across multiple function files.
*/

// Define the shape of the environment bindings.
type MyEnv = {
	SuccessBackend: Fetcher;
};

export const onRequest = (context: EventContext<MyEnv, any, any>) => {
	return context.env.SuccessBackend.fetch(context.request);
};
