/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	future: {
		hoverOnlyWhenSupported: true,
	},
	theme: {
		container: {
			center: true,
			screens: {
				"2xl": "1440px",
			},
			padding: {
				DEFAULT: "1rem",
			},
		},
		gridTemplateColumns: {
			item: "repeat(auto-fill, minmax(280px, 1fr))",
		},
		extend: {
			display: ["group-hover"],
			animation: {
				appear: "appear 0.4s linear",
			},
			keyframes: {
				appear: {
					"0%": { transform: "scale(0.7)" },
					"100%": { opacity: "scale(1)" },
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	daisyui: {
		themes: ["light", "dark"],
	},
	plugins: [require("daisyui")],
};
