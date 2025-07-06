import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import { UserPlus } from "lucide-react";
import FriendRequest from "../components/FriendRequest";
import UserCard from "../components/UserCard";

const NetworkPage = () => {
	const { data: user } = useQuery({ queryKey: ["authUser"] });

	const { data: connectionRequests } = useQuery({
		queryKey: ["connectionRequests"],
		queryFn: () => axiosInstance.get("/connections/requests"),
	});

	const { data: connections } = useQuery({
		queryKey: ["connections"],
		queryFn: () => axiosInstance.get("/connections"),
	});

	return (
		<div className="bg-white min-h-screen flex flex-col items-center py-8 font-inter">
			<div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
				<div className="hidden lg:block w-full max-w-xs">
					<Sidebar user={user} />
				</div>
				<div className="flex-1 max-w-2xl mx-auto">
					<div className="bg-white border border-primary shadow-soft rounded-soft p-6 mb-6">
						<h1 className="text-2xl font-bold mb-6 text-text-dark">My Network</h1>

						{connectionRequests?.data?.length > 0 ? (
							<div className="mb-8">
								<h2 className="text-xl font-semibold mb-2 text-text-dark">Connection Request</h2>
								<div className="space-y-4">
									{connectionRequests.data.map((request) => (
										<FriendRequest key={request.id} request={request} />
									))}
								</div>
							</div>
						) : (
							<div className="bg-background border border-primary rounded-soft shadow-soft p-6 text-center mb-6">
								<UserPlus size={48} className="mx-auto text-primary mb-4" />
								<h3 className="text-xl font-semibold mb-2 text-text-dark">No Connection Requests</h3>
								<p className="text-[#4A5568]">
									You don&apos;t have any pending connection requests at the moment.
								</p>
								<p className="text-[#4A5568] mt-2">
									Explore suggested connections below to expand your network!
								</p>
							</div>
						)}
						{connections?.data?.length > 0 && (
							<div className="mb-8">
								<h2 className="text-xl font-semibold mb-4 text-text-dark">My Connections</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
									{connections.data.map((connection) => (
										<UserCard key={connection._id} user={connection} isConnection={true} />
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default NetworkPage;
