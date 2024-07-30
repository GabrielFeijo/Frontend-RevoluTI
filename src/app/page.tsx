'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import isPostalCode from 'validator/lib/isPostalCode';
import { z } from 'zod';

import { createAddress } from '@/api/create-address';
import { getAddressHistoryBySessionId } from '@/api/get-address-history-by-session';
import HistoryDetailModal from '@/components/history-detail-modal';
import SearchForm from '@/components/search-form';
import SearchHistory from '@/components/search-history';
import SearchResults from '@/components/search-results';
import { useSession } from '@/contexts/SessionContext';
import Address from '@/interfaces/address';

const formSchema = z.object({
    postalCode: z.string().refine((val) => isPostalCode(val, 'BR'), {
        message: 'Invalid postal code',
    }),
});

export default function Home() {
    const queryClient = useQueryClient();

    const { sessionId } = useSession();

    const [searchResults, setSearchResults] = useState<Address[]>([]);

    const [selectedHistoryItem, setSelectedHistoryItem] =
        useState<Address | null>(null);

    const { data: searchHistory, isLoading: isLoadingHistory } = useQuery({
        queryKey: ['address-history'],
        queryFn: () =>
            getAddressHistoryBySessionId({ sessionId: sessionId as string }),
        enabled: !!sessionId,
    });

    const handleSubmit = async (data: FormData) => {
        try {
            if (!sessionId) return null;

            const formData = Object.fromEntries(data.entries());

            const response = formSchema.safeParse(formData);

            if (!response.success) {
                return toast.error('O CEP é inválido!');
            }

            const newAddress = await createAddress({
                cep: response.data?.postalCode as string,
                sessionId,
            });

            queryClient.setQueryData(
                ['address-history'],
                (oldData: Address[]) => {
                    return [newAddress, ...oldData];
                },
            );

            setSearchResults([newAddress]);

            toast.success('Endereço adicionado com sucesso!');
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    const handleHistoryItemClick = (id: string) => {
        const address = searchHistory?.find((item) => item.id === id);

        if (!address) return;

        setSelectedHistoryItem(address);
    };

    const closeModal = () => {
        setSelectedHistoryItem(null);
    };

    return (
        <main className='flex h-[calc(100vh-4.5rem)] flex-col items-center justify-center'>
            <div className='w-full max-w-md rounded-lg bg-card p-6 shadow-lg'>
                <h1 className='mb-4 text-2xl font-bold text-card-foreground'>
                    Postal Code & Address Search
                </h1>
                <SearchForm handleSubmit={handleSubmit} />
                <SearchResults results={searchResults} />

                <SearchHistory
                    history={searchHistory || []}
                    isLoading={isLoadingHistory}
                    handleHistoryItemClick={handleHistoryItemClick}
                />
            </div>
            <HistoryDetailModal
                selectedItem={selectedHistoryItem}
                closeModal={closeModal}
            />
        </main>
    );
}
