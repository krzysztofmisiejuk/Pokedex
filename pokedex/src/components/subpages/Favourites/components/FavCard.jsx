import { useNavigate } from 'react-router-dom';
import { Attributes, FightInfo } from '../../../shared';
import { CardIcons } from '../../../shared/Cards/components';

const FavCard = ({ pokemon, stats }) => {
	const navigate = useNavigate();
	const onClickHandle = () => {
		navigate(`/${pokemon.name}`);
	};
	const isExistStat = stats.find((stat) => stat.name === pokemon.name);

	if (!pokemon) {
		return <p className='py-8 text-customRed'>Nie znaleziono pokemona.</p>;
	}

	return (
		<div
			className='relative flex flex-col p-3 w-1/6 min-w-56 gap-4 shadow-customShadow rounded overflow-hidden transition cursor-pointer hover:scale-105'
			onClick={onClickHandle}
		>
			<CardIcons name={pokemon.name} />
			{isExistStat && <FightInfo stats={isExistStat} />}

			<img
				src={pokemon?.sprites?.front_default || pokemon?.imageUrl}
				alt={`${pokemon?.name} image`}
				className='self-center w-3/4'
			/>
			<p className='font-semibold capitalize text-xl md:text-2xl'>
				{pokemon.name}
			</p>
			<Attributes
				data={pokemon}
				stats={stats}
			/>
		</div>
	);
};

export default FavCard;
