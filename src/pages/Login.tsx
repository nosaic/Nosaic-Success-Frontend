import { SignIn } from "@clerk/clerk-react";

export default function Login() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Sign in to Nosaic CSM
					</h2>
				</div>
				<SignIn
					path="/login"
					routing="path"
					signUpUrl="/register"
					redirectUrl="/dashboard"
				/>
			</div>
		</div>
	);
}
