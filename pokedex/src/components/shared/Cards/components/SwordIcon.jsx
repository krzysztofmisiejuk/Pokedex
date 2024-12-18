import { useContext, useMemo } from 'react';
import { enqueueSnackbar } from 'notistack';
import clsx from 'clsx';
import { ArenaContext } from '../../../../context';

const SwordIcon = ({ name }) => {
	const { arenaPokemon, addToArena, removeFromArena } =
		useContext(ArenaContext);
	const arenaCapacity = arenaPokemon.length;
	const isFight = useMemo(
		() => arenaPokemon.some((item) => item.name === name),
		[arenaPokemon, name]
	);

	const handleSwordClick = async (e) => {
		e.stopPropagation();
		if (isFight) {
			await removeFromArena(name);
			enqueueSnackbar({
				message: `${name.charAt(0).toUpperCase()}${name
					.slice(1)
					.toLowerCase()} został usunięty z areny`,
				variant: 'info',
			});
		} else if (arenaCapacity < 2) {
			await addToArena(name);
			enqueueSnackbar({
				message: `${name.charAt(0).toUpperCase()}${name
					.slice(1)
					.toLowerCase()} został dodany do areny`,
				variant: 'success',
			});
		} else {
			enqueueSnackbar({
				message: 'Arena jest pełna! Usuń Pokemona, aby dodać nowego.',
				variant: 'error',
			});
		}
	};

	return (
		<div className='flex'>
			<img
				src='./src/icons/sword.png'
				className={clsx(
					'w-8 border-2 p-1 rounded border-transparent hover:border-customGrey',
					isFight ? 'opacity-100' : 'opacity-25'
				)}
				onClick={handleSwordClick}
			/>
			<span className='px-1 text-sm font-semibold'>{arenaCapacity}/2</span>
		</div>
	);
};

export default SwordIcon;
