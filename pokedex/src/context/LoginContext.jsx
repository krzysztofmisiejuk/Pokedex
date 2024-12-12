import { createContext, useState } from 'react';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loggedUserName, setLoggedUserName] = useState('User');
	return (
		<LoginContext.Provider
			value={{ isLoggedIn, setIsLoggedIn, loggedUserName, setLoggedUserName }}
		>
			{children}
		</LoginContext.Provider>
	);
};

export { LoginContext, LoginProvider };
