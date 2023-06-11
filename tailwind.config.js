/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
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
		extend: {
			display: ["group-hover"],
			animation: {
				appear: "appear 0.2s ease-out",
			},
			gridTemplateColumns: {
				item: "repeat(auto-fill, minmax(280px, 1fr))",
			},
			keyframes: {
				appear: {
					"0%": { opacity: 0, transform: "scale(0.8)" },
					"100%": { opacity: 1, transform: "scale(1)" },
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
