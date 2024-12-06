const MainWrapper = ({ children }) => {
	return (
		<div className='text-center flex flex-col sm: px-0 md:px-8 max-w-screen-2xl size-full '>
			{children}
		</div>
	);
};

export default MainWrapper;
