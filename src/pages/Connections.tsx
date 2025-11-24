import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import api from "../api/client";

interface Connection {
	id: string;
	provider: string;
	created_at: number;
}

export default function Connections() {
	const [connections, setConnections] = useState<Connection[]>([]);
	const [loading, setLoading] = useState(true);
	const [subdomain, setSubdomain] = useState("");
	const [showSubdomainInput, setShowSubdomainInput] = useState<string | null>(
		null,
	);

	useEffect(() => {
		fetchConnections();
	}, []);

	const fetchConnections = async () => {
		try {
			const { data } = await api.get("/oauth/connections");
			setConnections(data.connections);
		} catch (error) {
			console.error("Failed to fetch connections:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleConnect = (provider: string) => {
		if (provider === "zendesk" || provider === "freshdesk") {
			setShowSubdomainInput(provider);
			return;
		}

		const authUrl = `${import.meta.env.VITE_API_URL}/oauth/${provider}/authorize`;
		window.location.href = authUrl;
	};

	const handleSubdomainConnect = () => {
		if (!subdomain || !showSubdomainInput) return;

		const authUrl = `${import.meta.env.VITE_API_URL}/oauth/${showSubdomainInput}/authorize?subdomain=${subdomain}`;
		window.location.href = authUrl;
	};

	const handleDisconnect = async (connectionId: string) => {
		if (!confirm("Disconnect this integration?")) return;

		try {
			await api.delete(`/oauth/connections/${connectionId}`);
			fetchConnections();
		} catch (error) {
			alert("Failed to disconnect");
		}
	};

	const isConnected = (provider: string) => {
		return connections.some((c) => c.provider === provider);
	};

	const getConnectionId = (provider: string) => {
		return connections.find((c) => c.provider === provider)?.id;
	};

	const platforms = {
		crm: [
			{ id: "hubspot", name: "HubSpot", desc: "Connect your HubSpot CRM" },
			{
				id: "salesforce",
				name: "Salesforce",
				desc: "Connect your Salesforce CRM",
			},
		],
		support: [
			{
				id: "zendesk",
				name: "Zendesk",
				desc: "Connect your Zendesk support tickets",
			},
			{
				id: "intercom",
				name: "Intercom",
				desc: "Connect your Intercom conversations",
			},
			{
				id: "freshdesk",
				name: "Freshdesk",
				desc: "Connect your Freshdesk tickets",
			},
		],
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
				<h1 className="text-3xl font-bold text-gray-900 mb-6">Connections</h1>

				{/* CRM Platforms */}
				<div className="mb-8">
					<h2 className="text-xl font-semibold mb-4">
						CRM Platforms (Optional)
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{platforms.crm.map((platform) => {
							const connected = isConnected(platform.id);
							const connectionId = getConnectionId(platform.id);

							return (
								<div
									key={platform.id}
									className="bg-white border border-gray-200 rounded-lg p-6"
								>
									<h3 className="text-lg font-semibold mb-2">
										{platform.name}
									</h3>
									<p className="text-sm text-gray-600 mb-4">{platform.desc}</p>
									<div className="flex items-center justify-between">
										<span
											className={`text-sm ${connected ? "text-green-600" : "text-gray-500"}`}
										>
											{connected ? "Connected" : "Not connected"}
										</span>
										{connected ? (
											<button
												onClick={() => handleDisconnect(connectionId!)}
												className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200"
											>
												Disconnect
											</button>
										) : (
											<button
												onClick={() => handleConnect(platform.id)}
												className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
											>
												Connect
											</button>
										)}
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Support Platforms */}
				<div>
					<h2 className="text-xl font-semibold mb-4">
						Support Platforms (Required)
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{platforms.support.map((platform) => {
							const connected = isConnected(platform.id);
							const connectionId = getConnectionId(platform.id);
							const needsSubdomain =
								platform.id === "zendesk" || platform.id === "freshdesk";

							return (
								<div
									key={platform.id}
									className="bg-white border border-gray-200 rounded-lg p-6"
								>
									<h3 className="text-lg font-semibold mb-2">
										{platform.name}
									</h3>
									<p className="text-sm text-gray-600 mb-4">{platform.desc}</p>

									{showSubdomainInput === platform.id ? (
										<div className="space-y-2">
											<input
												type="text"
												placeholder="Enter subdomain"
												value={subdomain}
												onChange={(e) => setSubdomain(e.target.value)}
												className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
											/>
											<div className="flex gap-2">
												<button
													onClick={handleSubdomainConnect}
													className="flex-1 px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
												>
													Continue
												</button>
												<button
													onClick={() => setShowSubdomainInput(null)}
													className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
												>
													Cancel
												</button>
											</div>
										</div>
									) : (
										<div className="flex items-center justify-between">
											<span
												className={`text-sm ${connected ? "text-green-600" : "text-gray-500"}`}
											>
												{connected ? "Connected" : "Not connected"}
											</span>
											{connected ? (
												<button
													onClick={() => handleDisconnect(connectionId!)}
													className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200"
												>
													Disconnect
												</button>
											) : (
												<button
													onClick={() => handleConnect(platform.id)}
													className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
												>
													Connect
												</button>
											)}
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</Layout>
	);
}
