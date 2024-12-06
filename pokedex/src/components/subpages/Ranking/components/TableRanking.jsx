const RankingTable = ({keysTable, handleSort, tableData}) => {
return(	<table className='mt-6'>
		<thead className=' bg-customDark text-white '>
			<tr>
				{keysTable.map((key) => {
					if (key === 'img') {
						return;
					}
					return (
						<th
							key={key}
							onClick={() => handleSort(key)}
							className='group cursor-pointer opacity-60 hover:opacity-100'
						>
							<p className='p-1'>
								{key === 'id'
									? '#'
									: key.charAt(0).toUpperCase() + key.slice(1)}
							</p>

							<div className='invisible group-hover:visible flex justify-center p-1'>
								<img
									className='h-4 w-3'
									src='./src/icons/arrow-up.png'
								/>
								<img
									className='h-4 w-3'
									src='./src/icons/arrow-down.png'
								/>
							</div>
						</th>
					);
				})}
			</tr>
		</thead>
		<tbody className='divide-y divide-customGrey'>
			{tableData.map((pokemon) => (
				<tr key={pokemon.name}>
					<td>{pokemon.id}</td>
					<td className='flex items-center justify-center flex-wrap gap-2'>
						<img
							src={pokemon.img}
							alt={`${pokemon.name} img`}
							className='w-16 h-16 self-center'
						/>
						<span className='w-14'>{pokemon.name}</span>
					</td>
					<td>{pokemon.height}</td>
					<td>{pokemon.weight}</td>
					<td>{pokemon.exp}</td>
					<td>{pokemon.wins}</td>
					<td>{pokemon.loses}</td>
				</tr>
			))}
		</tbody>
	</table>)
};

export default RankingTable;
