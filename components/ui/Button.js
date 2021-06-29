import styled from '@emotion/styled';

const Button = styled.a`
	font-weight: 700;
	text-transform: uppercase;
	border: 1px solid #d1d1d1;
	padding: 0.8rem 2rem;
	margin-right: 1rem;
	transition: 0.3s;
	background-color: ${(props) => (props.bgColor ? '#DA552F' : 'white')};
	color: ${(props) => (props.bgColor ? 'white' : '#000')};

	&::last-of-type {
		margin-right: 0;
	}

	&:hover {
		cursor: pointer;
		opacity: 0.9;
	}
`;

export default Button;
