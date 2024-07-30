import { ChevronRightIcon, Loader2 } from 'lucide-react';

import Address from '@/interfaces/address';

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
            <div className='my-2 flex items-center gap-2 text-card-foreground'>
                <h2 className='text-lg font-bold'>Histórico de pesquisa</h2>
                {isLoading && <Loader2 className='size-5 animate-spin' />}
            </div>

            {isLoading ? (
                <p className='text-muted-foreground'>
                    Carregando histórico de pesquisa ...
                </p>
            ) : history.length > 0 ? (
                <div className='max-h-72 overflow-y-auto'>
                    <ul className='space-y-2'>
                        {history.map((address, index) => (
                            <li
                                key={index}
                                className='flex cursor-pointer items-center rounded-md bg-muted/20 p-2 text-card-foreground'
                                onClick={() =>
                                    handleHistoryItemClick(address.id)
                                }
                            >
                                <ChevronRightIcon className='mr-2 size-4' />
                                {address.street}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className='text-muted-foreground'>
                    Nenhum histórico de pesquisa ainda.
                </p>
            )}
        </section>
    );
};

export default SearchHistory;
