import React, { useState, useEffect } from 'react';

const useValidation = (initialState, validate, fn) => {
	const [value, setValue] = useState(initialState);
	const [errors, setErrors] = useState({});
	const [submitForm, setSubmitForm] = useState(false);

	useEffect(() => {
		if (submitForm) {
			const noErrors = Object.keys(errors).length === 0;

			if (noErrors) {
				fn(); // Function has been execute in component.
			}
			setSubmitForm(false);
		}
	}, [errors]);

	// Handle Events - When user write in form.
	const handleChange = (e) => {
		setValue({
			...value,
			[e.target.name]: e.target.value
		});
	};

	// Handle Events - When user write in form.
	const handleSubmit = (e) => {
		e.preventDefault();
		const errorsValidation = validate(value);
		setErrors(errorsValidation);
		setSubmitForm(true);
	};

	// handle Events - When user focus in input.
	const handleBlur = () => {
		const errorsValidation = validate(value);
		setErrors(errorsValidation);
	};

	return {
		value,
		errors,
		submitForm,
		handleChange,
		handleSubmit,
		handleBlur
	};
};

export default useValidation;
