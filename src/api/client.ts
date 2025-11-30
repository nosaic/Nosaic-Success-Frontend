import axios from "axios";

// Token getter function that will be set by components
let getToken: (() => Promise<string | null>) | null = null;

export const setTokenGetter = (getter: () => Promise<string | null>) => {
	getToken = getter;
};

const api = axios.create({
	baseURL: "",
	headers: {
		"Content-Type": "application/json",
	},
});

// Add Clerk auth token to requests
api.interceptors.request.use(async (config) => {
	try {
		if (getToken) {
			const token = await getToken();
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
	} catch (error) {
		// Token might not be available, continue without it
		console.warn("Failed to get auth token:", error);
	}
	return config;
});

export default api;
