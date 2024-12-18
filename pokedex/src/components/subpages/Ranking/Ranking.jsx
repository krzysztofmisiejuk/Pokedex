import { useEffect, useState, useContext } from 'react';
import { Loader, SectionHeader } from '../../shared';
import { PokemonContext, StatsContext, EditContext } from '../../../context';
import { RankingTable } from './components';

const Ranking = () => {
	const { stats, fetchStats } = useContext(StatsContext);
	const { pokemons, pokemonsDetails, pokemonsErrorDetails } =
		useContext(PokemonContext);
	const { newPokemons } = useContext(EditContext);
	const [tableData, setTableData] = useState([]);
	const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchStats();

		if (pokemons.length > 0 && pokemonsDetails.length === pokemons.length) {
			const combinedData = pokemonsDetails.map((pokemon) => {
				const overriddenPokemon = newPokemons.find(
					(newPokemon) =>
						newPokemon?.name?.toLowerCase() === pokemon?.name?.toLowerCase()
				);

				return overriddenPokemon
					? {
							...overriddenPokemon,
							imageUrl: pokemon.imageUrl || pokemon.sprites?.front_default,
					  }
					: pokemon;
			});

			const uniqueNewPokemons = newPokemons.filter(
				(newPokemon) =>
					!pokemonsDetails.some((pokemon) => pokemon?.name === newPokemon?.name)
			);

			const finalData = [...combinedData, ...uniqueNewPokemons];

			const singlePokemonData = finalData.map((pokemon, index) => {
				const stat = stats.find((stat) => stat.name === pokemon.name);

				return {
					id: index + 1,
					name: pokemon.name
						? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
						: 'Brak nazwy',
					height: pokemon.height || 'Brak danych',
					weight: pokemon.weight || 'Brak danych',
					exp: stat?.newExp
						? Number(pokemon.base_experience) + stat.newExp
						: pokemon.base_experience,
					wins: stat?.wins ? stat.wins : 0,
					loses: stat?.loses ? stat.loses : 0,
					img: pokemon.imageUrl || pokemon.sprites?.front_default,
				};
			});

			setIsLoading(false);

			const sortedPokemonData = singlePokemonData.sort((a, b) => a.id - b.id);

			setTableData(sortedPokemonData);
		}
	}, [pokemonsDetails]);

	const handleSort = (key) => {
		let direction = 'asc';
		if (sortConfig.key === key && sortConfig.direction === 'asc') {
			direction = 'desc';
		}
		setSortConfig({ key, direction });

		const sortedData = [...tableData].sort((a, b) => {
			if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
			if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
			return 0;
		});
		setTableData(sortedData);
	};

	const keysTable = tableData.length > 0 ? Object.keys(tableData[0]) : [];

	if (pokemonsErrorDetails) {
		return (
			<p className='py-8 text-customRed'>Wystąpił błąd pobierania danych!</p>
		);
	}

	if (isLoading) {
		return (
			<div className='self-center py-4'>
				<SectionHeader headerText='Ranking' />
				<Loader />
				<p>Trwa ładowanie danych...</p>
			</div>
		);
	}

	return (
		<div className='flex flex-col justify-center flex-wrap px-0 md:px-10 py-4 text-xs md:text-base'>
			<SectionHeader headerText='Ranking' />
			<RankingTable
				keysTable={keysTable}
				handleSort={handleSort}
				tableData={tableData}
			/>
		</div>
	);
};

export default Ranking;
