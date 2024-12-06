import SingleAttribute from './components/SingleAttributes';

const Attributes = ({ data, stats }) => {
	return (
		<div className='grid grid-cols-2 gap-2 w-full'>
			<SingleAttribute
				value={data.height}
				name='Height'
			/>
			<SingleAttribute
				value={data.weight}
				name='Weight'
			/>
			<SingleAttribute
				value={
					stats?.newExp
						? data.base_experience + stats?.newExp
						: data.base_experience
				}
				name='Base experience'
			/>
			<SingleAttribute
				value={data.abilities[0]?.ability?.name || 'Brak danych'}
				name='Ability'
			/>
		</div>
	);
};

export default Attributes;
