import { createContext, useState } from 'react';

const EditContext = createContext();

const EditProvider = ({ children }) => {
	const [newPokemons, setNewPokemons] = useState([]);
	const fetchNewPokemons = async () => {
		try {
			const response = await fetch('http://localhost:3000/newPokemons');
			if (!response.ok) {
				throw new Error('Failed to fetch Pokemons from local server');
			}
			const data = await response.json();
			setNewPokemons([...data]);
		} catch (error) {
			console.error('Error fetching local data:', error);
		}
	};
	return (
		<EditContext.Provider
			value={{newPokemons, setNewPokemons, fetchNewPokemons}}
		>
			{children}
		</EditContext.Provider>
	);
};

export { EditContext, EditProvider };
