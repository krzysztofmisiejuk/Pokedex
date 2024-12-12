import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { enqueueSnackbar } from 'notistack';
import { useFetchData } from '../../../hooks/useFetchData';
import { Form, Input, SectionHeader } from '../../shared';

const SingUpDashboard = () => {
	const navigate = useNavigate();
	const { data: usersData } = useFetchData('http://localhost:3000/users');

	const singUpSchema = z
		.object({
			name: z
				.string()
				.min(1, { message: 'Imię jest wymagane' })
				.min(3, { message: 'Imię musi zawierać przynajmniej 3 znaki' }),
			userName: z
				.string()
				.min(1, { message: 'Nazwa użytkownika jest wymagana' })
				.min(3, {
					message: 'Nazwa użytkownika musi zawierać przynajmniej 3 znaki',
				}),
			email: z
				.string()
				.min(1, { message: 'E-mail jest wymagany' })
				.email({ message: 'Podaj poprawny adres e-mail' }),
			password: z
				.string()
				.min(1, { message: 'Hasło jest wymagane' })
				.min(8, { message: 'Hasło musizawierać minumum 8 znaków' })
				.regex(/[A-Z]/, {
					message: 'Hasło musi zawierać przynajmniej 1 dużą literę',
				})
				.regex(/[0-9]/, { message: 'Hasło musi zawierać przynajmniej 1 cyfrę' })
				.regex(/[!@#$%^&*(),.?":{}|<>]/, {
					message:
						'Hasło musi zawierać przynajmniej 1 znak specjalny(!@#$%^&*(),.?":{}|<>)',
				}),
			confirmPassword: z.string().min(1, { message: 'Powtórz hasło' }),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: 'Podane hasła nie są takie same',
			path: ['confirmPassword'],
		});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: zodResolver(singUpSchema) });

	const sendUserData = async (data) => {
		try {
			await fetch(`http://localhost:3000/users`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
		} catch (error) {
			console.error('ERROR:', error);
		}
		enqueueSnackbar(
			'Dzękujemy za rejerstrację w pokedex! Możesz zalogować się na swoje konto!',
			{ varinat: 'success' }
		);
		navigate('/login');
	};

	const compareExistData = (data) => {
		const compareUserName = usersData.some(
			(userData) => userData.userName === data.userName
		);
		const compareUserEmail = usersData.some(
			(userData) => userData.email === data.email
		);

		if (!compareUserName && !compareUserEmail) {
			sendUserData(data);
			return;
		}
		compareUserName &&
			enqueueSnackbar(
				'Użytkownik o takiej nazwie istnieje już w naszej bazie danych, proszę wybrać inną nazwę użytkownika.',
				{ varinat: 'error' }
			);
		compareUserEmail &&
			enqueueSnackbar(
				'Użytkownik z takim adresem e-mail istnieje już w naszej bazie danych, proszę wprowadzić inny adres e-mail.',
				{ varinat: 'error' }
			);
	};

	return (
		<Form
			buttonContent='Zarejerstruj się'
			onSubmit={handleSubmit(compareExistData)}
		>
			<SectionHeader headerText='Nie masz jeszcze konta w Pokedex? Zajerestruj się!' />
			<Input
				placeholder='Imię'
				name='name'
				register={register}
				errors={errors.name}
			/>
			<Input
				placeholder='Nazwa użytkownika'
				name='userName'
				register={register}
				errors={errors.userName}
			/>
			<Input
				placeholder='E-mail'
				type='email'
				name='email'
				register={register}
				errors={errors.email}
			/>
			<Input
				placeholder='Hasło'
				type='password'
				name='password'
				register={register}
				errors={errors.password}
			/>
			<Input
				placeholder='Powtórz hasło'
				type='password'
				name='confirmPassword'
				register={register}
				errors={errors.confirmPassword}
			/>
		</Form>
	);
};

export default SingUpDashboard;
