import { createContext, useState } from 'react';

const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
	const [pokemons, setPokemons] = useState([]);
	const [pokemonsDetails, setPokemonsDetails] = useState([]);
	const [pokemonsErrorDetails, setErrorPokemonsDetails] = useState(null);

	return (
		<PokemonContext.Provider
			value={{
				pokemons,
				setPokemons,
				pokemonsDetails,
				setPokemonsDetails,
				pokemonsErrorDetails,
				setErrorPokemonsDetails,
			}}
		>
			{children}
		</PokemonContext.Provider>
	);
};

export { PokemonContext, PokemonProvider };
