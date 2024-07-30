import axios, { AxiosError } from 'axios';

import Address from '@/interfaces/address';
import { api } from '@/lib/axios';

export async function createAddress(data: {
    cep: string;
    sessionId: string;
}): Promise<Address> {
    try {
        const response = await api.post<Address>(
            '/create-address-by-cep',
            data,
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;

            switch (axiosError.response?.status) {
                case 409:
                    throw new Error(
                        'Endereço com este ID de sessão e CEP já existe.',
                    );
                case 404:
                    throw new Error('CEP não encontrado.');
                default:
                    throw new Error(axiosError.message || 'Algo deu errado.');
            }
        }
        throw new Error('Erro inesperado ocorreu.');
    }
}
