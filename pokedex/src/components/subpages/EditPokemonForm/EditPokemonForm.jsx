import { useForm } from 'react-hook-form';
import { Button, Form, Input, Loader } from '../../shared';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { EditContext, PokemonContext } from '../../../context';

const EditPokemonForm = () => {
	const [matchedPokemon, setMatchedPokemon] = useState(null);
	const { newPokemons, fetchNewPokemons } = useContext(EditContext);
	const { pokemonsDetails } = useContext(PokemonContext);
	const navigate = useNavigate();
	const { name: pokemonName } = useParams();

	useEffect(() => {
		if (pokemonsDetails && newPokemons) {
			const combinedPokemons = pokemonsDetails.map((pokemon) => {
				const updatedPokemon = newPokemons.find(
					(newPokemon) =>
						newPokemon?.name?.toLowerCase() === pokemon?.name?.toLowerCase()
				);
				return updatedPokemon ? { ...pokemon, ...updatedPokemon } : pokemon;
			});

			if (pokemonName) {
				const foundPokemon =
					combinedPokemons.find(
						({ name }) => name?.toLowerCase() === pokemonName?.toLowerCase()
					) ||
					newPokemons.find(
						({ name }) => name?.toLowerCase() === pokemonName?.toLowerCase()
					);

				setMatchedPokemon(foundPokemon);
			}
		}
	}, [pokemonsDetails, newPokemons, pokemonName]);

	const newPokemonSchema = z.object({
		name: z.string().optional(),
		weight: z.string().min(1, { message: 'Musisz wpisać masę pokemona' }),
		height: z.string().min(1, { message: 'Musisz wpisać wzrost pokemona' }),
		base_experience: z
			.string()
			.min(1, { message: 'Musisz wpisać doświadczenie pokemona' }),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(newPokemonSchema),
	});

	const updatePokemon = async (formData) => {
		const pokemonData = {
			...formData,
			name: formData.name?.trim() || matchedPokemon?.name,
			imageUrl: matchedPokemon?.imageUrl,
		};

		try {
			const existingPokemon = newPokemons.find(
				(pokemon) =>
					pokemon?.name?.toLowerCase() === pokemonData?.name?.toLowerCase() 
			);

			

			if (existingPokemon) {
				const response = await fetch(
					`http://localhost:3000/newPokemons/${existingPokemon.name}`,
					{
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(pokemonData),
					}
				);

				if (!response.ok) {
					throw new Error('Nie udało się zaktualizować danych');
				}

				enqueueSnackbar({
					message: `${formData.name} został zaktualizowany`,
					variant: 'success',
				});
			} else {
				const response = await fetch('http://localhost:3000/newPokemons', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(pokemonData),
				});

				if (!response.ok) {
					throw new Error('Nie udało się dodać danych');
				}

				enqueueSnackbar({
					message: `${formData.name} został dodany do listy pokemonów`,
					variant: 'success',
				});
			}

			fetchNewPokemons();
		} catch (error) {
			console.error('Błąd wysyłania danych:', error);
		}

		navigate('/edit');
	};

	const onSubmit = (data) => {
		updatePokemon(data);
	};

	return (
		<div className='flex items-center justify-center flex-col size-full bg-lightGradient dark:bg-darkGradient'>
			<div className='self-start mx-5 mt-2'>
				<Button
					onClick={() => {
						navigate('/edit');
					}}
				>
					Anuluj
				</Button>
			</div>

			<Form
				buttonContent='Zaktualizuj dane pokemona'
				onSubmit={handleSubmit(onSubmit)}
			>
				<h3 className='self-center my-4 font-semibold text-xl md:text-2xl dark:text-white'>
					Dodaj lub zaktualizuj Pokemona
				</h3>
				<Input
					placeholder='Podaj nazwę nowego pokemona'
					name='name'
					register={register}
					errors={errors.name}
					defaultValue={matchedPokemon?.name}
				/>
				<Input
					placeholder='Podaj wagę nowego pokemona'
					name='weight'
					register={register}
					errors={errors.weight}
					type='number'
					defaultValue={matchedPokemon?.weight}
				/>
				<Input
					placeholder='Podaj wzrost nowego pokemona'
					name='height'
					register={register}
					errors={errors.height}
					type='number'
					defaultValue={matchedPokemon?.height}
				/>
				<Input
					placeholder='Podaj doświadczenie nowego pokemona'
					name='base_experience'
					register={register}
					errors={errors.base_experience}
					type='number'
					defaultValue={matchedPokemon?.base_experience}
				/>

				<div className='flex items-center self-center'>
					{matchedPokemon?.imageUrl ||
					matchedPokemon?.sprites?.front_default ? (
						<img
							className='h-36 mx-4'
							src={
								matchedPokemon?.imageUrl ||
								matchedPokemon?.sprites?.front_default
							}
							alt='Pokemon'
						/>
					) : (
						<div className='h-36 mx-4'>
							<Loader />
						</div>
					)}
				</div>
			</Form>
		</div>
	);
};

export default EditPokemonForm;
