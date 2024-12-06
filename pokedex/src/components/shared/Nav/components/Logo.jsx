import { Link } from 'react-router-dom';

const Logo = () => {
	return (
		<Link to='/'>
			<div className='flex items-center gap-2'>
				<img
					src='./src/icons/pokeball2.png'
					alt='Pokedex Logo'
					className='w-12 h-12 self-center md:w-16 md:h-16 '
				/>
				<h1 className='text-customDark dark:text-white text-4xl md:text-5xl font-semibold'>
					Pokedex
				</h1>
			</div>
		</Link>
	);
};

export default Logo;
