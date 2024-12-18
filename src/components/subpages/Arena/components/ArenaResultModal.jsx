import { Button } from '../../../shared';

const ArenaResultModal = ({ clearArena, fightResult }) => {
	return (
		<div className='fixed top-16 left-1/2 flex flex-col p-8 border-2 bg-lightGradient dark:bg-darkGradient border-customDark dark:border-white -translate-x-1/2 rounded text-customDark dark:text-white'>
			<p className='m-4 text-xl md:text-2xl text-center min-w-60'>
				{fightResult === 'remis' ? (
					'Pojedynek zakończył się remisem'
				) : (
					<>
						Zwycięzcą pojedynku został:
						<span className='block font-bold'>
							{fightResult.charAt(0).toUpperCase()}
							{fightResult.slice(1).toLowerCase()}
						</span>
					</>
				)}
			</p>
			<Button onClick={clearArena}>Opuść arenę</Button>
		</div>
	);
};

export default ArenaResultModal;
