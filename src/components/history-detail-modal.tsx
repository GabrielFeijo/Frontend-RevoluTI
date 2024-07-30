import Link from 'next/link';

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
        <div className='fixed inset-0 flex items-center justify-center bg-black/50'>
            <div className='w-full max-w-md space-y-3 rounded-lg bg-card p-6 shadow-lg dark:shadow-white/5'>
                <h2 className='text-2xl font-bold text-card-foreground'>
                    Detalhes para {selectedItem.street}
                </h2>

                <div className='rounded-md bg-muted/20 p-2 text-card-foreground'>
                    <p className='font-medium'>{selectedItem.street}</p>
                    <p className='text-muted-foreground'>
                        {selectedItem.city}, {selectedItem.state}{' '}
                        {selectedItem.postalCode} {selectedItem.country}
                    </p>

                    <div className='mt-2'>
                        <Link
                            href={`https://www.google.com/maps/search/?api=1&query=${selectedItem.postalCode}
                    `}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='mt-4 text-[#1a73e8] hover:underline'
                        >
                            Ver no mapa
                        </Link>
                    </div>
                </div>

                <div className='flex items-center justify-between'>
                    <p className='text-xs text-muted-foreground'>
                        {new Date(selectedItem.createdAt).toLocaleString(
                            'pt-BR',
                        )}
                    </p>
                    <Button variant='outline' onClick={closeModal}>
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HistoryDetailModal;
