/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite-react/tailwind';
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./node_modules/flowbite/**/*.js',
		flowbite.content(),
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				customOrange: '#f59e0b',
				customDark: '#111827',
				customLightGrey: '#4b5563',
				customGrey: '#94a3b8',
				customRed: '#ef4444',
				darkBg: '#081e3f',
				lightBg: '#dadada',
			},
			backgroundImage: {
				lightGradient: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);',
				darkGradient: 'linear-gradient(to top, #09203f 0%, #537895 100%);',
			},
			boxShadow: {
				customShadow: '1px 1px 3px 0px #000000',
				customShadowLight: '1px 1px 3px 0px #aaa',
			},
		},
	},
	plugins: [
		flowbite.plugin({
			datatables: true,
		}),
	],
};
