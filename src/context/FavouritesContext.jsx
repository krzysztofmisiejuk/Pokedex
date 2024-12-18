import { createContext, useState } from 'react';

const FavouritesContext = createContext();

const BASE_URL = `http://localhost:3000/favourites`;

const FavouritesProvider = ({ children }) => {
	const [favourites, setFavourites] = useState([]);

	const fetchFavourites = async () => {
		try {
			const response = await fetch(BASE_URL);
			const data = await response.json();
			setFavourites(data);
		} catch (error) {
			console.error('ERROR:', error);
		}
	};

	const addToFav = async (name) => {
		try {
			const response = await fetch(BASE_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name }),
			});

			if (response.ok) {
				await fetchFavourites();
				return {
					message: `${name.charAt(0).toUpperCase()}${name
						.slice(1)
						.toLowerCase()} został dodany do ulubionych`,
					variant: 'success',
				};
			}
		} catch (error) {
			console.error('ERROR:', error);
		}
	};

	const deleteFromFav = async (id, name) => {
		try {
			const response = await fetch(`${BASE_URL}/${id}`, {
				method: 'DELETE',
			});

			if (response.ok) {
				await fetchFavourites();
				return {
					message: `${name.charAt(0).toUpperCase()}${name
						.slice(1)
						.toLowerCase()} został usunięty z ulubionych`,
					variant: 'info',
				};
			}
		} catch (error) {
			console.error('ERROR:', error);
		}
	};

	return (
		<FavouritesContext.Provider
			value={{ favourites, addToFav, deleteFromFav, fetchFavourites }}
		>
			{children}
		</FavouritesContext.Provider>
	);
};

export { FavouritesContext, FavouritesProvider };
