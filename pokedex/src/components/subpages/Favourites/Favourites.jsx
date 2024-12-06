import { useEffect, useContext, useState } from 'react';
import { FavouritesContext, PokemonContext } from '../../../context';
import { Cards, Loader, SectionHeader } from '../../shared';

const Favourites = () => {
	const { favourites, fetchFavourites } = useContext(FavouritesContext);
	const { pokemons } = useContext(PokemonContext);
	const [pokemonList, setPokemonList] = useState([]);

	useEffect(() => {
		fetchFavourites();
	}, []);

	useEffect(() => {
		if (pokemons.length > 0 && favourites.length > 0) {
			const favPokemonList = pokemons.filter((pokemon) =>
				favourites.some((dataItem) => dataItem.name === pokemon.name)
			);
			setPokemonList(favPokemonList);
		}
	}, [favourites, pokemons]);

	if (favourites?.length < 1) {
		return (
			<div className='flex flex-col py-4'>
				<SectionHeader headerText='Ulubione' />
				<Loader />
				<p>Trwa ładowanie danych...</p>
			</div>
		);
	}
	return (
		<div className='py-4'>
			<SectionHeader headerText='Ulubione' />
			<Cards
				filteredData={pokemonList}
				info='Lista ulubionych jest pusta, dodaj pokemony do swojej listy!'
			/>
		</div>
	);
};

export default Favourites;
