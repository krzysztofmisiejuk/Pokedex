const FightInfo = ({ stats }) => {
	return (
		<div className='absolute top-0 right-0 text-sm flex flex-col justify-center bg-customDark text-white w-16 h-12 rounded-bl'>
			<p>W : {stats?.wins}</p>
			<p>L : {stats?.loses}</p>
		</div>
	);
};

export default FightInfo;
