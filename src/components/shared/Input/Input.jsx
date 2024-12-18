const Input = ({
	type = 'text',
	name,
	placeholder,
	register,
	errors,
	onChange,
	defaultValue,
	readOnly = false,
}) => {
	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();

			const form = event.target.form;
			const index = Array.from(form).indexOf(event.target);
			const nextElement = form.elements[index + 1];

			if (nextElement) {
				nextElement.focus();
			} else {
				form.submit();
			}
		}
	};
	return (
		<>
			<input
				className='p-1 text-md md:text-lg text-black bg-white shadow-customShadow rounded'
				type={type}
				name={name}
				placeholder={placeholder}
				{...register(name)}
				onChange={onChange}
				onKeyDown={handleKeyDown}
				defaultValue={defaultValue}
				readOnly={readOnly}
			/>
			{
				<span className='self-start text-xs sm:text-sm text-customRed'>
					{errors && errors.message}
				</span>
			}
		</>
	);
};

export default Input;
