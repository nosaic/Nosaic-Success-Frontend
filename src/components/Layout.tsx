import { Link, useNavigate } from "react-router-dom";
import api from "../api/client";

export default function Layout({ children }: { children: React.ReactNode }) {
	const navigate = useNavigate();
	const userEmail = localStorage.getItem("userEmail");

	const handleLogout = async () => {
		const refreshToken = localStorage.getItem("refreshToken");
		try {
			await api.post("/auth/logout", { refreshToken });
		} catch (error) {
			console.error("Logout error:", error);
		}
		localStorage.clear();
		navigate("/login");
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<nav className="bg-white border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex">
							<div className="flex-shrink-0 flex items-center">
								<h1 className="text-xl font-bold text-gray-900">Nosaic CSM</h1>
							</div>
							<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
								<Link
									to="/dashboard"
									className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
								>
									Dashboard
								</Link>
								<Link
									to="/connections"
									className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
								>
									Connections
								</Link>
								<Link
									to="/settings"
									className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
								>
									Settings
								</Link>
								<Link
									to="/reports"
									className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
								>
									Reports
								</Link>
							</div>
						</div>
						<div className="flex items-center">
							<span className="text-sm text-gray-700 mr-4">{userEmail}</span>
							<button
								onClick={handleLogout}
								className="text-sm text-gray-500 hover:text-gray-700"
							>
								Logout
							</button>
						</div>
					</div>
				</div>
			</nav>
			<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
		</div>
	);
}
