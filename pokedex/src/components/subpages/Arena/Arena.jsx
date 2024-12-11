import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button, Loader, SectionHeader } from '../../shared';
import {
	ArenaContext,
	EditContext,
	PokemonContext,
	StatsContext,
} from '../../../context';
import { ArenaCard, ArenaPlaceholder, ArenaResultModal } from './components';

const Arena = () => {
	const { arenaPokemon, removeFromArena, fetchArenaData, arenaError } =
		useContext(ArenaContext);
	const { stats, addStats, fetchStats } = useContext(StatsContext);
	const { pokemonsDetails } = useContext(PokemonContext);
	const { newPokemons } = useContext(EditContext);
	const [fighters, setFighters] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [fightResult, setFightResult] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchArenaData();
		fetchStats();
	}, []);

	useEffect(() => {
		const combinedPokemons = [...pokemonsDetails, ...newPokemons];
		const selectedFighters = combinedPokemons
			.filter((pokemon) =>
				arenaPokemon.some((dataItem) => dataItem.name === pokemon.name)
			)
			.map((pokemon) => {
				const pokemonStats = stats.find((stat) => stat.name === pokemon.name);

				return {
					...pokemon,
					stats: {
						wins: pokemonStats?.wins || 0,
						loses: pokemonStats?.loses || 0,
					},
				};
			});

		setFighters(selectedFighters);
		setIsLoading(false);
	}, [arenaPokemon, pokemonsDetails, stats]);

	const startFight = () => {
		if (fighters.length < 2) return;

		const [firstFighter, secondFighter] = fighters;

		const firstPower = firstFighter.base_experience * firstFighter.weight;
		const secondPower = secondFighter.base_experience * secondFighter.weight;

		if (firstPower === secondPower) {
			setFightResult('remis');
		} else {
			const winner =
				firstPower > secondPower ? firstFighter.name : secondFighter.name;
			setFightResult(winner);
			updateStats(winner);
		}

		setTimeout(() => setIsModalOpen(true), 500);
	};

	const updateStats = (winnerName) => {
		const loserName = fighters.find(
			(fighter) => fighter.name !== winnerName
		).name;

		addStats(winnerName, 1, 0, 10);
		addStats(loserName, 0, 1, 0);
	};

	const clearArena = () => {
		setIsModalOpen(false);
		fighters.forEach((fighter) => removeFromArena(fighter.name));
	};

	if (arenaError) {
		return (
			<p className='py-8 text-customRed'>Wystąpił błąd pobierania danych!</p>
		);
	}

	if (isLoading) {
		return (
			<div className='self-center py-4 '>
				<SectionHeader headerText='Arena' />
				<Loader />
				<p>Trwa ładowanie danych...</p>
			</div>
		);
	}

	return (
		<div className='py-4'>
			<SectionHeader headerText='Arena' />
			<div className='flex justify-center flex-col md:flex-row items-center py-4'>
				{fighters[0] ? (
					<ArenaCard
						fighter={fighters[0]}
						result={fightResult}
						stats={stats}
					/>
				) : (
					<ArenaPlaceholder number='1' />
				)}

				<div className='max-h-10 m-3 self-center'>
					<Button
						onClick={startFight}
						disabled={fighters.length < 2}
					>
						Walcz
					</Button>
				</div>

				{fighters[1] ? (
					<ArenaCard
						fighter={fighters[1]}
						result={fightResult}
						stats={stats}
					/>
				) : (
					<ArenaPlaceholder number='2' />
				)}
			</div>

			{isModalOpen &&
				createPortal(
					<ArenaResultModal
						clearArena={clearArena}
						fightResult={fightResult}
					/>,
					document.body
				)}
		</div>
	);
};

export default Arena;
