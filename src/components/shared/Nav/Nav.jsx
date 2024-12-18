import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { enqueueSnackbar } from 'notistack';
import clsx from 'clsx';
import { LoginContext } from '../../../context';
import { Button } from '../';
import { Logo, Switch, NavLinks } from './components';

const loggedInElements = [
	{ name: 'Ulubione', path: '/favorites' },
	{ name: 'Arena', path: '/arena' },
	{ name: 'Ranking', path: '/ranking' },
	{ name: 'Edycja', path: '/edit' },
];

const loggedOutElements = [
	{ name: 'Logowanie', path: '/login' },
	{ name: 'Rejerstracja', path: '/singup' },
];

const Nav = () => {
	const { isLoggedIn, setIsLoggedIn, loggedUserName } =
		useContext(LoginContext);
	const navigate = useNavigate();

	const handleClickLogout = () => {
		setIsLoggedIn(false);
		navigate('/');
		enqueueSnackbar('Nastąpiło wylogowanie użytkownika!', {
			variant: 'success',
		});
	};

	return (
		<div className='flex flex-col justify-center items-center lg:flex-row lg:justify-between gap-4 mb-4 py-4 border-b-[1px] border-customDark dark:border-white'>
			<Logo />
			<div
				className={clsx(
					'flex flex-col gap-2 size-10/12 md:size-fit',
					!isLoggedIn && 'md:self-end'
				)}
			>
				<div
					className={clsx(
						'flex gap-10 w-full self-center md:self-end lg:max-w-fit ',
						isLoggedIn ? 'justify-between' : 'justify-end'
					)}
				>
					{isLoggedIn && (
						<div className='flex items-center'>
							<img
								className='h-8'
								src='./src/icons/user.png'
								alt='user icon'
							/>
							<span>{loggedUserName}</span>
						</div>
					)}
					<Switch className='self-end' />
				</div>
				<div className='flex flex-col items-center md:flex-row gap-2.5'>
					{isLoggedIn ? (
						<>
							<NavLinks elements={loggedInElements} />
							<Button onClick={handleClickLogout}>Wyloguj</Button>
						</>
					) : (
						<NavLinks elements={loggedOutElements} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Nav;
