import { useForm } from 'react-hook-form';
import { Form, Input } from '../../../shared';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const NewPokemonForm = () => {

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: zodResolver() });

    
	return (
		<Form buttonContent={'Dodaj pokemona!'}>
			<Input
				placeholder='Podaj nazwę nowego pokemona'
				name='name'
				register={register}
				errors={errors.name}
			/>
			<Input
				placeholder='Podaj wagę nowego pokemona'
				name='weight'
				register={register}
				errors={errors.weight}
			/>
			<Input
				placeholder='Podaj wzrost nowego pokemona'
				name='height'
				register={register}
				errors={errors.height}
			/>
			<Input
				placeholder='Podaj doświadczenie nowego pokemona'
				name='exp'
				register={register}
				errors={errors.name}
			/>
			<p>Wybierz zdjęcie</p>
			{}
		</Form>
	);
};

export default NewPokemonForm;
