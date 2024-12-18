import { createContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
	const [darkTheme, setDarkTheme] = useState(false);

	useEffect(() => {
		const theme = localStorage.getItem('theme');
		if (theme === 'dark') {
			window.document.documentElement.classList.add('dark');
			setDarkTheme(true);
		}
	}, []);

	const toggleTheme = () => {
		if (darkTheme) {
			window.document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		} else {
			localStorage.setItem('theme', 'dark');
			window.document.documentElement.classList.add('dark');
		}
		setDarkTheme((prevTheme) => !prevTheme);
	};

	return (
		<ThemeContext.Provider value={{ darkTheme, setDarkTheme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export { ThemeContext, ThemeProvider };
