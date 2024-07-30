import axios, { AxiosError } from 'axios';

import Address from '@/interfaces/address';
import { api } from '@/lib/axios';

export async function deleteAddress({ id }: { id: string }): Promise<Address> {
    try {
        const response = await api.delete<Address>(`/delete-address/${id}`);
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
