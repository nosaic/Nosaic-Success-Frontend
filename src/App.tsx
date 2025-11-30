import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/clerk-react";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Connections from "./pages/Connections";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import { setTokenGetter } from "./api/client";
import { useEffect } from "react";

export default function App() {
	const { getToken } = useAuth();

	useEffect(() => {
		setTokenGetter(getToken);
	}, [getToken]);

	return (
		<BrowserRouter>
			<header className="flex justify-end items-center p-4 gap-4 h-16 bg-white border-b">
				<SignedOut>
					<SignInButton mode="modal">
						<button className="bg-indigo-600 text-white rounded-md font-medium text-sm px-4 py-2 hover:bg-indigo-700">
							Sign In
						</button>
					</SignInButton>
					<SignUpButton mode="modal">
						<button className="bg-indigo-600 text-white rounded-md font-medium text-sm px-4 py-2 hover:bg-indigo-700">
							Sign Up
						</button>
					</SignUpButton>
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn>
			</header>
			<Routes>
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/connections"
					element={
						<ProtectedRoute>
							<Connections />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/settings"
					element={
						<ProtectedRoute>
							<Settings />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/reports"
					element={
						<ProtectedRoute>
							<Reports />
						</ProtectedRoute>
					}
				/>
				<Route path="/" element={<Navigate to="/dashboard" replace />} />
			</Routes>
		</BrowserRouter>
	);
}
