import { useContext } from 'react';
import clsx from 'clsx';
import { Attributes, FightInfo, Loader } from '../../../shared';
import { ArenaContext } from '../../../../context';

const ArenaCard = ({ fighter, result, stats }) => {
	const { removeFromArena } = useContext(ArenaContext);

	if (fighter.length < 1) {
		return (
			<div className='flex flex-col py-4'>
				<Loader />
			</div>
		);
	}

	return (
		<div
			className={clsx(
				'relative flex flex-col gap-4 p-3 w-1/6 min-w-56 min-h-[386px] shadow-customShadow rounded overflow-hidden transition',
				result !== fighter.name && result && 'opacity-35'
			)}
		>
			<FightInfo stats={fighter.stats} />
			<button
				className='absolute top-2'
				onClick={() => removeFromArena(fighter.name)}
			>
				<img
					className='p-1 w-8 border-transparent border-2 rounded opacity-50 hover:border-customGrey hover:opacity-100'
					src='./src/icons/remove.png'
					alt='Remove'
				/>
			</button>

			<img
				src={fighter?.sprites?.front_default || fighter?.imageUrl}
				alt={`${fighter.name} image`}
				className='self-center w-3/4'
			/>
			<p className='font-semibold capitalize text-xl md:text-2xl'>
				{fighter.name}
			</p>
			<Attributes
				data={fighter}
				stats={stats}
			/>
		</div>
	);
};

export default ArenaCard;
