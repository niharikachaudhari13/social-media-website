import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "#FFFFFF",
				'card-bg': "#F4F5F7",
				primary: "#38B2AC",
				'primary-dark': "#319795",
				'text-dark': "#2D3748",
				'border-color': "#38B2AC",
				warning: "#F6AD55",
			},
			boxShadow: {
				soft: "0 4px 10px rgba(0, 0, 0, 0.04)",
			},
			borderRadius: {
				soft: "12px",
			},
		},
	},
	plugins: [daisyui],
	daisyui: {
		themes: [
			{
				fresh: {
					primary: "#38B2AC",
					secondary: "#319795",
					accent: "#38B2AC",
					neutral: "#2D3748",
					"base-100": "#FFFFFF",
					info: "#F4F5F7",
					success: "#38B2AC",
					warning: "#F6AD55",
					error: "#E53E3E",
				},
			},
		],
	},
};
