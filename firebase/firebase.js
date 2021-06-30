import app from 'firebase/app';
import firebaseConfig from './config';
import 'firebase/auth';

class Firebase {
	constructor() {
		if (!app.apps.length) {
			app.initializeApp(firebaseConfig);
		}
		this.auth = app.auth();
	}

	// To register.
	async register(name, email, password) {
		const newUser = await this.auth.createUserWithEmailAndPassword(email, password);

		return await newUser.user.updateProfile({
			displayName: name
		});
	}

	// To Login.
	async login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password);
	}

	// Logout.
	async logout() {
		await this.auth.signOut();
	}
}

const firebase = new Firebase();
export default firebase;
