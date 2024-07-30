'use client';

import HistoryDetailModal from '@/components/history-detail-modal';
import SearchHistory from '@/components/search-history';
import SearchForm from '@/components/search-form';
import isPostalCode from 'validator/lib/isPostalCode';
import SearchResults from '@/components/search-results';
import Address from '@/interfaces/address';
import { useState } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';
import { useSession } from '@/contexts/SessionContext';
import { createAddress } from '@/api/create-address';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAddressHistoryBySessionId } from '@/api/get-address-history-by-session';

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

			queryClient.setQueryData(['address-history'], (oldData: Address[]) => {
				return [newAddress, ...oldData];
			});

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
		<main className='flex flex-col items-center justify-center  h-[calc(100vh-4.5rem)]'>
			<div className='w-full max-w-md p-6 bg-card rounded-lg shadow-lg'>
				<h1 className='text-2xl font-bold mb-4 text-card-foreground'>
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
