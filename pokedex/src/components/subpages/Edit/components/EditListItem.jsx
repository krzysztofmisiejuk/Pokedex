import { Button } from '../../../shared';

const EditListItem = ({ pokemon, editPokemon }) => {
	return (
		<li
			key={pokemon.id}
			className='flex items-center justify-between border-b border-customGrey py-2'
		>
			<span className='font-semibold'>{pokemon.id}.</span>
			<img
				src={pokemon.img}
				alt={pokemon.name}
				className='h-12 w-12 sm:h-16 sm:w-16'
			/>
			<span className='text-lg'>{pokemon.name}</span>
			<div className='w-30'>
				<Button onClick={() => editPokemon(pokemon.name)}>Edytuj</Button>
			</div>
		</li>
	);
};

export default EditListItem;
