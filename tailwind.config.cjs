/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
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
					appear: "appear 0.3s linear",
				},
				keyframes: {
					appear: {
						"0%": { transform: "scale(0.8)", opacity: "0.5" },
						"100%": { transform: "scale(1)", opacity: "1" },
					},
				},
			},
		},
	},
	daisyui: {
		themes: ["light", "dark"],
	},
	plugins: [require("daisyui")],
};
