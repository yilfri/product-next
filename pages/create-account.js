import React from 'react';
import { css } from '@emotion/react';
import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit } from '../components/ui/Form';

export default function CreateAccount() {
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
					<Form>
						<Field>
							<label htmlFor="name">Name</label>
							<input type="text" name="name" id="name" placeholder="Your Name" />
						</Field>

						<Field>
							<label htmlFor="email">Email</label>
							<input type="email" name="email" id="email" placeholder="Your Email" />
						</Field>

						<Field>
							<label htmlFor="password">Password</label>
							<input type="password" name="password" id="password" placeholder="Your Password" />
						</Field>

						<InputSubmit type="submit" value="Create Account" />
					</Form>
				</>
			</Layout>
		</div>
	);
}
