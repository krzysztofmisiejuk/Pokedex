const ArenaPlaceholder = ({ number }) => {
	return (
		<div className='relative flex flex-col justify-evenly gap-4 m-2 p-3 w-1/6 min-w-56 min-h-[386px] shadow-customShadow rounded overflow-hidden'>
			<p>Dodaj pokemona nr {number}</p>
			<div className='flex flex-col items-center gap-2 min-w-56 opacity-50'>
				<img
					src='./src/icons/pokeball2.png'
					alt='Pokedex Logo'
					className='self-center w-10 h-10 md:w-16 md:h-16 '
				/>
				<h1 className='text-4xl md:text-5xl font-semibold text-customDark dark:text-white'>
					Pokedex
				</h1>
			</div>
		</div>
	);
};

export default ArenaPlaceholder;
