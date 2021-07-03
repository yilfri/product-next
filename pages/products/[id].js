import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { FirebaseContext } from '../../firebase';
import Layout from '../../components/layout/Layout';
import Error404 from '../../components/layout/404';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Field, InputSubmit } from '../../components/ui/Form';
import Button from '../../components/ui/Button';

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

	const { comments, company, creator, creation, description, name, url, urlImg, votes } = product;

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
						<div>
							<p>Published {formatDistanceToNow(new Date(creation))} ago</p>
							<p>
								By {creator.name} from {company}
							</p>
							<Image src={urlImg} alt={name} width={100} height={100} layout="responsive" />

							<p>{description}</p>

							<h2>Leave a Comment!</h2>
							<form>
								<Field>
									<input type="text" name="comment" />
								</Field>

								<InputSubmit type="submit" value="Add Comment" />
							</form>

							<h2
								ccs={css`
									margin: 2rem 0;
								`}
							>
								Comments
							</h2>

							{comments.map((comment) => (
								<li key={asd}>
									<p>{comment.name}</p>
									<p>Write by: {comment.userName}</p>
								</li>
							))}
						</div>

						<aside>
							<Button target="_blank" bgColor="true" href={url}>
								Visit Website
							</Button>

							<div
								ccs={css`
									margin-top: 5rem;
								`}
							>
								<p
									css={css`
										text-align: center;
									`}
								>
									{votes} Votes
								</p>

								<Button>Vote</Button>
							</div>
						</aside>
					</ProductContainer>
				</div>
			</Layout>
		</>
	);
};

export default Product;
