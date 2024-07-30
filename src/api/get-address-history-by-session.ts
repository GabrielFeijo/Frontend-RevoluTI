import axios, { AxiosError } from 'axios';

import Address from '@/interfaces/address';
import { api } from '@/lib/axios';

export async function getAddressHistoryBySessionId({
    sessionId,
}: {
    sessionId: string;
}) {
    try {
        const response = await api.get<Address[]>(
            `/address/session/${sessionId}`,
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;

            switch (axiosError.response?.status) {
                case 404:
                    throw new Error('CEP não encontrado.');
                default:
                    throw new Error(axiosError.message || 'Algo deu errado.');
            }
        }
        throw new Error('Erro inesperado ocorreu.');
    }
}
