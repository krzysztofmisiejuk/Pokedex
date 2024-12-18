import { createContext, useState } from 'react';

const ArenaContext = createContext();

const ArenaProvider = ({ children }) => {
	const [arenaPokemon, setArenaPokemon] = useState([]);
	const [arenaError, setArenaError] = useState(null);

	const fetchArenaData = async () => {
		try {
			const response = await fetch('http://localhost:3000/arena/');
			const data = await response.json();
			setArenaPokemon(data);
		} catch (error) {
			console.error('Błąd pobierania danych z areny:', error);
		}
	};

	const addToArena = async (name) => {
		if (arenaPokemon.length >= 2) return;
		try {
			const response = await fetch('http://localhost:3000/arena/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name }),
			});
			if (!response.ok) {
				throw new Error('Błąd podczas dodawania do areny');
			}
			await fetchArenaData();
		} catch (error) {
			console.error('Error', error);
		}
	};

	const removeFromArena = async (name) => {
		try {
			const pokemonToRemove = arenaPokemon.find(
				(pokemon) => pokemon.name === name
			);

			if (!pokemonToRemove) {
				throw new Error('Bład usuwania danych');
			}

			const response = await fetch(
				`http://localhost:3000/arena/${pokemonToRemove.id}`,
				{
					method: 'DELETE',
				}
			);

			if (!response.ok) {
				throw new Error('Błąd podczas usuwania z areny');
			}

			await fetchArenaData();
		} catch (error) {
			console.error('Error:', error);
			setArenaError(error)
		}
	};

	return (
		<ArenaContext.Provider
			value={{
				arenaPokemon,
				setArenaPokemon,
				fetchArenaData,
				addToArena,
				removeFromArena,
				setArenaError,
				arenaError
			}}
		>
			{children}
		</ArenaContext.Provider>
	);
};

export { ArenaContext, ArenaProvider };
