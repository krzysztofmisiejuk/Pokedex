import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { Button } from '../../';


const NavLinks = ({ elements }) => (
	<>
		{elements.map(({ name, path }) => (
			<NavLink
				to={path}
				key={name}
				className={({ isActive }) =>
					clsx(
						'size-full transition-all',
						isActive && 'scale-110 md:translate-y-1'
						
					)
				}
			>
				<Button>{name}</Button>
			</NavLink>
		))}
	</>
);

export default NavLinks;
