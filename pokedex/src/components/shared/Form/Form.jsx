import { Button } from '../Button';

const Form = ({ children, buttonContent, onSubmit }) => {
	return (
		<form
			onSubmit={onSubmit}
			className='p-3 mb-4  flex flex-col self-center  gap-3 justify-center size-10/12 md:max-w-md'
			noValidate
		>
			{children}
			<Button type='submit'>{buttonContent}</Button>
		</form>
	);
};

export default Form;
