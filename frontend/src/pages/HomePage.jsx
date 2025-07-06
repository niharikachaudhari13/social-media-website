import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import PostCreation from "../components/PostCreation";
import Post from "../components/Post";
import { Users } from "lucide-react";
import RecommendedUser from "../components/RecommendedUser";

const HomePage = () => {
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

	const { data: recommendedUsers } = useQuery({
		queryKey: ["recommendedUsers"],
		queryFn: async () => {
			const res = await axiosInstance.get("/users/suggestions");
			return res.data;
		},
	});

	const { data: posts } = useQuery({
		queryKey: ["posts"],
		queryFn: async () => {
			const res = await axiosInstance.get("/posts");
			return res.data;
		},
	});

	console.log("posts", posts);

	return (
		<div className="bg-white min-h-screen flex flex-col items-center py-8">
			<div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
				{/* Sidebar */}
				<div className="hidden lg:block w-full max-w-xs">
					<div className="bg-white rounded-2xl shadow border border-info p-0">
						<Sidebar user={authUser} />
					</div>
				</div>

				{/* Feed */}
				<div className="flex-1 max-w-2xl mx-auto">
					<PostCreation user={authUser} />
					{posts?.map((post) => (
						<Post key={post._id} post={post} />
					))}
					{posts?.length === 0 && (
						<div className="bg-white rounded-2xl shadow border border-info p-8 text-center mt-6">
							<div className="mb-6">
								<Users size={64} className="mx-auto text-accent" />
							</div>
							<h2 className="text-2xl font-bold mb-4 text-primary">No Posts Yet</h2>
							<p className="text-neutral mb-6">Connect with others to start seeing posts in your feed!</p>
						</div>
					)}
				</div>

				{/* Recommended Users */}
				{recommendedUsers?.length > 0 && (
					<div className="hidden lg:block w-full max-w-xs">
						<div className="bg-white border border-primary shadow-soft rounded-soft p-4">
							<h2 className="font-semibold mb-4 text-primary">People you may know</h2>
							{recommendedUsers?.map((user) => (
								<RecommendedUser key={user._id} user={user} />
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
export default HomePage;
