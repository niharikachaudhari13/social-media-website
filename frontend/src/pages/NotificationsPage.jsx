import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { ExternalLink, Eye, MessageSquare, ThumbsUp, Trash2, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const NotificationsPage = () => {
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const queryClient = useQueryClient();

	const { data: notifications, isLoading } = useQuery({
		queryKey: ["notifications"],
		queryFn: () => axiosInstance.get("/notifications"),
	});

	const { mutate: markAsReadMutation } = useMutation({
		mutationFn: (id) => axiosInstance.put(`/notifications/${id}/read`),
		onSuccess: () => {
			queryClient.invalidateQueries(["notifications"]);
		},
	});

	const { mutate: deleteNotificationMutation } = useMutation({
		mutationFn: (id) => axiosInstance.delete(`/notifications/${id}`),
		onSuccess: () => {
			queryClient.invalidateQueries(["notifications"]);
			toast.success("Notification deleted");
		},
	});

	const renderNotificationIcon = (type) => {
		switch (type) {
			case "like":
				return <ThumbsUp className='text-primary' size={18} />;
			case "comment":
				return <MessageSquare className='text-accent' size={18} />;
			case "connectionAccepted":
				return <UserPlus className='text-info' size={18} />;
			default:
				return null;
		}
	};

	const renderNotificationContent = (notification) => {
		switch (notification.type) {
			case "like":
				return (
					<span>
						<strong>{notification.relatedUser.name}</strong> liked your post
					</span>
				);
			case "comment":
				return (
					<span>
						<Link to={`/profile/${notification.relatedUser.username}`} className='font-bold'>
							{notification.relatedUser.name}
						</Link>{" "}
						commented on your post
					</span>
				);
			case "connectionAccepted":
				return (
					<span>
						<Link to={`/profile/${notification.relatedUser.username}`} className='font-bold'>
							{notification.relatedUser.name}
						</Link>{" "}
						accepted your connection request
					</span>
				);
			default:
				return null;
		}
	};

	const renderRelatedPost = (relatedPost) => {
		if (!relatedPost) return null;
		return (
			<Link
				to={`/post/${relatedPost._id}`}
				className='mt-2 p-2 bg-secondary rounded-lg flex items-center space-x-2 hover:bg-accent/30 transition-colors border border-accent'
			>
				{relatedPost.image && (
					<img src={relatedPost.image} alt='Post preview' className='w-10 h-10 object-cover rounded' />
				)}
				<div className='flex-1 overflow-hidden'>
					<p className='text-sm text-neutral truncate'>{relatedPost.content}</p>
				</div>
				<ExternalLink size={14} className='text-info' />
			</Link>
		);
	};

	return (
		<div className='min-h-[80vh] flex flex-col items-center justify-start bg-white py-12'>
			<div className='w-full max-w-lg'>
				<div className='mb-10 text-center'>
					<h1 className='text-3xl font-bold text-black mb-2'>Notifications</h1>
					<p className='text-info text-base'>Stay up to date with your network.</p>
				</div>
				{isLoading ? (
					<p className='text-neutral text-center'>Loading notifications...</p>
				) : notifications && notifications.data.length > 0 ? (
					<ul className='space-y-8'>
						{notifications.data.map((notification) => (
							<li
								key={notification._id}
								className={`rounded-3xl p-6 bg-secondary border border-accent/30 shadow-sm flex items-start justify-between gap-4 transition-all hover:shadow-lg ${!notification.read ? "ring-2 ring-primary/20" : ""}`}
							>
								<div className='flex items-start gap-4 flex-1'>
									<Link to={`/profile/${notification.relatedUser.username}`}>
										<img
											src={notification.relatedUser.profilePicture || "/avatar.png"}
											alt={notification.relatedUser.name}
											className='w-12 h-12 rounded-full object-cover border border-accent/30'
										/>
									</Link>
									<div className='flex flex-col gap-1 flex-1'>
										<div className='flex items-center gap-2'>
											<div className='p-1 rounded-full bg-white border border-accent/30'>
												{renderNotificationIcon(notification.type)}
											</div>
											<p className='text-sm text-neutral'>{renderNotificationContent(notification)}</p>
										</div>
										<p className='text-xs text-info mt-1'>
											{formatDistanceToNow(new Date(notification.createdAt), {
												addSuffix: true,
											})}
										</p>
										{renderRelatedPost(notification.relatedPost)}
									</div>
								</div>
								<div className='flex flex-col gap-2 items-end'>
									{!notification.read && (
										<button
											onClick={() => markAsReadMutation(notification._id)}
											className='p-2 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors'
											aria-label='Mark as read'
										>
											<Eye size={16} />
										</button>
									)}
									<button
										onClick={() => deleteNotificationMutation(notification._id)}
										className='p-2 rounded-full border border-error/30 text-error hover:bg-error/10 transition-colors'
										aria-label='Delete notification'
									>
										<Trash2 size={16} />
									</button>
								</div>
							</li>
						))}
					</ul>
				) : (
					<p className='text-info text-center'>No notification at the moment.</p>
				)}
			</div>
		</div>
	);
};
export default NotificationsPage;
