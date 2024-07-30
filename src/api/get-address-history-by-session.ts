import Address from '@/interfaces/address';
import { api } from '@/lib/axios';

export async function getAddressHistoryBySessionId({
    sessionId,
}: {
    sessionId: string;
}) {
    const response = await api.get<Address[]>(`/address/session/${sessionId}`);
    return response.data;
}
