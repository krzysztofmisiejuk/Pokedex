import { useEffect, useContext, useMemo } from 'react';
import {
	EditContext,
	FavouritesContext,
	PokemonContext,
	StatsContext,
} from '../../../context';
import { Loader, SectionHeader } from '../../shared';
import { FavCard } from './components';

const Favourites = () => {
	const { favourites, fetchFavourites } = useContext(FavouritesContext);
	const { pokemons, pokemonsDetails } = useContext(PokemonContext);
	const { newPokemons } = useContext(EditContext);
	const { stats } = useContext(StatsContext);

	useEffect(() => {
		fetchFavourites();
	}, []);

	const pokemonList = useMemo(() => {
		const filteredNewPokemons = newPokemons.filter(
			(pokemon) => pokemon.imgId > 150
		);

		const combinedPokemons = [...pokemonsDetails, ...filteredNewPokemons];

		return combinedPokemons.filter((pokemon) =>
			favourites.some(
				(fav) => fav.name.toLowerCase() === pokemon.name.toLowerCase()
			)
		);
	}, [pokemons, newPokemons, favourites]);

	if (!favourites) {
		return (
			<div className='flex flex-col py-4'>
				<SectionHeader headerText='Ulubione' />
				<Loader />
				<p>Trwa ładowanie danych...</p>
			</div>
		);
	}

	return (
		<div className='flex flex-col items-center p-4 bg-transparent rounded'>
			<SectionHeader headerText='Ulubione' />
			<div className='flex justify-center flex-wrap gap-6 my-8 '>
				{pokemonList.length === 0 ? (
					<p>Nie wybrano ulubionych pokemonów</p>
				) : (
					pokemonList.map((pokemon) => (
						<FavCard
							key={pokemon.name}
							pokemon={pokemon}
							stats={stats}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default Favourites;
