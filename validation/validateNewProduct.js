export default function validateNewProduct(values) {
	let errors = {};

	// Validate if have errors.
	if (!values.name) {
		errors.name = 'Product name is required';
	}

	if (!values.company) {
		errors.company = 'Company name is required';
	}

	if (!values.url) {
		errors.url = 'Product URL is required';
	} else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
		errors.url = 'Invalid URL';
	}

	if (!values.description) {
		errors.description = 'Add a description to your product';
	}

	return errors;
}
