import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { Link } from "react-router-dom";
import { Bell, Home, LogOut, User, Users } from "lucide-react";

const Navbar = () => {
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const queryClient = useQueryClient();

	const { data: notifications } = useQuery({
		queryKey: ["notifications"],
		queryFn: async () => axiosInstance.get("/notifications"),
		enabled: !!authUser,
	});

	const { data: connectionRequests } = useQuery({
		queryKey: ["connectionRequests"],
		queryFn: async () => axiosInstance.get("/connections/requests"),
		enabled: !!authUser,
	});

	const { mutate: logout } = useMutation({
		mutationFn: () => axiosInstance.post("/auth/logout"),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
	});

	const unreadNotificationCount = notifications?.data.filter((notif) => !notif.read).length;
	const unreadConnectionRequestsCount = connectionRequests?.data?.length;

	return (
		<nav className="bg-white border-b border-info/30 sticky top-0 z-10 backdrop-blur-md shadow-soft">
			<div className="w-full px-4 py-6 bg-white">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center space-x-4">
						<Link to='/'>
							<img className="h-20 rounded" src="/small-logo.png" alt="Minimalist Logo" />
						</Link>
					</div>
					<div className="flex items-center gap-6">
						{authUser ? (
							<>
								<Link to={"/"} className="text-neutral hover:text-primary flex flex-col items-center group px-2 py-1 rounded-lg hover:bg-secondary/10 transition-colors">
									<Home size={20} className="group-hover:scale-110 transition-transform" />
									<span className="text-xs mt-1 hidden md:block">Home</span>
								</Link>
								<Link to='/network' className="text-neutral hover:text-primary flex flex-col items-center relative group px-2 py-1 rounded-lg hover:bg-secondary/10 transition-colors">
									<Users size={20} className="group-hover:scale-110 transition-transform" />
									<span className="text-xs mt-1 hidden md:block">Network</span>
									{unreadConnectionRequestsCount > 0 && (
										<span className="absolute -top-1 -right-1 md:right-4 bg-accent text-white text-xs rounded-full size-4 md:size-5 flex items-center justify-center shadow-sm">
											{unreadConnectionRequestsCount}
										</span>
									)}
								</Link>
								<Link to='/notifications' className="text-neutral hover:text-primary flex flex-col items-center relative group px-2 py-1 rounded-lg hover:bg-secondary/10 transition-colors">
									<Bell size={20} className="group-hover:scale-110 transition-transform" />
									<span className="text-xs mt-1 hidden md:block">Notifications</span>
									{unreadNotificationCount > 0 && (
										<span className="absolute -top-1 -right-1 md:right-4 bg-accent text-white text-xs rounded-full size-4 md:size-5 flex items-center justify-center shadow-sm">
											{unreadNotificationCount}
										</span>
									)}
								</Link>
								<Link
									to={`/profile/${authUser.username}`}
									className="text-neutral hover:text-primary flex flex-col items-center group px-2 py-1 rounded-lg hover:bg-secondary/10 transition-colors"
								>
									<User size={20} className="group-hover:scale-110 transition-transform" />
									<span className="text-xs mt-1 hidden md:block">Profile</span>
								</Link>
								<button
									className="flex items-center space-x-1 text-neutral hover:text-error group px-2 py-1 rounded-lg hover:bg-error/10 transition-colors"
									onClick={() => logout()}
								>
									<LogOut size={20} className="group-hover:scale-110 transition-transform" />
									<span className="hidden md:inline text-sm">Logout</span>
								</button>
							</>
						) : (
							<>
								<Link to='/login' className="bg-primary text-white px-4 py-2 rounded-md hover:bg-accent transition-colors">
									Sign In
								</Link>
								<Link to='/signup' className="bg-primary text-white px-4 py-2 rounded-md hover:bg-accent transition-colors">
									Join now
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};
export default Navbar;
