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
				item: "repeat(auto-fill, minmax(300px, 1fr))",
			},
			extend: {
				display: ["group-hover"],
			},
		},
	},
	daisyui: {
		themes: ["light", "dark"],
	},
	plugins: [require("daisyui")],
};
