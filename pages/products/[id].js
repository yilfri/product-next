import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/dist/client/router';
import { FirebaseContext } from '../../firebase';
import Layout from '../../components/layout/Layout';
import Error404 from '../../components/layout/404';

const Product = () => {
	// State
	const [product, setProduct] = useState([]);
	const [error, setError] = useState(false);

	// Context.
	const { firebase } = useContext(FirebaseContext);

	const { name } = product;

	// Routing.
	const router = useRouter();
	const {
		query: { id }
	} = router;

	useEffect(() => {
		if (id) {
			const getProduct = async () => {
				const productQuery = await firebase.db.collection('products').doc(id);
				const product = await productQuery.get();

				if (product.exists) {
					setProduct(product.data());
				} else {
					setError(true);
				}
			};

			getProduct();
		}
	}, [id]);

	return (
		<>
			<Layout>
				<h1>{name}</h1>
				{error && <Error404 />}
			</Layout>
		</>
	);
};

export default Product;
