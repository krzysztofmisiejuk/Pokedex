import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { enqueueSnackbar } from 'notistack';
import { useFetchData } from '../../../hooks/';
import { LoginContext } from '../../../context';
import { Input, Form, SectionHeader } from '../../shared';

const LoginDashboard = () => {
	const { setIsLoggedIn, setLoggedUserName } = useContext(LoginContext);
	const { data } = useFetchData('http://localhost:3000/users');
	const navigate = useNavigate();

	const loginSchema = z.object({
		userName: z.string().min(1, { message: 'Nazwa użytkownika jest wymagana' }),
		password: z.string().min(1, { message: 'Hasło jest wymagane' }),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: zodResolver(loginSchema) });

	const checkLogin = (inputData) => {
		const isValidLogin = data.find(
			({ userName, password }) =>
				inputData.userName.trim() === userName &&
				inputData.password.trim() === password
		);

		if (isValidLogin) {
			enqueueSnackbar('Nastąpiło poprawne zalogowanie', {
				variant: 'success',
			});
			navigate('/');
			setIsLoggedIn(true);
			setLoggedUserName(inputData.userName);
			return;
		}
		enqueueSnackbar('Niepoprawny login lub hasło', { varinat: 'error' });
	};

	return (
		<>
			<Form
				buttonContent='Zaloguj'
				onSubmit={handleSubmit(checkLogin)}
			>
				<SectionHeader headerText='Zaloguj się do Pokedex!' />
				<Input
					name={'userName'}
					placeholder={'Nazwa użytkownika'}
					register={register}
					errors={errors.userName}
				/>
				<Input
					type={'password'}
					name={'password'}
					placeholder={'Hasło'}
					register={register}
					errors={errors.password}
				/>
			</Form>
		</>
	);
};

export default LoginDashboard;
