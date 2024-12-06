import { useState, useMemo } from 'react';
import { useFetchData } from '../../../hooks';
import { Pagination } from './components';
import { SectionHeader } from '../SectionHeader';
import { Cards } from '../Cards';
import { Loader } from '../Loader';

const SearchEngine = () => {
	const [searchPokemon, setPokemonList] = useState('');
	const [page, setPage] = useState(0);
	const BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=15&offset=${
		page * 15
	}`;
	const { data, isLoading, error } = useFetchData(BASE_URL);

	const filteredData = useMemo(() => {
		return (
			data?.results?.filter((result) =>
				result.name.toLowerCase().includes(searchPokemon.toLowerCase())
			) || []
		);
	}, [data, searchPokemon]);

	const handleOnChange = (e) => {
		setPokemonList(e.target.value);
	};

	if (error) {
		return (
			<p className='py-8 text-customRed'>Wystąpił błąd pobierania danych!</p>
		);
	}

	if (isLoading) {
		return (
			<div className='self-center'>
				<Loader />
				<p>Trwa ładowanie danych...</p>
			</div>
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

			<Cards
				filteredData={filteredData}
				info='Brak wyników wyszukiwania'
			/>
			{filteredData.length > 0 && (
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
