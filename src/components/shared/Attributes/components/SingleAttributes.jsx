const SingleAttribute = ({ value, name }) => {
	return (
		<div>
			<p>{value}</p>
			<p className='font-bold'>{name}</p>
		</div>
	);
};

export default SingleAttribute;
