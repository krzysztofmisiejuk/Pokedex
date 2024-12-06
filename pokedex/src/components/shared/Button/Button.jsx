const Button = ({ children, onClick, disabled = false }) => {
	return (
		<button
			onClick={onClick}
			className='flex justify-center px-2.5 py-1.5 size-full min-w-32 max-h-10 text-lg md:text-xl text-white bg-customDark rounded  shadow-customShadow shadow-slate-600  hover:bg-customLightGrey transition  disabled:opacity-50 disabled:hover:bg-customDark'
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
