import React, { useState, useContext } from 'react';
import { css } from '@emotion/react';
import Router, { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Error } from '../components/ui/Form';

import { FirebaseContext } from '../firebase';

// Validations.
import useValidation from '../hooks/useValidation';
import validateNewProduct from '../validation/validateNewProduct';

const INITIAL_STATE = {
	name: '',
	company: '',
	image: '',
	url: '',
	description: ''
};

export default function NewProduct() {
	const [error, setError] = useState(null);

	const { value, errors, handleChange, handleSubmit, handleBlur } = useValidation(
		INITIAL_STATE,
		validateNewProduct,
		createProduct
	);

	// Hook Router to redirect
	const router = useRouter();

	const { name, company, image, url, description } = value;

	// Context with CRUD to Firebase.
	const { user, firebase } = useContext(FirebaseContext);

	async function createProduct() {
		// If no have user auth...
		if (!user) {
			return router.push('/');
		}

		// Create object of the new product.
		const product = {
			name,
			company,
			url,
			description,
			votes: 0,
			comments: [],
			creation: Date.now()
		};

		// Add product to DB.
		firebase.db.collection('products').add(product);
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
						New Product
					</h1>
					<Form onSubmit={handleSubmit}>
						<fieldset>
							<legend>General Information</legend>
							<Field>
								<label htmlFor="name">Name</label>
								<input
									type="text"
									name="name"
									id="name"
									placeholder="Your Product Name"
									autoComplete="off"
									value={name}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
							</Field>

							{errors.name && <Error>{errors.name}</Error>}

							<Field>
								<label htmlFor="company">Company</label>
								<input
									type="text"
									name="company"
									id="company"
									placeholder="Your Company Name"
									autoComplete="off"
									value={company}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
							</Field>

							{errors.company && <Error>{errors.company}</Error>}

							<Field>
								<label htmlFor="url">URL</label>
								<input
									type="url"
									name="url"
									id="url"
									placeholder="Your Company URL (with http or https)"
									autoComplete="off"
									value={url}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
							</Field>

							{errors.url && <Error>{errors.url}</Error>}

							{/* <Field>
								<label htmlFor="image">Image</label>
								<input
									type="file"
									name="image"
									id="image"
									value={image}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
							</Field>

							{errors.image && <Error>{errors.image}</Error>} */}
						</fieldset>

						<fieldset>
							<legend>About your Product</legend>

							<Field>
								<label htmlFor="name">Description</label>
								<textarea
									type="description"
									name="description"
									id="description"
									placeholder="Tell us about your company"
									autoComplete="off"
									value={description}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
							</Field>

							{errors.description && <Error>{errors.description}</Error>}
						</fieldset>

						{error && <Error>{error}</Error>}
						<InputSubmit type="submit" value="Create Account" />
					</Form>
				</>
			</Layout>
		</div>
	);
}
