import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";

import ProfileHeader from "../components/ProfileHeader";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import EducationSection from "../components/EducationSection";
import SkillsSection from "../components/SkillsSection";
import toast from "react-hot-toast";

const ProfilePage = () => {
	const { username } = useParams();
	const queryClient = useQueryClient();

	const { data: authUser, isLoading } = useQuery({
		queryKey: ["authUser"],
	});

	const { data: userProfile, isLoading: isUserProfileLoading } = useQuery({
		queryKey: ["userProfile", username],
		queryFn: () => axiosInstance.get(`/users/${username}`),
	});

	const { mutate: updateProfile } = useMutation({
		mutationFn: async (updatedData) => {
			await axiosInstance.put("/users/profile", updatedData);
		},
		onSuccess: () => {
			toast.success("Profile updated successfully");
			queryClient.invalidateQueries(["userProfile", username]);
		},
	});

	if (isLoading || isUserProfileLoading) return null;

	const isOwnProfile = authUser.username === userProfile.data.username;
	const userData = isOwnProfile ? authUser : userProfile.data;

	const handleSave = (updatedData) => {
		updateProfile(updatedData);
	};

	return (
		<div className="bg-white min-h-screen font-inter py-8">
			<div className="max-w-4xl mx-auto p-4 space-y-6">
				<div className="bg-white border border-primary shadow-soft rounded-soft p-4">
					<ProfileHeader userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
				</div>
				<div className="bg-white border border-primary shadow-soft rounded-soft p-4">
					<AboutSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
				</div>
				<div className="bg-white border border-primary shadow-soft rounded-soft p-4">
					<ExperienceSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
				</div>
				<div className="bg-white border border-primary shadow-soft rounded-soft p-4">
					<EducationSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
				</div>
				<div className="bg-white border border-primary shadow-soft rounded-soft p-4">
					<SkillsSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
				</div>
			</div>
		</div>
	);
};
export default ProfilePage;
