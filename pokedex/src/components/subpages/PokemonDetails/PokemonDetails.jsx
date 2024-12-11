import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	EditContext,
	LoginContext,
	PokemonContext,
	StatsContext,
} from '../../../context';
import { Attributes, FightInfo, Loader } from '../../shared';
import { CardIcons } from '../../shared/Cards/components';

const PokemonDetails = () => {
	const { isLoggedIn } = useContext(LoginContext);
	const { stats } = useContext(StatsContext);
	const { newPokemons } = useContext(EditContext);
	const { pokemonsDetails } = useContext(PokemonContext);
	const { name } = useParams();

	const [pokemonData, setPokemonData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!name) return;

		const foundPokemon = pokemonsDetails?.find(
			(pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
		);

		const addedPokemon = newPokemons?.find(
			(pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
		);

		if (foundPokemon) {
			setPokemonData(foundPokemon);
		} else if (addedPokemon) {
			setPokemonData(addedPokemon);
		} else {
			setPokemonData(null);
		}

		setIsLoading(false);
	}, [name, pokemonsDetails, newPokemons]);

	if (!name) {
		return (
			<p className='py-8 text-customRed'>Wystąpił błąd pobierania danych!</p>
		);
	}

	if (isLoading) {
		return <Loader />;
	}

	if (!pokemonData) {
		return (
			<p className='py-8 text-customRed'>
				Nie znaleziono pokemona o nazwie {name}.
			</p>
		);
	}

	const isExistStat = stats.find((stat) => stat.name === name);

	return (
		<div className='mb-6 flex flex-col md:flex-row flex-wrap items-center justify-center p-2 relative'>
			{isLoggedIn && <CardIcons name={name} />}
			{isLoggedIn && isExistStat && <FightInfo stats={isExistStat} />}
			<div className='flex justify-center w-1/2'>
				<img
					src={pokemonData?.sprites?.front_default || pokemonData?.imageUrl}
					alt={name}
					className='w-3/4 min-w-56 max-w-sm'
				/>
			</div>
			<div className='pb-6 md:pb-2 flex flex-col items-center gap-6 md:w-1/2'>
				<p className='text-3xl font-bold capitalize'>{name}</p>
				<Attributes
					data={pokemonData}
					stats={stats}
				/>
			</div>
		</div>
	);
};

export default PokemonDetails;
