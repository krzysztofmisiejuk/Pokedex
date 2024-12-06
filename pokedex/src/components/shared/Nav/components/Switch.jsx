import { useContext } from 'react';
import { ThemeContext } from '../../../../context';


const Switch = () => {
	const { darkTheme, toggleTheme } = useContext(ThemeContext);

	const handleChange = () => {
		toggleTheme();
	};

	return (
		<div className='flex items-center'>
			<img
				src='./src/icons/sun.png'
				alt='theme symbol'
				className={` h-8 mr-1 ${darkTheme ? 'opacity-20' : 'opacity-100'}`}
			/>
			<label className='inline-flex items-center cursor-pointer'>
				<input
					type='checkbox'
					value=''
					className='sr-only peer'
					checked={darkTheme}
					onChange={handleChange}
				/>
				<div className="relative w-11 h-6 bg-customGrey peer-focus:outline-none peer-focus:ring-1 border-customDark peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-customDark"></div>
				<span className=' text-sm font-medium text-gray-900 dark:text-gray-300'></span>
			</label>
			<img
				src='/src/icons/moon.png '
				alt='theme symbol'
				className={`h-8 ml-1 ${darkTheme ? 'opacity-100' : 'opacity-20'}`}
			/>
		</div>
	);
};

export default Switch;
