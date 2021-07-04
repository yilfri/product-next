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

const ProductCreator = styled.p`
	color: #da552f;
	font-weight: bold;
	display: block;
	position: relative;
	text-align: right;
`;

const CommentsSection = styled.section`
	border: 1px solid #e1e1e1;
	padding: 2rem;
	margin-bottom: 2rem;
	display: flex;
	flex-direction: column;
`;

const Product = () => {
	// State
	const [product, setProduct] = useState({});
	const [consultDB, setConsultDB] = useState(true);
	const [error, setError] = useState(false);
	const [comment, setComment] = useState({});

	// Context.
	const { firebase, user } = useContext(FirebaseContext);

	// Routing.
	const router = useRouter();
	const {
		query: { id }
	} = router;

	useEffect(() => {
		if (id && consultDB) {
			const getProduct = async () => {
				const productQuery = await firebase.db.collection('products').doc(id);
				const product = await productQuery.get();

				if (product.exists) {
					setProduct(product.data());
					setConsultDB(false);
				} else {
					setError(true);
					setConsultDB(false);
				}
			};
			console.log('cuidado');
			getProduct();
		}
	}, [id]);

	if (Object.keys(product).length === 0 && !error) return <p>Cargando...</p>;

	const {
		comments,
		company,
		creator,
		creation,
		description,
		name,
		url,
		urlImg,
		votes,
		voteInProduct
	} = product;

	//  Handle Event - Send Votes
	const handleVotes = () => {
		if (!user) {
			router.push('/login');
		}
		// Get and add new vote
		const newTotal = votes + 1;

		// Check if actual user has vote.
		if (voteInProduct.includes(user.uid)) return;

		// Save user ID
		const newVote = [...voteInProduct, user.uid];

		// Update DB.
		firebase.db.collection('products').doc(id).update({ votes: newTotal, voteInProduct: newVote });

		// Update State
		setProduct({
			...product,
			votes: newTotal
		});

		// Consulting for new vote DB.
		setConsultDB(true);
	};

	// Comments.
	const handleComment = (e) => {
		setComment({
			...comment,
			[e.target.name]: e.target.value
		});
	};

	//  Check if actual user is creator product same.
	const isCreator = (id) => {
		if (creator.id === id) return true;
	};

	//  Handle Event - Send comments.
	const handleSendComment = (e) => {
		e.preventDefault();

		// Prevent comment from users no logged.
		if (!user) {
			router.push('/login');
		}

		// Set comment information extra.
		comment.userId = user.uid;
		comment.userName = user.displayName;

		// Copy new comment.
		const newComments = [...comments, comment];

		// Update DB.
		firebase.db.collection('products').doc(id).update({
			comments: newComments
		});

		// Update State.
		setProduct({
			...product,
			comments: newComments
		});

		// Consulting for new comment DB.
		setConsultDB(true);
	};

	// Check if actual user can delete product.
	const canDelete = () => {
		if (!user) return false;

		if (creator.id === user.uid) {
			return true;
		}
	};

	//  Handle Event - Delete product.
	const handleClickDelete = async () => {
		if (!user) {
			return router.push('/login');
		}

		if (creator.id !== user.uid) {
			return router.push('/');
		}

		try {
			firebase.db.collection('products').doc(id).delete();
			router.push('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Layout>
				{error ? (
					<Error404 />
				) : (
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

								{user && (
									<>
										<h2>Leave a Comment!</h2>
										<form onSubmit={handleSendComment}>
											<Field>
												<input type="text" name="message" onChange={handleComment} />
											</Field>

											<InputSubmit type="submit" value="Add Comment" />
										</form>
									</>
								)}

								<h2
									css={css`
										margin: 2rem 0;
									`}
								>
									Comments
								</h2>

								{comments.length === 0 ? (
									'No comments yet'
								) : (
									<ul>
										{comments.map((comment, i) => (
											<CommentsSection key={`${comment.userId}-${i}`}>
												<article
													css={css`
														word-break: break-all;
													`}
												>
													<p>{comment.message}</p>
													<p>
														Write by:
														<span
															css={css`
																font-weight: bold;
															`}
														>
															{` ${comment.userName}`}
														</span>
													</p>
													{isCreator(comment.userId) && <ProductCreator>Creador</ProductCreator>}
												</article>
											</CommentsSection>
										))}
									</ul>
								)}
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

									<Button onClick={handleVotes}>Vote</Button>
								</div>
							</aside>
						</ProductContainer>

						{canDelete() && <Button onClick={handleClickDelete}>Delete Product</Button>}
					</div>
				)}
			</Layout>
		</>
	);
};

export default Product;
