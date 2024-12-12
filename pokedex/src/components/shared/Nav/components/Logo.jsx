import { Link } from 'react-router-dom';

const Logo = () => {
	return (
		<Link to='/'>
			<div className='flex items-center gap-2'>
				<img
					src='./src/icons/pokeball2.png'
					alt='Pokedex Logo'
					className='self-center w-12 h-12 md:w-16 md:h-16 '
				/>
				<h1 className='text-4xl md:text-5xl font-semibold text-customDark dark:text-white'>
					Pokedex
				</h1>
			</div>
		</Link>
	);
};

export default Logo;
