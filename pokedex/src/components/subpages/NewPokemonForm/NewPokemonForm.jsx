import { useForm } from 'react-hook-form';
import { Button, Form, Input, Loader } from '../../shared';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useContext, useState, useEffect } from 'react';
import { useFetchData } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import clsx from 'clsx';
import { EditContext } from '../../../context';

const NewPokemonForm = () => {
	const [imgId, setImgId] = useState(151);
	const [isImgMatch, setIsImgMatch] = useState(false);
	const { newPokemons, fetchNewPokemons } = useContext(EditContext);
	const { data, isLoading, error } = useFetchData(
		`https://pokeapi.co/api/v2/pokemon/${imgId}`
	);
	const navigate = useNavigate();

	const newPokemonSchema = z.object({
		name: z.string().min(1, { message: 'Musisz wpisać nazwę nowego pokemona' }),
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
	} = useForm({ resolver: zodResolver(newPokemonSchema) });

	const sendNewPokemon = async (formData) => {
		const pokemonData = {
			...formData,
			imgId,
			pokemonId: imgId,
			imageUrl: data.sprites.front_default,
		};

		try {
			const response = await fetch('http://localhost:3000/newPokemons', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(pokemonData),
			});

			if (!response.ok) {
				throw new Error('Nie udało się wysłać danych');
			}
			fetchNewPokemons();
		} catch (error) {
			console.error('Błąd wysyłania danych:', error);
		}

		navigate('/');
		enqueueSnackbar({
			message: `${formData?.name.charAt(0).toUpperCase()}${formData?.name
				.slice(1)
				.toLowerCase()} został dodany do listy pokemonów`,
			variant: 'success',
		});
	};

	const onSubmit = (data) => {
		if (isImgMatch) {
			enqueueSnackbar({
				message:
					'Zdjęcie zostało już przypisane do innego pokemona, porosze wybrać inne!',
				variant: 'error',
			});
			return;
		}
		sendNewPokemon(data);
	};

	const prevImg = (e) => {
		e.preventDefault();
		if (imgId > 151) {
			setImgId(imgId - 1);
		}
	};
	const nextImg = (e) => {
		e.preventDefault();
		setImgId(imgId + 1);
	};

	useEffect(() => {
		if (newPokemons.length > 0) {
			const match = newPokemons.some((pokemon) => pokemon.imgId === imgId);
			setIsImgMatch(match);
		}
	}, [newPokemons, imgId]);

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
				buttonContent='Dodaj nowego pokemona!'
				onSubmit={handleSubmit(onSubmit)}
			>
				<h3 className='self-center my-4 font-semibold text-xl md:text-2xl dark:text-white'>
					Dodaj nowego Pokemona
				</h3>
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
					type='number'
				/>
				<Input
					placeholder='Podaj wzrost nowego pokemona'
					name='height'
					register={register}
					errors={errors.height}
					type='number'
				/>
				<Input
					placeholder='Podaj doświadczenie nowego pokemona'
					name='base_experience'
					register={register}
					errors={errors.base_experience}
					type='number'
				/>

				<p className='self-center dark:text-white'>Wybierz zdjęcie</p>
				<div className='flex items-center self-center'>
					{error && (
						<p className='py-8 text-customRed'>
							Wystąpił błąd pobierania danych!
						</p>
					)}
					<button
						className='h-12 bg-customDark hover:bg-customLightGrey rounded disabled:opacity-50 disabled:hover:bg-darkBg shadow-customShadow'
						type='button'
						onClick={prevImg}
						disabled={imgId <= 151}
					>
						<img
							src='./src/icons/arrow-left.png'
							alt='arrow-left'
						/>
					</button>
					{data && !isLoading ? (
						<img
							className={clsx('h-36 mx-4', isImgMatch && 'opacity-20')}
							src={data.sprites.front_default}
							alt='new Pokemon image'
						/>
					) : (
						<div className='h-36 mx-4'>
							<Loader />
						</div>
					)}
					<button
						className='h-12 bg-customDark hover:bg-customLightGrey rounded shadow-customShadow'
						onClick={nextImg}
					>
						<img
							src='./src/icons/arrow-right.png'
							alt='arrow-right'
						/>
					</button>
				</div>
			</Form>
		</div>
	);
};

export default NewPokemonForm;
