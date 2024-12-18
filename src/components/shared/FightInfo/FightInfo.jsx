const FightInfo = ({ stats }) => {
	return (
		<div className='absolute top-0 right-0 flex flex-col justify-center w-16 h-12 text-sm bg-customDark text-white rounded-bl'>
			<p>W : {stats?.wins}</p>
			<p>L : {stats?.loses}</p>
		</div>
	);
};

export default FightInfo;
