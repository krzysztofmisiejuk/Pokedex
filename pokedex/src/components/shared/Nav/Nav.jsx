import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { enqueueSnackbar } from 'notistack';
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
		<div className='mb-4 py-4 border-b-[1px] border-customDark dark:border-white flex flex-col justify-center items-center  lg:flex-row lg:justify-between gap-4'>
			<Logo />
			<div
				className={`flex flex-col ${
					!isLoggedIn && 'md:self-end'
				} gap-2 size-10/12 md:size-fit`}
			>
				<div
					className={` flex gap-10 w-full lg:max-w-fit  ${
						isLoggedIn ? 'justify-between' : 'justify-end'
					} self-center md:self-end`}
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
				<div className='flex flex-col items-center gap-2.5 md:flex-row'>
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
