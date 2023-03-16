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
