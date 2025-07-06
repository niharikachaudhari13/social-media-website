import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { aiAxiosInstance } from "../lib/aiaxios.js";
import toast from "react-hot-toast";
import { Loader, X } from "lucide-react";

const AiPostGeneratorModal = ({ isOpen, onClose, onPostGenerated }) => {
    const [selectedLength, setSelectedLength] = useState("Short");
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const [selectedTag, setSelectedTag] = useState("");
    const [currentGeneratedContent, setCurrentGeneratedContent] = useState(""); // Renamed to avoid conflict

    // Mutation for GENERATING a post from Python backend
    const { mutate: generatePostMutation, isPending: isGeneratingPost } = useMutation({
        mutationFn: async (generatorData) => {
            const res = await aiAxiosInstance.post("/api/v1/generate_post", generatorData); // Fixed: use aiAxiosInstance and correct path
            return res.data.post;
        },
        onSuccess: (generatedText) => {
            setCurrentGeneratedContent(generatedText);
            toast.success("Post generated successfully!");
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || "Failed to generate post.");
            console.error("Error generating post:", err);
        },
    });

    const handleGeneratePost = () => {
        if (!selectedLength || !selectedLanguage || !selectedTag.trim()) {
            toast.error("Please enter a topic, and select a length and language.");
            return;
        }
        generatePostMutation({
            length: selectedLength,
            language: selectedLanguage,
            tag: selectedTag,
        });
    };

    const handleUsePost = () => {
        if (currentGeneratedContent.trim()) {
            onPostGenerated(currentGeneratedContent);
            onClose(); // Close modal after using the post
        } else {
            toast.error("No generated content to use.");
        }
    };

    const lengthOptions = ["Short", "Medium", "Long"];
    const languageOptions = ["English", "Hinglish"];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-neutral hover:text-primary transition-colors">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold text-text-dark mb-6">Generate Post with AI</h2>
                
                <div className="space-y-4 mb-6">
                    {/* Topic Input */}
                    <div>
                        <label htmlFor="ai-topic" className="block text-sm font-medium text-text-dark mb-1">Topic</label>
                        <input
                            id="ai-topic"
                            type="text"
                            className='w-full p-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-text-dark'
                            value={selectedTag}
                            onChange={(e) => setSelectedTag(e.target.value)}
                            placeholder="Enter a topic (e.g. AI, Web Development, etc.)"
                            disabled={isGeneratingPost}
                        />
                    </div>

                    {/* Length Dropdown */}
                    <div>
                        <label htmlFor="ai-length" className="block text-sm font-medium text-text-dark mb-1">Length</label>
                        <select
                            id="ai-length"
                            className='w-full p-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-text-dark'
                            value={selectedLength}
                            onChange={(e) => setSelectedLength(e.target.value)}
                            disabled={isGeneratingPost}
                        >
                            {lengthOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    {/* Language Dropdown */}
                    <div>
                        <label htmlFor="ai-language" className="block text-sm font-medium text-text-dark mb-1">Language</label>
                        <select
                            id="ai-language"
                            className='w-full p-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-text-dark'
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            disabled={isGeneratingPost}
                        >
                            {languageOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    {/* Generate Button */}
                    <button
                        className='w-full bg-primary text-white rounded-md px-5 py-2.5 hover:bg-primary-focus transition-colors duration-200 font-medium flex items-center justify-center mt-4'
                        onClick={handleGeneratePost}
                        disabled={isGeneratingPost}
                    >
                        {isGeneratingPost ? <Loader className='size-5 animate-spin text-white' /> : "Generate Post"}
                    </button>
                </div>

                {/* Display Generated Content */}
                {currentGeneratedContent && (
                    <div className='mt-4 mb-6'>
                        <label htmlFor="generated-content" className="block text-sm font-medium text-text-dark mb-1">Generated Content</label>
                        <textarea
                            id="generated-content"
                            className='w-full p-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-200 min-h-[150px] text-text-dark'
                            value={currentGeneratedContent}
                            onChange={(e) => setCurrentGeneratedContent(e.target.value)} // Allow editing within modal
                            placeholder="Generated post will appear here..."
                        />
                        <button
                            className='mt-3 w-full bg-accent text-white rounded-md px-5 py-2.5 hover:bg-primary-focus transition-colors duration-200 font-medium flex items-center justify-center'
                            onClick={handleUsePost}
                        >
                            Use This Post
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AiPostGeneratorModal; 