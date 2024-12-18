import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { enqueueSnackbar } from 'notistack';
import { EditContext, PokemonContext, StatsContext } from '../../../context';
import { Button, Form, Input, Loader } from '../../shared';

const EditPokemonForm = () => {
	const { newPokemons, fetchNewPokemons } = useContext(EditContext);
	const { pokemonsDetails } = useContext(PokemonContext);
	const { stats } = useContext(StatsContext);
	const [matchedPokemon, setMatchedPokemon] = useState(null);
	const navigate = useNavigate();
	const { name: pokemonName } = useParams();

	const isExistStat = stats.find(
		(stat) => stat.name.toLowerCase() === pokemonName.toLowerCase()
	);

	const newPokemonSchema = z.object({
		name: z.string().optional(),
		weight: z.string().optional(),
		height: z.string().optional(),
		base_experience: z.string().optional(),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(newPokemonSchema),
	});

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
				const findPokemon =
					combinedPokemons.find(
						({ name }) => name?.toLowerCase() === pokemonName?.toLowerCase()
					) ||
					newPokemons.find(
						({ name }) => name?.toLowerCase() === pokemonName?.toLowerCase()
					);

				setMatchedPokemon(findPokemon);
			}
		}
	}, [pokemonsDetails, newPokemons, pokemonName]);

	const updatePokemon = async (formData) => {
		const pokemonData = {
			...formData,
			name: formData.name?.trim() || matchedPokemon?.name,
			imageUrl: matchedPokemon?.imageUrl,
			pokemonId: matchedPokemon.id
				? matchedPokemon.id
				: matchedPokemon.pokemonId,
			weight: formData.weight === '' ? String(matchedPokemon?.weight) : formData.weight,
			height: formData.height === '' ? String(matchedPokemon?.height) : formData.height,
			base_experience:
				formData.base_experience === ''
					? String(matchedPokemon?.base_experience)
					: formData.base_experience,
		};

		try {
			const existingPokemon = newPokemons.find(
				(pokemon) =>
					pokemon?.name?.toLowerCase() === pokemonData?.name?.toLowerCase()
			);
			if (existingPokemon) {
				const response = await fetch(
					`http://localhost:3000/newPokemons/${existingPokemon.id}`,
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
					message: `${pokemonName} został zaktualizowany`,
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
					message: `${pokemonName} został dodany do listy pokemonów`,
					variant: 'success',
				});
			}

			fetchNewPokemons();
		} catch (error) {
			console.error('Błąd wysyłania danych:', error);
		}

		navigate('/');
	};

	const onSubmit = (data) => {
		updatePokemon(data);
	};

	return (
		<div className='flex flex-col items-center justify-center size-full bg-lightGradient dark:bg-darkGradient'>
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
					Edytuj Pokemona
				</h3>
				<Input
					placeholder='Edytuj nazwę pokemona'
					name='name'
					register={register}
					errors={errors.name}
					defaultValue={matchedPokemon?.name}
				/>
				<Input
					placeholder='Edytuj wagę pokemona'
					name='weight'
					register={register}
					errors={errors.weight}
					type='number'
					defaultValue={matchedPokemon?.weight}
				/>
				<Input
					placeholder='Edytuj wzrost pokemona'
					name='height'
					register={register}
					errors={errors.height}
					type='number'
					defaultValue={matchedPokemon?.height}
				/>
				<Input
					placeholder='Edytuj doświadczenie pokemona'
					name='base_experience'
					register={register}
					errors={errors.base_experience}
					type='number'
					defaultValue={
						isExistStat && matchedPokemon
							? (
									Number(matchedPokemon?.base_experience || 0) +
									isExistStat.newExp
							  ).toString()
							: matchedPokemon?.base_experience
					}
				/>

				<div className='self-center flex items-center'>
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
