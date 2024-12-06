import { Button } from '../../Button';

const Pagination = ({ page, setPage, totalPages }) => {
	const handlePrevPage = () => {
		if (page > 0) {
			setPage(page - 1);
		}
	};

	const handleNextPage = () => {
		if (page < totalPages - 1) {
			setPage(page + 1);
		}
	};

	return (
		<div className='flex flex-col items-center'>
			<span className='text-md lg:text-xl '>
				<span className='font-semibold'>
					{' '}
					Strona
					<select
						className='ml-2 bg-transparent border border-customDark rounded dark:border-customLightGrey'
						value={page}
						onChange={(e) => setPage(Number(e.target.value))}
					>
						{Array.from({ length: totalPages }, (_, index) => (
							<option
								className='text-customDark'
								key={index + 1}
								value={index}
							>
								{index + 1}
							</option>
						))}
					</select>
				</span>{' '}
				z <span className='font-semibold'>{totalPages}</span>
			</span>

			<div className='inline-flex mt-2 xs:mt-0 gap-x-1'>
				<Button onClick={handlePrevPage}>
					<img
						src='./src/icons/arrow-left.png'
						alt='arrow-left'
						className='h-7'
					/>
				</Button>
				<Button onClick={handleNextPage}>
					<img
						src='./src/icons/arrow-right.png'
						alt='arrow-left'
						className='h-7'
					/>
				</Button>
			</div>
		</div>
	);
};

export default Pagination;
