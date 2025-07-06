import { Link } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
	return (
		<div className="min-h-screen w-full bg-white">
			<div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-inter">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<img className="mx-auto h-40 w-auto" src="/logo.png" alt="Logo" />
					<h2 className="text-center text-3xl font-extrabold text-text-dark">Sign in to your account</h2>
				</div>

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="bg-white py-8 px-4 shadow-soft border border-primary rounded-soft sm:px-10">
						<LoginForm />
						<div className="mt-6">
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<div className="w-full border-t border-primary"></div>
								</div>
								<div className="relative flex justify-center text-sm">
									<span className="px-2 bg-white text-[#4A5568]">New to the community?</span>
								</div>
							</div>
							<div className="mt-6">
								<Link
									to='/signup'
									className="w-full flex justify-center py-2 px-4 rounded-lg shadow font-medium text-white bg-primary hover:bg-primary-dark transition-colors"
								>
									Join now
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default LoginPage;
