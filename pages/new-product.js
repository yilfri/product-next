import React, { useState, useContext } from 'react';
import { css } from '@emotion/react';
import Router, { useRouter } from 'next/router';
import FileUploader from 'react-firebase-file-uploader';
import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Error } from '../components/ui/Form';

import { FirebaseContext } from '../firebase';

// Validations.
import useValidation from '../hooks/useValidation';
import validateNewProduct from '../validation/validateNewProduct';
import Error404 from '../components/layout/404';

const INITIAL_STATE = {
	name: '',
	company: '',
	/* image: '', */
	url: '',
	description: ''
};

export default function NewProduct() {
	// State of image.
	const [imgName, setImgName] = useState('');
	const [upload, setUpload] = useState(false);
	const [progress, setProgress] = useState(0);
	const [urlImg, setUrlImg] = useState('');

	// Errors.
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
			urlImg,
			description,
			votes: 0,
			comments: [],
			creation: Date.now(),
			creator: {
				id: user.uid,
				name: user.displayName
			}
		};

		// Add product to DB.
		await firebase.db.collection('products').add(product);

		return router.push('/');
	}

	const handleUploadStart = () => {
		setProgress(0);
		setUpload(true);
	};

	const handleProgress = (progress) => setProgress({ progress });

	const handleUploadError = (error) => {
		setUpload(error);
		console.log(error);
	};

	const handleUploadSuccess = (name) => {
		setProgress(100);
		setUpload(false);
		setImgName(name);
		firebase.storage
			.ref('products')
			.child(name)
			.getDownloadURL()
			.then((url) => {
				console.log(url);
				setUrlImg(url);
			});
	};

	return (
		<div>
			<Layout>
				{!user ? (
					<Error404 />
				) : (
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
									<label htmlFor="image">Image</label>
									<FileUploader
										accept="image/*"
										name="image"
										id="image"
										randomizerfilename="true"
										storageRef={firebase.storage.ref('products')}
										onUploadStart={handleUploadStart}
										onUploadError={handleUploadError}
										onUploadSuccess={handleUploadSuccess}
										onProgress={handleProgress}
									/>
								</Field>

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
				)}
			</Layout>
		</div>
	);
}
