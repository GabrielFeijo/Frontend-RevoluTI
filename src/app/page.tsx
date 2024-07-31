'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createAddress } from '@/api/create-address';
import { deleteAddress } from '@/api/delete-address';
import { getAddressHistoryBySessionId } from '@/api/get-address-history-by-session';
import HistoryDetailModal from '@/components/history-detail-modal';
import SearchForm from '@/components/search-form';
import SearchHistory from '@/components/search-history';
import SearchResults from '@/components/search-results';
import { useSession } from '@/contexts/SessionContext';
import Address from '@/interfaces/address';
import { formSchema } from '@/schemas/formSchema';

export default function Home() {
    const queryClient = useQueryClient();

    const { sessionId } = useSession();

    const [selectedHistoryItem, setSelectedHistoryItem] =
        useState<Address | null>(null);
    const [searchResults, setSearchResults] = useState<Address[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { data: searchHistory, isLoading: isLoadingHistory } = useQuery({
        queryKey: ['address-history'],
        queryFn: () =>
            getAddressHistoryBySessionId({ sessionId: sessionId as string }),
        enabled: !!sessionId,
    });

    const handleSubmit = (data: FormData) => {
        setIsLoading(true);

        if (!sessionId) {
            toast.error(
                'Sessão não encontrada. Por favor, recarregue a página.',
            );
            setIsLoading(false);
            return;
        }

        const formData = Object.fromEntries(data.entries());
        const response = formSchema.safeParse(formData);

        if (!response.success) {
            const errorMessage =
                response.error.format().postalCode?._errors.join(', ') ||
                'Erro de validação';
            toast.error(`Erro: ${errorMessage}`);
            setIsLoading(false);
            return;
        }

        createAddress({
            cep: response.data?.postalCode,
            sessionId,
        })
            .then((newAddress) => {
                queryClient.setQueryData(
                    ['address-history'],
                    (oldData: Address[] = []) => [newAddress, ...oldData],
                );
                setSearchResults([newAddress]);
                toast.success('Endereço adicionado com sucesso!');
            })
            .catch((error) => {
                if (error instanceof Error) {
                    toast.error(`Erro: ${error.message}`);
                } else {
                    toast.error('Ocorreu um erro inesperado.');
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleHistoryItemClick = (id: string) => {
        const address = searchHistory?.find((item) => item.id === id);
        if (address) {
            setSelectedHistoryItem(address);
        }
    };

    const closeModal = () => {
        setSelectedHistoryItem(null);
    };

    const handleDeleteHistoryItem = () => {
        if (!selectedHistoryItem) return;

        deleteAddress({
            id: selectedHistoryItem.id,
        })
            .then(() => {
                queryClient.setQueryData(
                    ['address-history'],
                    (oldData: Address[]) => {
                        return oldData?.filter(
                            (item) => item.id !== selectedHistoryItem.id,
                        );
                    },
                );
                closeModal();
                toast.success('Endereço excluído com sucesso!');
            })
            .catch((error) => {
                if (error instanceof Error) {
                    toast.error(`Erro: ${error.message}`);
                } else {
                    toast.error('Ocorreu um erro inesperado.');
                }
            });
    };

    return (
        <main className='flex h-[calc(100vh-4.5rem)] flex-col items-center justify-center'>
            <div className='w-full max-w-md space-y-4 rounded-lg bg-card p-6 shadow-lg dark:shadow-white/5'>
                <h1 className='text-2xl font-bold text-card-foreground'>
                    Postal Code & Address Search
                </h1>

                <SearchForm handleSubmit={handleSubmit} isLoading={isLoading} />
                <SearchResults results={searchResults} />

                <SearchHistory
                    history={searchHistory || []}
                    isLoading={isLoadingHistory}
                    handleHistoryItemClick={handleHistoryItemClick}
                />
            </div>
            <HistoryDetailModal
                handleDeleteHistoryItem={handleDeleteHistoryItem}
                selectedItem={selectedHistoryItem}
                closeModal={closeModal}
            />
        </main>
    );
}
