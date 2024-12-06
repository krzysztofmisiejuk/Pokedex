import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button, Loader, SectionHeader } from '../../shared';
import { ArenaContext, PokemonContext, StatsContext } from '../../../context';
import { ArenaCard, ArenaPlaceholder, ArenaResultModal } from './components';

const Arena = () => {
	const { arenaPokemon, removeFromArena, fetchArenaData, arenaError } =
		useContext(ArenaContext);
	const { stats, addStats, fetchStats } = useContext(StatsContext);
	const { pokemonsDetails } = useContext(PokemonContext);

	const [fighters, setFighters] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [fightResult, setFightResult] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchArenaData();
		fetchStats();
	}, []);

	useEffect(() => {
		const selectedFighters = pokemonsDetails.filter((pokemon) =>
			arenaPokemon.some((dataItem) => dataItem.name === pokemon.name)
		);
		setFighters(selectedFighters);
		setIsLoading(false);
	}, [arenaPokemon, pokemonsDetails]);

	const startFight = () => {
		if (fighters.length < 2) return;
		
		const [firstFighter, secondFighter] = fighters;

		const firstStat = stats.find((stat) => stat.name === firstFighter.name);
		const secondStat = stats.find((stat) => stat.name === secondFighter.name);

		const firstPower =
			(firstFighter.base_experience + (firstStat?.newExp || 0)) *
			firstFighter.weight;
		const secondPower =
			(secondFighter.base_experience + (secondStat?.newExp || 0)) *
			secondFighter.weight;

		if (firstPower === secondPower) {
			setFightResult('remis');
		} else {
			setFightResult(
				firstPower > secondPower ? firstFighter.name : secondFighter.name
			);
			updateStats(
				firstPower > secondPower ? firstFighter.name : secondFighter.name
			);
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
