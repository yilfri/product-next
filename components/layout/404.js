import React from 'react';
import { css } from '@emotion/react';

const Error404 = () => {
	return (
		<div
			css={css`
				margin-top: 5rem;
				text-align: center;
			`}
		>
			<h1>Page not available :(</h1>
		</div>
	);
};

export default Error404;
