import { useContext } from 'react';
import { EditContext } from '../../../context';

import SingleAttribute from './components/SingleAttributes';

const Attributes = ({ data, stats }) => {
	const { newPokemons } = useContext(EditContext);
	const isEdited = newPokemons.find((pokemon) => {
		return pokemon?.name === data?.name;
	});
	const isExistStat = stats?.find((stat) => stat.name === data.name);

	return (
		<div className='grid grid-cols-2 gap-2 w-full'>
			<SingleAttribute
				value={isEdited?.height ? isEdited?.height : data?.height}
				name='Wzrost'
			/>
			<SingleAttribute
				value={isEdited?.weight ? isEdited?.weight : data?.weight}
				name='Waga'
			/>
			<SingleAttribute
				value={
					isEdited?.base_experience
						? isExistStat
							? Number(isEdited.base_experience) + isExistStat.newExp
							: isEdited.base_experience
						: isExistStat?.newExp
						? data.base_experience + isExistStat.newExp
						: data.base_experience
				}
				name='Exp'
			/>

			<SingleAttribute
				value={data?.abilities ? data?.abilities[0]?.ability?.name : 'Brak danych'}
				name='Zdolność'
			/>
		</div>
	);
};

export default Attributes;
