interface ConnectionCardProps {
	name: string;
	description: string;
	connected: boolean;
	onConnect: () => void;
	onDisconnect: () => void;
}

export default function ConnectionCard({
	name,
	description,
	connected,
	onConnect,
	onDisconnect,
}: ConnectionCardProps) {
	return (
		<div className="bg-white border border-gray-200 rounded-lg p-6">
			<h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
			<p className="text-sm text-gray-600 mb-4">{description}</p>
			<div className="flex items-center justify-between">
				<span
					className={`text-sm ${connected ? "text-green-600" : "text-gray-500"}`}
				>
					{connected ? "Connected" : "Not connected"}
				</span>
				{connected ? (
					<button
						onClick={onDisconnect}
						className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200"
					>
						Disconnect
					</button>
				) : (
					<button
						onClick={onConnect}
						className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
					>
						Connect
					</button>
				)}
			</div>
		</div>
	);
}
