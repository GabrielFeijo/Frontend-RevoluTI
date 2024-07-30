import Address from '@/interfaces/address';
import { ChevronRightIcon, Loader2 } from 'lucide-react';

type SearchHistoryProps = {
	history: Address[];
	isLoading: boolean;
	handleHistoryItemClick: (item: string) => void;
};

const SearchHistory: React.FC<SearchHistoryProps> = ({
	history,
	isLoading,
	handleHistoryItemClick,
}) => {
	return (
		<section>
			<div className='my-2 gap-2 flex  items-center text-card-foreground'>
				<h2 className='text-lg font-bold'>Search History</h2>
				{isLoading && <Loader2 className='animate-spin size-5' />}
			</div>

			{isLoading ? (
				<p className='text-muted-foreground'>Loading search history...</p>
			) : history.length > 0 ? (
				<div className='max-h-72 overflow-y-auto'>
					<ul className='space-y-2'>
						{history.map((address, index) => (
							<li
								key={index}
								className='bg-muted/20 p-2 rounded-md text-card-foreground cursor-pointer flex items-center'
								onClick={() => handleHistoryItemClick(address.id)}
							>
								<ChevronRightIcon className='size-4 mr-2' />
								{address.street}
							</li>
						))}
					</ul>
				</div>
			) : (
				<p className='text-muted-foreground'>No search history yet.</p>
			)}
		</section>
	);
};

export default SearchHistory;
