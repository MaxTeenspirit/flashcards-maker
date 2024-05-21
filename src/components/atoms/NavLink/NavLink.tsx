import {NavLink as ReactRouterLink} from 'react-router-dom';

import {INavLink} from './INavLink.ts';

const NavLink = ({to, children, ...props}: INavLink) => {
	return (
		<ReactRouterLink
			to={to}
			{...props}
			style={({isActive}) => {
				return {
					textDecoration: isActive ? 'underline' : '',
				};
			}}
		>
			{children}
		</ReactRouterLink>
	);
};

export default NavLink;
