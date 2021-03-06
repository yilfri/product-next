import App from 'next/app';
import firebase, { FirebaseContext } from '../firebase';
import '../styles/globals.css';
import useAuth from '../hooks/useAuth';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
	const user = useAuth();

	return (
		<FirebaseContext.Provider value={{ firebase, user }}>
			<Component {...pageProps} />
		</FirebaseContext.Provider>
	);
}
