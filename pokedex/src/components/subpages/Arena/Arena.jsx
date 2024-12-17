import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
	ArenaContext,
	EditContext,
	PokemonContext,
	StatsContext,
} from '../../../context';
import { ArenaCard, ArenaPlaceholder, ArenaResultModal } from './components';
import { Button, Loader, SectionHeader } from '../../shared';

const Arena = () => {
	const { arenaPokemon, removeFromArena, fetchArenaData } =
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
		const createFighterObject = (pokemonDetail) => {
			const updateFighterStats = newPokemons.find(
				(newPokemon) =>
					newPokemon.name?.toLowerCase() === pokemonDetail.name?.toLowerCase()
			);

			const pokemonStats = stats.find(
				(stat) => stat.name?.toLowerCase() === pokemonDetail.name?.toLowerCase()
			);

			const fighter = {
				name: updateFighterStats?.name || pokemonDetail.name,
				base_experience:
					updateFighterStats?.base_experience ?? pokemonDetail.base_experience,
				height:
					updateFighterStats?.height || pokemonDetail.height || 'Brak danych',
				weight:
					updateFighterStats?.weight || pokemonDetail.weight || 'Brak danych',
				imageUrl:
					pokemonDetail.imageUrl || pokemonDetail.sprites?.front_default,
				stats: {
					wins: pokemonStats?.wins || 0,
					loses: pokemonStats?.loses || 0,
				},
			};

			if (pokemonStats?.newExp) {
				fighter.base_experience += pokemonStats.newExp;
			}

			return fighter;
		};

		const updatedPokemons = pokemonsDetails.map(createFighterObject);

		const uniqueNewPokemons = newPokemons
			.filter(
				(newPokemon) =>
					!pokemonsDetails.some(
						(pokemonDetail) =>
							pokemonDetail.name?.toLowerCase() ===
							newPokemon.name?.toLowerCase()
					)
			)
			.map((newPokemon) => ({
				name: newPokemon.name,
				base_experience: newPokemon.base_experience,
				height: newPokemon.height || 'Brak danych',
				weight: newPokemon.weight || 'Brak danych',
				imageUrl: newPokemon.imageUrl || 'Brak zdjęcia',
				stats: {
					wins: 0,
					loses: 0,
				},
			}));

		const combinedPokemons = [...updatedPokemons, ...uniqueNewPokemons];

		const selectedFighters = combinedPokemons.filter((pokemon) =>
			arenaPokemon.some(
				(arenaPokemon) =>
					arenaPokemon.name?.toLowerCase() === pokemon.name?.toLowerCase()
			)
		);

		setFighters(selectedFighters);
		setIsLoading(false);
	}, [arenaPokemon, pokemonsDetails, newPokemons, stats]);

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

	if (isLoading) {
		return (
			<div className='self-center py-4'>
				<SectionHeader headerText='Arena' />
				<Loader />
				<p>Trwa ładowanie danych...</p>
			</div>
		);
	}

	return (
		<div className='py-4'>
			<SectionHeader headerText='Arena' />
			<div className='flex flex-col md:flex-row justify-center items-center py-4'>
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
