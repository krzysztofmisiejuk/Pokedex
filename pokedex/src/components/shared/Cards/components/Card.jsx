import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchData } from '../../../../hooks';
import { LoginContext, StatsContext } from '../../../../context';
import { Loader } from '../../Loader';
import CardIcons from './CardIcons';
import { FightInfo } from '../../FightInfo';
import { Attributes } from '../../Attributes';

const Card = ({ name }) => {
	const { isLoggedIn } = useContext(LoginContext);
	const { stats, fetchStats } = useContext(StatsContext);
	const navigate = useNavigate();
	const { data, isLoading, error } = useFetchData(
		`https://pokeapi.co/api/v2/pokemon/${name}`
	);

	useEffect(() => fetchStats, []);

	const onClickHandle = () => {
		navigate(`/${name}`);
	};

	if (error) {
		return (
			<p className='py-8 text-customRed'>Wystąpił błąd pobierania danych!</p>
		);
	}

	if (isLoading) {
		return <Loader />;
	}

	const isExistStat = stats.find((stat) => stat.name === name);


	return (
		<div
			className='relative p-3 flex flex-col w-1/6 min-w-56 gap-4 shadow-customShadow rounded overflow-hidden hover:scale-105 transition cursor-pointer'
			onClick={onClickHandle}
		>
			{isLoggedIn && <CardIcons name={name} />}

			{isLoggedIn && isExistStat && <FightInfo stats={isExistStat}/>}
			{data && (
				<>
					<img
						src={data.sprites.front_default}
						alt={`${name} image`}
						className='w-3/4 self-center'
					/>
					<p className='font-semibold capitalize text-xl md:text-2xl'>{name}</p>
					<Attributes data={data} stats={isExistStat} />
				</>
			)}
		</div>
	);
};

export default Card;
