const SectionWrapper = ({ children }) => {
	return (
		<div className=' flex flex-col justify-center px-2 shadow-customShadow'>
			{children}
		</div>
	);
};

export default SectionWrapper;
