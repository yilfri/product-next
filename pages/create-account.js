import React from 'react';
import { css } from '@emotion/react';
import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Error } from '../components/ui/Form';

// Validations.
import useValidation from '../hooks/useValidation';
import validateCreateAccount from '../validation/validateCreateAccount';

const INITIAL_STATE = {
	name: '',
	email: '',
	password: ''
};

export default function CreateAccount() {
	const { value, errors, handleChange, handleSubmit, handleBlur } = useValidation(
		INITIAL_STATE,
		validateCreateAccount,
		createAccount
	);

	const { name, email, password } = value;

	function createAccount() {
		console.log('Create Account');
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
							<label htmlFor="name">Name</label>
							<input
								type="text"
								name="name"
								id="name"
								placeholder="Your Name"
								value={name}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</Field>

						{errors.name && <Error>{errors.name}</Error>}

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

						<InputSubmit type="submit" value="Create Account" />
					</Form>
				</>
			</Layout>
		</div>
	);
}
