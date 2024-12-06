const ArenaPlaceholder = ({number}) => {
	return (
		<div className='relative m-2 p-3 flex flex-col justify-evenly w-1/6 min-w-56 min-h-[386px] gap-4 shadow-customShadow rounded overflow-hidden'>
			<p>Dodaj pokemona nr {number}</p>
			<div className='flex flex-col items-center gap-2  min-w-56 h- opacity-50'>
				<img
					src='./src/icons/pokeball2.png'
					alt='Pokedex Logo'
					className='w-10 h-10 self-center md:w-16 md:h-16 '
				/>
				<h1 className='text-customDark dark:text-white text-4xl md:text-5xl font-semibold'>
					Pokedex
				</h1>
			</div>
		</div>
	);
};

export default ArenaPlaceholder;
