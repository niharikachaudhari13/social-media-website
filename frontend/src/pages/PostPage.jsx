import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import Post from "../components/Post";

const PostPage = () => {
	const { postId } = useParams();
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

	const { data: post, isLoading } = useQuery({
		queryKey: ["post", postId],
		queryFn: () => axiosInstance.get(`/posts/${postId}`),
	});

	if (isLoading) return <div>Loading post...</div>;
	if (!post?.data) return <div>Post not found</div>;

	return (
		<div className="min-h-screen w-full bg-white font-inter">
			<div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 py-8">
				<div className="hidden lg:block w-full max-w-xs">
					<Sidebar user={authUser} />
				</div>
				<div className="flex-1 max-w-2xl mx-auto">
					<Post post={post.data} />
				</div>
			</div>
		</div>
	);
};
export default PostPage;
