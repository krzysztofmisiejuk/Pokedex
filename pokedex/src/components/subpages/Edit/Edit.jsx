import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditContext, PokemonContext, StatsContext } from '../../../context';
import { Button, SectionHeader, Loader } from '../../shared';
import { EditListItem } from './components';

const Edit = () => {
	const { fetchStats } = useContext(StatsContext);
	const { pokemonsDetails } = useContext(PokemonContext);
	const { newPokemons } = useContext(EditContext);
	const [pokemonsData, setPokemonsData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	const addNewPokemon = () => {
		navigate('/newPokemon');
	};

	const editPokemon = (name) => {
		navigate(`/editPokemon/${name}`);
	};

	useEffect(() => {
		fetchStats();
		const combinedData = pokemonsDetails.map((pokemon) => {
			const updatePokemon = newPokemons.find(
				(newPokemon) =>
					newPokemon.name.toLowerCase() === pokemon.name.toLowerCase()
			);
			return updatePokemon
				? {
						...updatePokemon,
						imageUrl: pokemon.imageUrl || pokemon.sprites?.front_default,
				  }
				: pokemon;
		});

		const uniqueNewPokemons = newPokemons.filter(
			(newPokemon) =>
				!pokemonsDetails.some((pokemon) => pokemon.name === newPokemon.name)
		);

		const finalData = [...combinedData, ...uniqueNewPokemons];

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
			<div className='self-center p-4 w-fit'>
				<Button onClick={addNewPokemon}>Stwórz nowego pokemona</Button>
			</div>

			<div className='mt-8'>
				<h3 className='text-center font-semibold text-xl md:text-2xl dark:text-white'>
					Lista Pokemonów
				</h3>

				<div className='flex justify-center mt-6'>
					<ul className='space-y-4 size-full max-w-5xl'>
						{pokemonsData.map((pokemon) => (
							<EditListItem
								key={pokemon.name}
								pokemon={pokemon}
								editPokemon={editPokemon}
							/>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Edit;
