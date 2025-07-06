import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { Loader, MessageCircle, Send, Share2, ThumbsUp, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import PostAction from "./PostAction";

const Post = ({ post }) => {
	const { postId } = useParams();

	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const [showComments, setShowComments] = useState(false);
	const [newComment, setNewComment] = useState("");
	const [comments, setComments] = useState(post.comments || []);
	const isOwner = authUser._id === post.author._id;
	const isLiked = post.likes.includes(authUser._id);

	const queryClient = useQueryClient();

	const { mutate: deletePost, isPending: isDeletingPost } = useMutation({
		mutationFn: async () => {
			await axiosInstance.delete(`/posts/delete/${post._id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			toast.success("Post deleted successfully");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const { mutate: createComment, isPending: isAddingComment } = useMutation({
		mutationFn: async (newComment) => {
			await axiosInstance.post(`/posts/${post._id}/comment`, { content: newComment });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			toast.success("Comment added successfully");
		},
		onError: (err) => {
			toast.error(err.response.data.message || "Failed to add comment");
		},
	});

	const { mutate: likePost, isPending: isLikingPost } = useMutation({
		mutationFn: async () => {
			await axiosInstance.post(`/posts/${post._id}/like`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			queryClient.invalidateQueries({ queryKey: ["post", postId] });
		},
	});

	const handleDeletePost = () => {
		if (!window.confirm("Are you sure you want to delete this post?")) return;
		deletePost();
	};

	const handleLikePost = async () => {
		if (isLikingPost) return;
		likePost();
	};

	const handleAddComment = async (e) => {
		e.preventDefault();
		if (newComment.trim()) {
			createComment(newComment);
			setNewComment("");
			setComments([
				...comments,
				{
					content: newComment,
					user: {
						_id: authUser._id,
						name: authUser.name,
						profilePicture: authUser.profilePicture,
					},
					createdAt: new Date(),
				},
			]);
		}
	};

	return (
		<div className='bg-white border border-primary shadow-soft rounded-soft mb-6 font-inter max-w-3xl mx-auto'>
			<div className='p-6'>
				<div className='flex items-center justify-between mb-4'>
					<div className='flex items-center'>
						<Link to={`/profile/${post?.author?.username}`} className="group">
							<img
								src={post.author.profilePicture || "/avatar.png"}
								alt={post.author.name}
								className='size-12 rounded-full mr-4 border-2 border-primary shadow-sm group-hover:scale-105 transition-transform'
							/>
						</Link>

						<div>
							<Link to={`/profile/${post?.author?.username}`} className="group">
								<h3 className='font-semibold text-text-dark group-hover:text-primary transition-colors'>{post.author.name}</h3>
							</Link>
							<p className='text-sm text-[#4A5568]'>{post.author.headline}</p>
							<p className='text-xs text-[#4A5568]'>
								{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
							</p>
						</div>
					</div>
					{isOwner && (
						<button onClick={handleDeletePost} className='text-[#4A5568] hover:text-primary transition-colors'>
							{isDeletingPost ? <Loader size={18} className='animate-spin' /> : <Trash2 size={18} />}
						</button>
					)}
				</div>
				<p className='mb-4 text-text-dark'>{post.content}</p>
				{post.image && <img src={post.image} alt='Post content' className='rounded-lg w-full mb-4' />}

				<div className='flex justify-between text-[#4A5568] border-t border-primary pt-4'>
					<PostAction
						icon={<ThumbsUp size={18} className={isLiked ? "text-primary fill-primary" : "text-text-dark"} />}
						text={`Like (${post.likes.length})`}
						onClick={handleLikePost}
					/>

					<PostAction
						icon={<MessageCircle size={18} className="text-text-dark" />}
						text={`Comment (${comments.length})`}
						onClick={() => setShowComments(!showComments)}
					/>
					<PostAction icon={<Share2 size={18} className="text-text-dark" />} text='Share' />
				</div>
			</div>

			{showComments && (
				<div className='px-6 pb-6 border-t border-primary'>
					<div className='mb-4 max-h-60 overflow-y-auto space-y-3'>
						{comments.map((comment) => (
							<div key={comment._id} className='bg-background p-3 rounded-lg flex items-start border border-primary'>
								<img
									src={comment.user.profilePicture || "/avatar.png"}
									alt={comment.user.name}
									className='w-8 h-8 rounded-full mr-3 flex-shrink-0 border border-white'
								/>
								<div className='flex-grow'>
									<div className='flex items-center mb-1'>
										<span className='font-medium text-text-dark mr-2'>{comment.user.name}</span>
										<span className='text-xs text-[#4A5568]'>
											{formatDistanceToNow(new Date(comment.createdAt))}
										</span>
									</div>
									<p className='text-text-dark'>{comment.content}</p>
								</div>
							</div>
						))}
					</div>

					<form onSubmit={handleAddComment} className='flex items-center'>
						<input
							type='text'
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
							placeholder='Add a comment...'
							className='flex-grow p-3 rounded-l-full bg-background border border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-inter'
						/>

						<button
							type='submit'
							className='bg-primary text-white p-3 rounded-r-full hover:bg-primary-dark transition-colors font-inter'
							disabled={isAddingComment}
						>
							{isAddingComment ? <Loader size={18} className='animate-spin' /> : <Send size={18} />}
						</button>
					</form>
				</div>
			)}
		</div>
	);
};
export default Post;
