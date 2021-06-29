import React from 'react';
import Search from '../ui/Search';
import Navegation from './Navegation';
import Link from 'next/link';

const Header = () => {
	return (
		<header>
			<div>
				<div>
					<p>P</p>
					<Search />

					<Navegation />
				</div>

				<div>
					<p>Hola: Jose</p>
					<button type="button">Log Out</button>

					<Link href="/">Login</Link>
					<Link href="/">Register</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
