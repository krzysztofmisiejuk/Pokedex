import { Button } from '../';

const Form = ({ children, buttonContent, onSubmit }) => {
	return (
		<form
			onSubmit={onSubmit}
			className='flex flex-col self-center justify-center gap-3 p-3 mb-4 size-10/12 md:max-w-md'
			noValidate
		>
			{children}
			<Button type='submit'>{buttonContent}</Button>
		</form>
	);
};

export default Form;
