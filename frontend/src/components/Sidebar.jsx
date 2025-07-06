import { Link, useLocation } from "react-router-dom";
import { Home, UserPlus, Bell } from "lucide-react";

export default function Sidebar({ user }) {
	const location = useLocation();
	const navItems = [
		{ to: "/", label: "Home", icon: Home },
		{ to: "/network", label: "My Network", icon: UserPlus },
		{ to: "/notifications", label: "Notifications", icon: Bell },
	];
	return (
		<div className="bg-white border border-border-color shadow-soft rounded-soft flex flex-col items-center gap-8 px-6 py-8 font-inter">
			<Link to={`/profile/${user.username}`} className="flex flex-col items-center group mb-4">
				<img
					src={user.profilePicture || "/avatar.png"}
					alt={user.name}
					className="w-16 h-16 rounded-full object-cover border-2 border-primary group-hover:scale-105 transition-transform"
				/>
				<h2 className="text-lg font-semibold mt-2 text-[#4A5568] group-hover:text-primary transition-colors">{user.name}</h2>
				<p className="text-[#4A5568] text-xs mt-1">{user.headline}</p>
				<p className="text-[#4A5568] text-xs mt-1">{user.connections.length} connections</p>
			</Link>
			<nav className="w-full">
				<ul className="flex flex-col gap-2 w-full">
					{navItems.map(({ to, label, icon: Icon }) => {
						const isActive = location.pathname === to;
						return (
							<li key={to}>
								<Link
									to={to}
									className={`flex items-center gap-3 py-2 px-4 rounded-lg font-medium transition-colors group w-full border-l-4 ${isActive ? 'border-primary bg-primary text-white' : 'border-transparent text-[#4A5568] hover:bg-primary hover:text-white hover:border-primary'}`}
								>
									<Icon className="transition-colors" size={20} />
									<span className="text-sm">{label}</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
			<Link
				to={`/profile/${user.username}`}
				className="text-xs font-medium text-primary hover:text-primary-dark transition-colors mt-4"
			>
				View your profile
			</Link>
		</div>
	);
}
