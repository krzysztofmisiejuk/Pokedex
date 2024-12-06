import { Button } from '../Button';

const Form = ({ children, buttonContent, onSubmit }) => {

	return (
		<form
			onSubmit={onSubmit}
			className='flex flex-col self-center size-10/12 max-w-lg gap-3 justify-center'
			noValidate
		>
			{children}
			<Button type='submit'>{buttonContent}</Button>
		</form>
	);
};

export default Form;
