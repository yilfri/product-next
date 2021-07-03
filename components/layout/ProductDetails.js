import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Img = styled.img`
	width: 200px;
`;

const ProductDetails = ({ product }) => {
	const { comments, company, creation, description, id, name, url, urlImg, votes } = product;

	return (
		<li>
			<div>
				<div>
					<Image src={urlImg} alt={name} width={200} height={200} />
				</div>
				<div>
					<h1>{name}</h1>
					<p>{description}</p>

					<div>
						<Image src="/images/comment.svg" alt="comments" width={50} height={50} />
						<p>{comments.length} Comments</p>
					</div>

					<p>Published {formatDistanceToNow(new Date(creation))} ago</p>
				</div>
			</div>

			<div>
				<div>&#9650;</div>
				<p>{votes}</p>
			</div>
		</li>
	);
};

export default ProductDetails;
