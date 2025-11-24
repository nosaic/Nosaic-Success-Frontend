import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import api from "../api/client";

export default function Settings() {
	const [frequency, setFrequency] = useState("weekly");
	const [destination, setDestination] = useState("email");
	const [destinationConfig, setDestinationConfig] = useState("");
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [message, setMessage] = useState("");

	useEffect(() => {
		fetchConfig();
	}, []);

	const fetchConfig = async () => {
		try {
			const { data } = await api.get("/dashboard/config");
			setFrequency(data.reportFrequency);
			setDestination(data.reportDestination);
			setDestinationConfig(data.destinationConfig);
		} catch (error) {
			console.error("Failed to fetch config:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSaving(true);
		setMessage("");

		try {
			await api.put("/dashboard/config", {
				reportFrequency: frequency,
				reportDestination: destination,
				destinationConfig,
			});
			setMessage("Settings saved successfully");
		} catch (error: any) {
			setMessage(error.response?.data?.error || "Failed to save settings");
		} finally {
			setSaving(false);
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
				<h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>

				{message && (
					<div className="mb-4 p-4 bg-blue-50 rounded-md">
						<p className="text-sm text-blue-800">{message}</p>
					</div>
				)}

				<div className="bg-white shadow rounded-lg p-6">
					<h2 className="text-xl font-semibold mb-4">Report Configuration</h2>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Report Frequency
							</label>
							<select
								value={frequency}
								onChange={(e) => setFrequency(e.target.value)}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							>
								<option value="daily">Daily</option>
								<option value="weekly">Weekly</option>
								<option value="monthly">Monthly</option>
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Delivery Method
							</label>
							<select
								value={destination}
								onChange={(e) => setDestination(e.target.value)}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							>
								<option value="email">Email</option>
								<option value="slack">Slack</option>
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								{destination === "email"
									? "Email Address"
									: "Slack Webhook URL"}
							</label>
							<input
								type={destination === "email" ? "email" : "url"}
								value={destinationConfig}
								onChange={(e) => setDestinationConfig(e.target.value)}
								required
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
								placeholder={
									destination === "email"
										? "you@example.com"
										: "https://hooks.slack.com/services/..."
								}
							/>
						</div>

						<button
							type="submit"
							disabled={saving}
							className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
						>
							{saving ? "Saving..." : "Save Settings"}
						</button>
					</form>
				</div>
			</div>
		</Layout>
	);
}
