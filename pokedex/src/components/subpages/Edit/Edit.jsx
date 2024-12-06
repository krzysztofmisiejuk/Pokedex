import { useContext, useEffect } from 'react';
import { Button, Loader, SectionHeader } from '../../shared';
import { PokemonContext, StatsContext } from '../../../context';
import { NewPokemonForm } from './components';

const Edit = () => {
	const { stats, addStats, fetchStats } = useContext(StatsContext);
	const { pokemons } = useContext(PokemonContext);

	

	useEffect(() => {
		fetchStats();
	}, []);

	// if (error) {
	// 	return (
	// 		<p className='py-8 text-customRed'>Wystąpił błąd pobierania danych!</p>
	// 	);
	// }

	// if (isLoading) {
	// 	return (
	// 		<div className='flex flex-col py-4 '>
	// 			<SectionHeader headerText='Edycja' />
	// 			<Loader />
	// 			<p>Trwa ładowanie danych...</p>
	// 		</div>
	// 	);
	// }

	const addNeWPokemon = () => {
		console.log('dodaj nowego pokemona');
	};

	return (
		<div className='flex justify-center flex-col py-4'>
			<SectionHeader headerText='Edycja' />
			<div className='w-fit p-4 self-center'>
				<Button onClick={addNeWPokemon}>Stwórz nowego pokemona</Button>
			</div>
			<NewPokemonForm />
		</div>
	);
};

export default Edit;
