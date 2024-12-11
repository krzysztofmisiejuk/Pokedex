import { useState, useMemo, useEffect, useContext } from 'react';
import { useFetchData } from '../../../hooks';
import { Pagination } from './components';
import { SectionHeader } from '../SectionHeader';
import { Cards } from '../Cards';
import { EditContext } from '../../../context';
import { Loader } from '../Loader';

const SearchEngine = () => {
	const [searchPokemon, setPokemonList] = useState('');
	const [page, setPage] = useState(0);
	const [addedPokemons, setAddedPokemons] = useState([]);
	const { newPokemons } = useContext(EditContext);
	const BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=15&offset=${
		page * 15
	}`;
	const { data, isLoading, error } = useFetchData(BASE_URL);

	useEffect(() => {
		if (newPokemons && newPokemons.length > 0) {
			const findNewPokemons = newPokemons.filter(
				(pokemon) => pokemon.imgId > 150
			);
			setAddedPokemons([...findNewPokemons]);
		}
	}, [newPokemons]);

	const filteredData = useMemo(() => {
		const combinedData = data?.results || [];
		const finalData = [...combinedData, ...addedPokemons];
		return finalData.filter((result) =>
			result.name.toLowerCase().includes(searchPokemon.toLowerCase())
		);
	}, [data, searchPokemon, addedPokemons]);

	const handleOnChange = (e) => {
		setPokemonList(e.target.value);
	};

	if (error) {
		return (
			<p className='py-8 text-customRed'>Wystąpił błąd pobierania danych!</p>
		);
	}

	return (
		<div className='flex flex-col items-center p-4 bg-transparent rounded'>
			<SectionHeader headerText='Wyszukiwarka' />
			<input
				className='size-full max-w-xl my-3 p-2 bg-inherit border-customGrey border-2 rounded'
				placeholder='Wpisz nazwę pokemona'
				onChange={handleOnChange}
			/>
			{isLoading && filteredData.length > 0 ? (
				<div className='self-center py-4'>
					<Loader />
					<p>Trwa ładowanie danych...</p>
				</div>
			) : (
				<Cards
					addedPokemons={addedPokemons}
					filteredData={filteredData}
					info='Brak wyników wyszukiwania'
					page={page}
				/>
			)}
			{filteredData.length > 0 && !isLoading && (
				<Pagination
					page={page}
					setPage={setPage}
					totalPages={10}
				/>
			)}
		</div>
	);
};

export default SearchEngine;
