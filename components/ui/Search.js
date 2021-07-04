import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Router from 'next/router';

const InputText = styled.input`
	border: 1px solid var(--gray3);
	padding: 1rem;
	min-width: 300px;
`;

const ButtonSubmit = styled.button`
	height: 3rem;
	width: 3rem;
	display: block;
	background-size: 4rem;
	background-image: url('/images/find.svg');
	background-repeat: no-repeat;
	position: absolute;
	right: 1rem;
	top: 1px;
	background-color: white;
	border: none;
	text-indent: -99999px;

	&:hover {
		cursor: pointer;
	}
`;

const Search = () => {
	const [search, setSearch] = useState('');

	const handleSearchProduct = (e) => {
		e.preventDefault();

		if (search.trim() === '') return;

		Router.push({
			pathname: '/search',
			query: { q: search }
		});
	};
	return (
		<form
			css={css`
				position: relative;
			`}
			onSubmit={handleSearchProduct}
		>
			<InputText type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />

			<ButtonSubmit type="submit">Search</ButtonSubmit>
		</form>
	);
};

export default Search;
