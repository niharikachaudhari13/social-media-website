import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Check, Clock, UserCheck, UserPlus, X } from "lucide-react";

const RecommendedUser = ({ user }) => {
	const queryClient = useQueryClient();

	const { data: connectionStatus, isLoading } = useQuery({
		queryKey: ["connectionStatus", user._id],
		queryFn: () => axiosInstance.get(`/connections/status/${user._id}`),
	});

	const { mutate: sendConnectionRequest } = useMutation({
		mutationFn: (userId) => axiosInstance.post(`/connections/request/${userId}`),
		onSuccess: () => {
			toast.success("Connection request sent successfully");
			queryClient.invalidateQueries({ queryKey: ["connectionStatus", user._id] });
		},
		onError: (error) => {
			toast.error(error.response?.data?.error || "An error occurred");
		},
	});

	const { mutate: acceptRequest } = useMutation({
		mutationFn: (requestId) => axiosInstance.put(`/connections/accept/${requestId}`),
		onSuccess: () => {
			toast.success("Connection request accepted");
			queryClient.invalidateQueries({ queryKey: ["connectionStatus", user._id] });
		},
		onError: (error) => {
			toast.error(error.response?.data?.error || "An error occurred");
		},
	});

	const { mutate: rejectRequest } = useMutation({
		mutationFn: (requestId) => axiosInstance.put(`/connections/reject/${requestId}`),
		onSuccess: () => {
			toast.success("Connection request rejected");
			queryClient.invalidateQueries({ queryKey: ["connectionStatus", user._id] });
		},
		onError: (error) => {
			toast.error(error.response?.data?.error || "An error occurred");
		},
	});

	const renderButton = () => {
		if (isLoading) {
			return (
				<button className='px-3 py-1 rounded-lg text-sm bg-info text-[#4A5568] font-inter' disabled>
					Loading...
				</button>
			);
		}

		switch (connectionStatus?.data?.status) {
			case "pending":
				return (
					<button
						className='px-3 py-1 rounded-lg text-sm bg-warning text-white flex items-center font-inter shadow-soft'
						disabled
					>
						<Clock size={16} className='mr-1' />
						Pending
					</button>
				);
			case "received":
				return (
					<div className='flex gap-2 justify-center'>
						<button
							onClick={() => acceptRequest(connectionStatus.data.requestId)}
							className={`rounded-lg p-1 flex items-center justify-center bg-primary hover:bg-primary-dark text-white shadow-soft font-inter`}
						>
							<Check size={16} />
						</button>
						<button
							onClick={() => rejectRequest(connectionStatus.data.requestId)}
							className={`rounded-lg p-1 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white shadow-soft font-inter`}
						>
							<X size={16} />
						</button>
					</div>
				);
			case "connected":
				return (
					<button
						className='px-3 py-1 rounded-lg text-sm bg-green-500 text-white flex items-center font-inter shadow-soft'
						disabled
					>
						<UserCheck size={16} className='mr-1' />
						Connected
					</button>
				);
			default:
				return (
					<button
						className='px-3 py-1 rounded-lg text-sm border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-200 flex items-center font-inter shadow-soft'
						onClick={handleConnect}
					>
						<UserPlus size={16} className='mr-1' />
						Connect
					</button>
				);
		}
	};

	const handleConnect = () => {
		if (connectionStatus?.data?.status === "not_connected") {
			sendConnectionRequest(user._id);
		}
	};

	return (
		<div className='bg-white border border-primary shadow-soft rounded-soft p-4 mb-4 flex items-center justify-between font-inter'>
			<Link to={`/profile/${user.username}`} className='flex items-center flex-grow'>
				<img
					src={user.profilePicture || "/avatar.png"}
					alt={user.name}
					className='w-12 h-12 rounded-full mr-3 border-2 border-primary'
				/>
				<div>
					<h3 className='font-semibold text-sm text-text-dark'>{user.name}</h3>
					<p className='text-xs text-[#4A5568]'>{user.headline}</p>
				</div>
			</Link>
			{renderButton()}
		</div>
	);
};
export default RecommendedUser;
