import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import 'flowbite';
import App from './App.jsx';
import {
	LoginProvider,
	ThemeProvider,
	PokemonProvider,
	FavouritesProvider,
	ArenaProvider,
	StatsProvider,
} from './context';
import {
	Arena,
	Edit,
	Favourites,
	Home,
	LoginDashboard,
	PokemonDetails,
	Ranking,
	SingUpDashboard,
} from './components';
import './index.css';

const router = createBrowserRouter([
	{
		element: <App />,
		path: '/',
		children: [
			{
				element: <Home />,
				path: '/',
			},
			{ element: <PokemonDetails />, path: ':name' },
			{ element: <Favourites />, path: 'favorites' },
			{ element: <Arena />, path: 'arena' },
			{ element: <Ranking />, path: 'ranking' },
			{ element: <Edit />, path: 'edit' },
			{ element: <LoginDashboard />, path: 'login' },
			{ element: <SingUpDashboard />, path: 'singup' },
		],
	},
]);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<SnackbarProvider
			maxSnack={3}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
		>
			<ThemeProvider>
				<LoginProvider>
					<StatsProvider>
						<PokemonProvider>
							<ArenaProvider>
								<FavouritesProvider>
									<RouterProvider router={router} />
								</FavouritesProvider>
							</ArenaProvider>
						</PokemonProvider>
					</StatsProvider>
				</LoginProvider>
			</ThemeProvider>
		</SnackbarProvider>
	</StrictMode>
);
