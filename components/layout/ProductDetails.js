import React from 'react';

const ProductDetails = ({ product }) => {
	const { comments, company, creation, description, id, name, url, urlImg, votes } = product;

	return (
		<li>
			<div>
				<div></div>
				<div>
					<h1>{name}</h1>
				</div>
			</div>

			<div></div>
		</li>
	);
};

export default ProductDetails;
