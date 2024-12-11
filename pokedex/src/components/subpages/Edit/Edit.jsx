import { useEffect, useState, useContext } from 'react';
import { Button, SectionHeader } from '../../shared';
import { EditContext, PokemonContext, StatsContext } from '../../../context';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../shared';

const Edit = () => {
	const { fetchStats } = useContext(StatsContext);
	const { pokemonsDetails } = useContext(PokemonContext);
	const { newPokemons } = useContext(EditContext);
	const navigate = useNavigate();
	const [pokemonsData, setPokemonsData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const addNewPokemon = () => {
		navigate('/newPokemon');
	};

	const editPokemon = (name) => {
		navigate(`/editPokemon/${name}`);
	};

	useEffect(() => {
		fetchStats();

		// Mapowanie Pokémonów z API z priorytetem dla newPokemons
		const combinedData = pokemonsDetails.map((pokemon) => {
			const overriddenPokemon = newPokemons.find(
				(newPokemon) => newPokemon.name.toLowerCase() === pokemon.name.toLowerCase()
			);
			return overriddenPokemon
				? {
						...overriddenPokemon,
						// Zachowaj oryginalne zdjęcie, jeśli istnieje
						imageUrl: pokemon.imageUrl || pokemon.sprites?.front_default,
				  }
				: pokemon;
		});

		// Dodawanie nowych Pokémonów z newPokemons, których nie ma w API
		const uniqueNewPokemons = newPokemons.filter(
			(newPokemon) =>
				!pokemonsDetails.some((pokemon) => pokemon.name === newPokemon.name)
		);

		// Łączenie danych
		const finalData = [...combinedData, ...uniqueNewPokemons];

		// Tworzenie danych do renderowania
		const pokemonDetails = finalData.map((pokemon, index) => {
			return {
				id: index + 1,
				name: pokemon.name
					? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
					: 'Brak nazwy',
				img: pokemon.imageUrl || pokemon.sprites?.front_default || '',
			};
		});

		setIsLoading(false);
		setPokemonsData(pokemonDetails);
	}, [newPokemons, pokemonsDetails]);

	if (isLoading) {
		return (
			<div className='self-center py-4'>
				<SectionHeader headerText='Edycja' />
				<Loader />
				<p>Trwa ładowanie danych...</p>
			</div>
		);
	}

	return (
		<div className='flex justify-center flex-col py-4'>
			<SectionHeader headerText='Edycja' />
			<div className='w-fit p-4 self-center'>
				<Button onClick={addNewPokemon}>Stwórz nowego pokemona</Button>
			</div>

			<div className='mt-8'>
				<h3 className='text-center font-semibold text-xl md:text-2xl dark:text-white'>
					Lista Pokemonów
				</h3>

				<div className='mt-6 flex justify-center'>
					<ul className='space-y-4 size-full max-w-5xl'>
						{pokemonsData.map((pokemon) => (
							<li
								key={pokemon.id}
								className='flex items-center justify-between border-b border-customGrey py-2'
							>
								<span className='font-semibold'>{pokemon.id}.</span>
								<img
									src={pokemon.img}
									alt={pokemon.name}
									className='h-12 w-12 sm:h-16 sm:w-16'
								/>
								<span className='text-lg'>{pokemon.name}</span>
								<div className='w-30'>
									<Button onClick={() => editPokemon(pokemon.name)}>Edytuj</Button>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Edit;
