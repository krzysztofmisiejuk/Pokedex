import { Button } from '../../../shared';

const ArenaResultModal = ({ clearArena, fightResult }) => {
	return (
		<div className='fixed p-8 flex flex-col border-customDark dark:border-white border-2 rounded bg-lightGradient dark:bg-darkGradient top-16 left-1/2 -translate-x-1/2 text-customDark dark:text-white'>
			<p className='m-4 text-xl md:text-2xl text-center min-w-60'>
				{fightResult === 'remis' ? (
					'Pojedynek zakończył się remisem'
				) : (
					<>
						Zwycięzcą pojedynku został:
						 <span className='font-bold block'>
							{fightResult.charAt(0).toUpperCase()}
							{fightResult.slice(1).toLowerCase()}
						 </span >
					</>
				)}
			</p>
			<Button onClick={clearArena}>Opuść arenę</Button>
		</div>
	);
};

export default ArenaResultModal;
