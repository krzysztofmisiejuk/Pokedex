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
			className='relative p-3 flex flex-col w-1/6 min-w-56 gap-4 shadow-customShadow rounded overflow-hidden hover:scale-105 transition cursor-pointer'
			onClick={onClickHandle}
		>
			<CardIcons name={pokemon.name} />
			{isExistStat && <FightInfo stats={isExistStat} />}

			<img
				src={pokemon?.sprites?.front_default || pokemon?.imageUrl}
				alt={`${pokemon?.name} image`}
				className='w-3/4 self-center'
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
