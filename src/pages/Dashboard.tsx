import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import api from "../api/client";

export default function Dashboard() {
	const [config, setConfig] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [triggering, setTriggering] = useState(false);

	useEffect(() => {
		fetchConfig();
	}, []);

	const fetchConfig = async () => {
		try {
			const { data } = await api.get("/dashboard/config");
			setConfig(data);
		} catch (error) {
			console.error("Failed to fetch config:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleTrigger = async () => {
		setTriggering(true);
		try {
			await api.post("/workflows/trigger");
			alert("Workflow triggered successfully!");
		} catch (error: any) {
			alert(error.response?.data?.error || "Failed to trigger workflow");
		} finally {
			setTriggering(false);
		}
	};

	const toggleWorkflow = async () => {
		try {
			const { data } = await api.post("/dashboard/config/toggle");
			setConfig({ ...config, enabled: data.enabled });
		} catch (error) {
			alert("Failed to toggle workflow");
		}
	};

	if (loading) {
		return (
			<Layout>
				<div className="text-center py-12">Loading...</div>
			</Layout>
		);
	}

	return (
		<Layout>
			<div className="px-4 py-6 sm:px-0">
				<h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

				<div className="bg-white shadow rounded-lg p-6 mb-6">
					<h2 className="text-xl font-semibold mb-4">Workflow Status</h2>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<span className="text-gray-700">Status:</span>
							<span
								className={`px-3 py-1 rounded-full text-sm ${config.enabled ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
							>
								{config.enabled ? "Active" : "Inactive"}
							</span>
						</div>
						{config.crmProvider && (
							<div className="flex items-center justify-between">
								<span className="text-gray-700">CRM:</span>
								<span className="text-gray-900 capitalize">
									{config.crmProvider}
								</span>
							</div>
						)}
						{config.supportProvider && (
							<div className="flex items-center justify-between">
								<span className="text-gray-700">Support:</span>
								<span className="text-gray-900 capitalize">
									{config.supportProvider}
								</span>
							</div>
						)}
						<div className="flex items-center justify-between">
							<span className="text-gray-700">Frequency:</span>
							<span className="text-gray-900 capitalize">
								{config.reportFrequency}
							</span>
						</div>
						{config.lastRunAt && (
							<div className="flex items-center justify-between">
								<span className="text-gray-700">Last Run:</span>
								<span className="text-gray-900">
									{new Date(config.lastRunAt).toLocaleString()}
								</span>
							</div>
						)}
					</div>

					<div className="mt-6 flex gap-4">
						<button
							onClick={handleTrigger}
							disabled={triggering || !config.supportProvider}
							className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
						>
							{triggering ? "Triggering..." : "Run Report Now"}
						</button>
						<button
							onClick={toggleWorkflow}
							className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
						>
							{config.enabled ? "Disable" : "Enable"} Auto Reports
						</button>
					</div>
				</div>

				{!config.supportProvider && (
					<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
						<p className="text-sm text-yellow-700">
							Please configure your integrations in the Connections page to
							start generating reports.
						</p>
					</div>
				)}
			</div>
		</Layout>
	);
}
