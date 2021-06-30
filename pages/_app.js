import App from 'next/app';
import firebase, { FirebaseContext } from '../firebase';
import '../styles/globals.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
	return (
		<FirebaseContext.Provider value={{ firebase }}>
			<Component {...pageProps} />
		</FirebaseContext.Provider>
	);
}
