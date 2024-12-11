import { useEffect, useContext } from 'react';
import { MainWrapper, SectionWrapper, Nav } from './components';
import './App.css';
import { EditContext, PokemonContext, StatsContext } from './context';
import { useFetchData } from './hooks';
import { Outlet } from 'react-router-dom';

function App() {
	const { setPokemons, setPokemonsDetails, setErrorPokemonsDetails } =
		useContext(PokemonContext);
	const { fetchStats } = useContext(StatsContext);
	const { fetchNewPokemons } = useContext(EditContext);
	const { data } = useFetchData('https://pokeapi.co/api/v2/pokemon?limit=150');

	useEffect(() => {
		if (data && data.results) {
			setPokemons(data.results);

			data.results.forEach(async ({ name }) => {
				try {
					const response = await fetch(
						`https://pokeapi.co/api/v2/pokemon/${name}`
					);
					if (!response.ok) {
						throw new Error('Nie można pobrać danych pokemona');
					}
					const singlePokemonData = await response.json();

					setPokemonsDetails((prevDetails) => [
						...prevDetails,
						singlePokemonData,
					]);
				} catch (error) {
					console.error(error.message);
					setErrorPokemonsDetails(error);
				}
			});
		}
		fetchStats();
		fetchNewPokemons();
	}, [data]);

	return (
		<div className='h-full min-h-screen flex justify-center dark:border-customLightGrey border-customDark bg-lightGradient dark:bg-darkGradient text-customDark dark:text-white'>
			<MainWrapper>
				<Nav />
				<SectionWrapper>
					<Outlet />
				</SectionWrapper>
			</MainWrapper>
		</div>
	);
}

export default App;
