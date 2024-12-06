import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchData } from '../../../hooks';
import { LoginContext, StatsContext } from '../../../context';
import { Attributes, FightInfo, Loader } from '../../shared';
import { CardIcons } from '../../shared/Cards/components';

const PokemonDetails = () => {
	const { isLoggedIn } = useContext(LoginContext);
	const { stats, fetchStats } = useContext(StatsContext);
	const { name } = useParams();
	const { data, isLoading, error } = useFetchData(
		`https://pokeapi.co/api/v2/pokemon/${name}`
	);

	useEffect(() => fetchStats, []);

	if (error) {
		return (
			<p className='py-8 text-customRed'>Wystąpił bład pobierania danych!</p>
		);
	}

	if (isLoading) {
		return <Loader />;
	}
	const isExistStat = stats.find((stat) => stat.name === name);

	return (
		data && (
			<div className='mb-6 flex flex-col md:flex-row flex-wrap items-center justify-center p-2 relative'>
				{isLoggedIn && <CardIcons name={name} />}
				{isLoggedIn && isExistStat && <FightInfo stats={isExistStat} />}
				<div className='flex justify-center w-1/2'>
					<img
						src={data.sprites.front_default}
						alt=''
						className='w-3/4  min-w-56 max-w-sm'
					/>
				</div>
				<div className='pb-6 md:pb-2 flex flex-col items-center gap-6 md:w-1/2 '>
					<p className='text-3xl font-bold capitalize'>{name}</p>
					<Attributes data={data} />
				</div>
			</div>
		)
	);
};

export default PokemonDetails;
