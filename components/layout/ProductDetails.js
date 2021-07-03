import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import Link from 'next/link';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Product = styled.li`
	padding: 4rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #e1e1e1;
`;

const ProductDescription = styled.section`
	flex: 0 1 600px;
	display: grid;
	grid-template-columns: 2fr 3fr;
	column-gap: 2rem;
`;

const Title = styled.a`
	font-size: 2.5rem;
	font-weight: bold;
	margin: 0;

	:hover {
		cursor: pointer;
	}
`;

const TextDescription = styled.p`
	font-size: 1.6rem;
	margin: 1rem 0;
	color: #888;
`;

const Comments = styled.div`
	margin-top: 2rem;
	display: flex;
	align-items: center;

	div {
		display: flex;
		align-items: center;
		padding: 0.3rem;
		margin-right: 1rem;
	}
	img {
		width: 1.5rem;
		margin-right: 3rem;
	}

	p {
		font-size: 1.6rem;
		margin-right: 1rem;
		font-weight: 700;
		&::last-of-type {
			margin: 0;
		}
	}
`;

const Votes = styled.div`
	flex: 0 0 auto;
	text-align: center;
	border: 1px solid #e1e1e1;
	padding: 1rem 3rem;

	div {
		font-size: 2rem;
	}

	p {
		margin: 0;
		font-size: 2rem;
		font-weight: 700;
	}
`;

const ProductDetails = ({ product }) => {
	const { comments, company, creation, description, id, name, url, urlImg, votes } = product;

	return (
		<Product>
			<ProductDescription>
				<div>
					<Image src={urlImg} alt={name} width={300} height={300} objectFit="cover" />
				</div>
				<div>
					<Link href="/products/[id]" as={`/products/${id}`}>
						<Title>{name}</Title>
					</Link>
					<TextDescription>{description}</TextDescription>

					<Comments>
						<div>
							<Image
								src="/images/comment.svg"
								alt="comments"
								width={50}
								height={50}
								objectFit="contain"
							/>
							<p>{comments.length} Comments</p>
						</div>
					</Comments>

					<p>Published {formatDistanceToNow(new Date(creation))} ago</p>
				</div>
			</ProductDescription>

			<Votes>
				<div>&#9650;</div>
				<p>{votes}</p>
			</Votes>
		</Product>
	);
};

export default ProductDetails;
