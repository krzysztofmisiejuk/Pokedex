const MainWrapper = ({ children }) => {
	return (
		<div className='flex flex-col sm:px-0 md:px-8 size-full max-w-screen-2xl text-center'>
			{children}
		</div>
	);
};

export default MainWrapper;
