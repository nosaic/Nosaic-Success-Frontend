import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import api from "../api/client";

export default function Reports() {
	const [reports, setReports] = useState<any[]>([]);
	const [selectedReport, setSelectedReport] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchReports();
	}, []);

	const fetchReports = async () => {
		try {
			const { data } = await api.get("/dashboard/reports?limit=20");
			setReports(data.reports);
		} catch (error) {
			console.error("Failed to fetch reports:", error);
		} finally {
			setLoading(false);
		}
	};

	const viewReport = async (reportId: string) => {
		try {
			const { data } = await api.get(`/dashboard/reports/${reportId}`);
			setSelectedReport(data);
		} catch (error) {
			alert("Failed to load report");
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
				<h1 className="text-3xl font-bold text-gray-900 mb-6">Reports</h1>

				{reports.length === 0 ? (
					<div className="bg-gray-50 rounded-lg p-8 text-center">
						<p className="text-gray-600">No reports generated yet</p>
					</div>
				) : (
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						<div className="lg:col-span-1 bg-white shadow rounded-lg p-4">
							<h2 className="font-semibold mb-4">Report History</h2>
							<div className="space-y-2">
								{reports.map((report) => (
									<button
										key={report.id}
										onClick={() => viewReport(report.id)}
										className="w-full text-left p-3 rounded-md hover:bg-gray-50 border border-gray-200"
									>
										<div className="text-sm font-medium text-gray-900">
											{new Date(report.created_at).toLocaleDateString()}
										</div>
										<div className="text-xs text-gray-500">
											{new Date(report.created_at).toLocaleTimeString()}
										</div>
										<div
											className={`text-xs mt-1 ${report.status === "success" ? "text-green-600" : "text-red-600"}`}
										>
											{report.status}
										</div>
									</button>
								))}
							</div>
						</div>

						<div className="lg:col-span-2 bg-white shadow rounded-lg p-6">
							{selectedReport ? (
								<div>
									<div className="mb-4">
										<h2 className="text-xl font-semibold">Report Details</h2>
										<p className="text-sm text-gray-500">
											{new Date(selectedReport.createdAt).toLocaleString()}
										</p>
									</div>
									<div className="prose max-w-none">
										<pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md text-sm">
											{selectedReport.content}
										</pre>
									</div>
								</div>
							) : (
								<div className="text-center py-12 text-gray-500">
									Select a report to view
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
}
