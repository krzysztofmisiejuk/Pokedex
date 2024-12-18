import { useContext, useMemo } from 'react';
import { enqueueSnackbar } from 'notistack';
import clsx from 'clsx';
import { FavouritesContext } from '../../../../context';

const HeartIcon = ({ name }) => {
	const { favourites, addToFav, deleteFromFav } = useContext(FavouritesContext);

	const isFavourite = useMemo(
		() => favourites.some((item) => item.name === name),
		[favourites, name]
	);

	const handleHeartClick = async (e) => {
		e.stopPropagation();

		if (isFavourite) {
			const toRemove = favourites.find((fav) => fav.name === name);
			if (toRemove) {
				const result = await deleteFromFav(toRemove.id, name);
				if (result) {
					enqueueSnackbar({
						message: `${name.charAt(0).toUpperCase()}${name
							.slice(1)
							.toLowerCase()} został usunięty z ulubionych`,
						variant: 'info',
					});
				}
			}
		} else {
			const result = await addToFav(name);
			if (result) {
				enqueueSnackbar({
					message: `${name.charAt(0).toUpperCase()}${name
						.slice(1)
						.toLowerCase()} został dodany z ulubionych`,
					variant: 'success',
				});
			}
		}
		// fetchFavourites()
	};

	return (
		<img
			src='./src/icons/heart.png'
			className={clsx(
				'w-8 border-2 p-1 rounded border-transparent hover:border-customGrey',
				isFavourite ? 'opacity-100 ' : 'opacity-25 '
			)}
			onClick={handleHeartClick}
		/>
	);
};

export default HeartIcon;
