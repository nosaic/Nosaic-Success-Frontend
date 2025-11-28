interface Env {
	// Bindings
	DB: D1Database;
	KV: KVNamespace;
	CHURN_REPORT: Workflow;

	// Secrets
	JWT_SECRET: string;
	ENCRYPTION_KEY: string;
	OPENROUTER_API_KEY: string;
	RESEND_API_KEY: string;
	SALESFORCE_CLIENT_ID: string;
	SALESFORCE_CLIENT_SECRET: string;
	HUBSPOT_CLIENT_ID: string;
	HUBSPOT_CLIENT_SECRET: string;
	ZENDESK_CLIENT_ID: string;
	ZENDESK_CLIENT_SECRET: string;
	INTERCOM_CLIENT_ID: string;
	INTERCOM_CLIENT_SECRET: string;
	FRESHDESK_CLIENT_ID: string;
	FRESHDESK_CLIENT_SECRET: string;

	// Variables
	ENVIRONMENT: string;
	FRONTEND_URL: string;
	API_URL: string;
}

// Extend for Pages Functions
interface ExecutionContext {
	waitUntil(promise: Promise<any>): void;
	passThroughOnException(): void;
}

interface WorkflowInstance {
	id: string;
	status: string;
}

interface Workflow {
	create(options: { params: any }): Promise<WorkflowInstance>;
	get(id: string): Promise<WorkflowInstance>;
}