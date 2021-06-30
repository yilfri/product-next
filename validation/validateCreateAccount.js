export default function validateCreateAccount(values) {
	let errors = {};

	// Validate if have errors.
	if (!values.name) {
		errors.name = 'Name is required';
	}

	if (!values.email) {
		errors.email = 'Email is required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
		errors.email = 'Invalid Email.';
	}

	if (!values.password) {
		errors.password = 'Password is required';
	} else if (values.password.length < 6) {
		errors.password = 'The password must be a minimum of 6 characters';
	}

	return errors;
}
