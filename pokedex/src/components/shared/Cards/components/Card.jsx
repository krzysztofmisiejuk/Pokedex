import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	LoginContext,
	StatsContext,
	EditContext,
	PokemonContext,
} from '../../../../context';
import { Loader } from '../../Loader';
import CardIcons from './CardIcons';
import { FightInfo } from '../../FightInfo';
import { Attributes } from '../../Attributes';
import { SectionHeader } from '../../SectionHeader';

const Card = ({ name, addedPokemons, page }) => {
	const { isLoggedIn } = useContext(LoginContext);
	const { stats } = useContext(StatsContext);
	const { newPokemons } = useContext(EditContext);
	const { pokemonsDetails } = useContext(PokemonContext);
	const [pokemonData, setPokemonData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const findPokemonData = () => {
			const isExist = pokemonsDetails?.find(
				(pokemon) => pokemon?.name.toLowerCase() === name.toLowerCase()
			);
			const isAdded = addedPokemons?.find(
				(pokemon) => pokemon?.name.toLowerCase() === name.toLowerCase()
			);

			if (isExist) {
				return {
					...isExist,
					weight: isExist.weight,
					height: isExist.height,
					base_experience: isExist.base_experience,
					abilities: isExist.abilities,
				};
			}

			if (page === 9 && isAdded) {
				return {
					...isAdded,
					weight: isAdded.weight,
					height: isAdded.height,
					base_experience: isAdded.base_experience,
					abilities: isAdded.abilities || 'brak danych',
				};
			}

			return null;
		};

		const newPokemonData = findPokemonData();

		if (newPokemonData) {
			setPokemonData(newPokemonData);
		} else {
			setPokemonData(null);
		}

		if (pokemonData && newPokemons) {
			const updatedPokemon = newPokemons.find(
				(newPokemon) =>
					newPokemon.name.toLowerCase() === pokemonData.name.toLowerCase()
			);
			if (updatedPokemon) {
				setPokemonData({
					...pokemonData,
					weight: updatedPokemon.weight || pokemonData.weight,
					height: updatedPokemon.height || pokemonData.height,
					base_experience:
						updatedPokemon.base_experience || pokemonData.base_experience,
					abilities: updatedPokemon.abilities || pokemonData.abilities,
				});
			}
		}

		setIsLoading(false);
	}, [newPokemons, addedPokemons]);

	const onClickHandle = () => {
		navigate(`/${name}`);
	};

	if (!pokemonData) {
		return null;
	}

	if (!name) {
		return (
			<p className='py-8 text-customRed'>
				Wystąpił błąd pobierania danych! Nie ma pokemona z takim imieniem.
			</p>
		);
	}

	if (isLoading) {
		return (
			<div className='self-center py-4 '>
				<SectionHeader headerText='Ranking' />
				<Loader />
				<p>Trwa ładowanie danych...</p>
			</div>
		);
	}

	const isExistStat = stats.find((stat) => stat.name === name);

	return (
		<div
			className='relative p-3 flex flex-col w-1/6 min-w-56 gap-4 shadow-customShadow rounded overflow-hidden hover:scale-105 transition cursor-pointer'
			onClick={onClickHandle}
		>
			{isLoggedIn && <CardIcons name={name} />}

			{isLoggedIn && isExistStat && <FightInfo stats={isExistStat} />}
			{pokemonData && (
				<>
					<img
						src={pokemonData?.sprites?.front_default || pokemonData.imageUrl}
						alt={`${name} image`}
						className='w-3/4 self-center'
					/>
					<p className='font-semibold capitalize text-xl md:text-2xl'>{name}</p>
					<Attributes
						data={pokemonData}
						stats={stats}
					/>
				</>
			)}
		</div>
	);
};

export default Card;
