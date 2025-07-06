import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Image, Loader } from "lucide-react";
import AiPostGeneratorModal from "./AiPostGeneratorModal";

const PostCreation = ({ user }) => {
	const [content, setContent] = useState("");
	const [image, setImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [showAiModal, setShowAiModal] = useState(false);

	const queryClient = useQueryClient();

	// Mutation for CREATING (publishing) the post to the main backend
	const { mutate: createPostMutation, isPending: isPublishingPost } = useMutation({
		mutationFn: async (postData) => {
			const res = await axiosInstance.post("/posts/create", postData, {
				headers: { "Content-Type": "application/json" },
			});
			return res.data;
		},
		onSuccess: () => {
			setContent("");
			setImage(null);
			setImagePreview(null);
			toast.success("Post published successfully!");
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
		onError: (err) => {
			toast.error(err.response?.data?.message || "Failed to publish post.");
		},
	});

	const readFileAsDataURL = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImage(file);
		if (file) {
			readFileAsDataURL(file).then(setImagePreview);
		} else {
			setImagePreview(null);
		}
	};

	const handlePostCreation = async () => {
		if (!content.trim() && !image) {
			toast.error("Post content or image cannot be empty.");
			return;
		}
		try {
			const postData = { content };
			if (image) postData.image = await readFileAsDataURL(image);
			createPostMutation(postData);
		} catch (error) {
			console.error("Error in handlePostCreation:", error);
			toast.error("Failed to create post.");
		}
	};

	const handleUseGeneratedPost = (generatedText) => {
		setContent(generatedText);
	};

	return (
		<div className='bg-white border border-primary shadow-soft rounded-soft mb-6 p-6 font-inter max-w-3xl mx-auto'>
			<div className='flex space-x-4 items-start'>
				<img src={user.profilePicture || "/avatar.png"} alt={user.name} className='size-12 rounded-full border-2 border-primary shadow-sm' />
				<textarea
					placeholder="What's on your mind?"
					className='w-full p-3 rounded-lg bg-background border border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-200 min-h-[100px] text-text-dark placeholder:text-[#A0AEC0] font-inter'
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
			</div>

			{imagePreview && (
				<div className='mt-4'>
					<img src={imagePreview} alt='Selected' className='w-full h-auto rounded-lg border border-primary' />
				</div>
			)}

			<div className='flex justify-between items-center mt-4 pt-4 border-t border-primary'>
				<div className='flex space-x-4'>
					<label className='flex items-center text-[#4A5568] hover:bg-primary hover:text-white transition-colors duration-200 cursor-pointer group px-3 py-1 rounded-lg'>
						<Image size={20} className='mr-2 group-hover:text-white transition-colors' />
						<span className="text-sm">Photo</span>
						<input type='file' accept='image/*' className='hidden' onChange={handleImageChange} />
					</label>
					
					<button 
						onClick={() => setShowAiModal(true)}
						className='flex items-center text-[#4A5568] hover:bg-primary hover:text-white transition-colors duration-200 cursor-pointer group px-3 py-1 rounded-lg'
					>
						<span className='mr-2 group-hover:text-white transition-colors'><Image size={20} /></span>
						<span className="text-sm">Generate with AI</span>
					</button>
				</div>

				<button
					className='bg-primary text-white rounded-lg px-5 py-2.5 font-semibold shadow hover:bg-primary-dark transition-colors duration-200 flex items-center justify-center font-inter'
					onClick={handlePostCreation}
					disabled={isPublishingPost || (!content.trim() && !image)}
				>
					{isPublishingPost ? <Loader className='size-5 animate-spin text-white' /> : "Post"}
				</button>
			</div>

			<AiPostGeneratorModal 
				isOpen={showAiModal} 
				onClose={() => setShowAiModal(false)} 
				onPostGenerated={handleUseGeneratedPost}
			/>
		</div>
	);
};
export default PostCreation;
