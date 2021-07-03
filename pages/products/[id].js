import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/dist/client/router';
import { FirebaseContext } from '../../firebase';
import Layout from '../../components/layout/Layout';
import Error404 from '../../components/layout/404';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { object } from 'prop-types';

const ProductContainer = styled.div`
	@media (min-width: 768px) {
		display: grid;
		grid-template-columns: 2fr 1fr;
		column-gap: 2rem;
	}
`;

const Product = () => {
	// State
	const [product, setProduct] = useState([]);
	const [error, setError] = useState(false);

	// Context.
	const { firebase } = useContext(FirebaseContext);

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

	if (Object.keys(product).length === 0) return <p>Cargando...</p>;

	const { comments, company, creation, description, name, url, urlImg, votes } = product;

	return (
		<>
			<Layout>
				{error && <Error404 />}
				<div className="contenedor">
					<h1
						css={css`
							text-align: center;
							margin-top: 5rem;
						`}
					>
						{name}
					</h1>

					<ProductContainer>
						<div>1</div>

						<aside>2</aside>
					</ProductContainer>
				</div>
			</Layout>
		</>
	);
};

export default Product;
