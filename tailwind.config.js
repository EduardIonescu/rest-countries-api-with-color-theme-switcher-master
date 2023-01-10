/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily: {
			nunito: ["Nunito Sans, sans-serif"],
		},
		extend: {
			colors: {
				darkBlue: "hsl(209, 23%, 22%)",
				veryDarkBlue: "hsl(207, 26%, 17%)",
				veryDarkBlueLightMode: "hsl(200, 15%, 8%)",
				darkGray: "hsl(0, 0%, 52%)",
				veryLightGray: "hsl(0, 0%, 98%)",
			},
		},
	},
	plugins: [],
};
