import React from 'react';
import Search from '../ui/Search';

const Header = () => {
	return (
		<header>
			<div>
				<div>
					<p>P</p>
					<Search />
					{/* Nav */}
				</div>

				<div>{/* Admin menu */}</div>
			</div>
		</header>
	);
};

export default Header;
