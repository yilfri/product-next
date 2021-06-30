import React from 'react';
import Layout from '../components/layout/Layout';

export default function CreateAccount() {
	return (
		<div>
			<Layout>
				<>
					<h1>Create Account</h1>
					<form>
						<div>
							<label htmlFor="name">Name</label>
							<input type="text" name="name" id="name" placeholder="Your Name" />
						</div>

						<div>
							<label htmlFor="email">Email</label>
							<input type="email" name="email" id="email" placeholder="Your Email" />
						</div>

						<div>
							<label htmlFor="password">Password</label>
							<input type="password" name="password" id="password" placeholder="Your Password" />
						</div>

						<input type="submit" value="Create Account" />
					</form>
				</>
			</Layout>
		</div>
	);
}
