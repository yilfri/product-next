import Layout from '../components/layout/Layout';
import { useRouter } from 'next/router';

const Search = () => {
	const router = useRouter();
	const {
		query: { q }
	} = router;
	console.log(q);

	return (
		<div>
			<Layout>
				<h1>Search</h1>
			</Layout>
		</div>
	);
};
export default Search;
