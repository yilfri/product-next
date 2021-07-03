import React, { useState, useEffect, useContext } from 'react';
import Layout from '../components/layout/Layout';
import ProductDetails from '../components/layout/ProductDetails';
import { FirebaseContext } from '../firebase';

const Home = () => {
	const [products, setProducts] = useState([]);

	// Import context
	const { firebase } = useContext(FirebaseContext);

	useEffect(() => {
		const getProducts = () => {
			firebase.db.collection('products').orderBy('creation', 'desc').onSnapshot(handleSnapshot);
		};

		getProducts();
		// eslint-disable-next-line
	}, []);

	function handleSnapshot(snapshot) {
		const products = snapshot.docs.map((doc) => {
			return {
				id: doc.id,
				...doc.data()
			};
		});

		setProducts(products);
	}

	return (
		<div>
			<Layout>
				<div className="listado-productos">
					<div className="contenedor">
						<ul className="bg-white">
							{products.map((product) => (
								<ProductDetails key={product.id} product={product} />
							))}
						</ul>
					</div>
				</div>
			</Layout>
		</div>
	);
};

export default Home;
