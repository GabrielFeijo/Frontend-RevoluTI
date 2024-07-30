import { Button } from '@/components/ui/button';
import Address from '@/interfaces/address';

type HistoryDetailModalProps = {
	selectedItem: Address | null;
	closeModal: () => void;
};

const HistoryDetailModal: React.FC<HistoryDetailModalProps> = ({
	selectedItem,
	closeModal,
}) => {
	if (!selectedItem) return null;

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'>
			<div className='bg-card p-6 rounded-lg shadow-lg w-full max-w-md'>
				<h2 className='text-2xl font-bold mb-4 text-card-foreground'>
					Detalhes para {selectedItem.street}
				</h2>
				<div className='bg-muted/20  rounded-md text-card-foreground'>
					<p className='font-medium'>{selectedItem.street}</p>
					<p className='text-muted-foreground'>
						{selectedItem.city}, {selectedItem.state} {selectedItem.postalCode}{' '}
						{selectedItem.country}
					</p>
				</div>
				<div className='mt-4 flex justify-end'>
					<Button
						variant='outline'
						onClick={closeModal}
					>
						Close
					</Button>
				</div>
			</div>
		</div>
	);
};

export default HistoryDetailModal;
