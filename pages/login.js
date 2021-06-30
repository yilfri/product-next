import React, { useState } from 'react';
import { css } from '@emotion/react';
import Router from 'next/router';
import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Error } from '../components/ui/Form';

import firebase from '../firebase';

// Validations.
import useValidation from '../hooks/useValidation';
import validateLogIn from '../validation/validateLogIn';

const INITIAL_STATE = {
	email: '',
	password: ''
};

export default function Login() {
	const [error, setError] = useState(null);

	const { value, errors, handleChange, handleSubmit, handleBlur } = useValidation(
		INITIAL_STATE,
		validateLogIn,
		logIn
	);

	const { email, password } = value;

	function logIn() {
		console.log('Login...');
	}

	return (
		<div>
			<Layout>
				<>
					<h1
						css={css`
							text-align: center;
							margin-top: 5rem;
						`}
					>
						Create Account
					</h1>
					<Form onSubmit={handleSubmit}>
						<Field>
							<label htmlFor="email">Email</label>
							<input
								type="email"
								name="email"
								id="email"
								placeholder="Your Email"
								value={email}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</Field>

						{errors.email && <Error>{errors.email}</Error>}

						<Field>
							<label htmlFor="password">Password</label>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="Your Password"
								value={password}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</Field>

						{errors.password && <Error>{errors.password}</Error>}

						{error && <Error>{error}</Error>}
						<InputSubmit type="submit" value="Create Account" />
					</Form>
				</>
			</Layout>
		</div>
	);
}
