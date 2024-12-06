import { Card } from './components';

const Cards = ({  filteredData, info }) => {

	return (
		<div>
			<div className='my-8 flex justify-center flex-wrap gap-6'>
				{filteredData.length > 0 ? (
					filteredData.map((result) => (
						<Card
							key={result.name}
							name={result.name}
						/>
					))
				) : (
					<p>{info}</p>
				)}
			</div>
		</div>
	);
};

export default Cards;
