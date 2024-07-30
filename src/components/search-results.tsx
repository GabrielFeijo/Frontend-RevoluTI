import Address from '@/interfaces/address';

type SearchResultsProps = {
	results: Address[];
};

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
	return (
		<section className='mb-6'>
			<h2 className='text-lg font-bold mb-2 text-card-foreground'>
				Last Search Results
			</h2>
			{results.length > 0 ? (
				<ul className='space-y-2'>
					{results.map((result) => (
						<li
							key={result.id}
							className='bg-muted/20 p-2 rounded-md text-card-foreground'
						>
							<div className='flex flex-col'>
								<p className='font-medium'>{result.street}</p>
								<p className='text-muted-foreground'>
									{result.city}, {result.state} {result.postalCode}{' '}
									{result.country}
								</p>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p className='text-muted-foreground'>No search results yet.</p>
			)}
		</section>
	);
};

export default SearchResults;
