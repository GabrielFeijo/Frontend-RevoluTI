import { fireEvent, render, screen } from '@testing-library/react';

import HistoryDetailModal from '@/components/history-detail-modal';
import Address from '@/interfaces/address';

import '@testing-library/jest-dom';

const mockAddress: Address = {
    id: '4cd59115-6981-4610-8cba-e895a2357916',
    street: 'Rua Exemplo',
    city: 'Cidade Exemplo',
    state: 'Estado Exemplo',
    postalCode: '12345-678',
    country: 'Brasil',
    createdAt: new Date(),
    updatedAt: new Date(),
};

describe('HistoryDetailModal Component', () => {
    it('should display the details of the selected address', () => {
        render(
            <HistoryDetailModal
                selectedItem={mockAddress}
                closeModal={jest.fn()}
                handleDeleteHistoryItem={jest.fn()}
            />,
        );

        expect(
            screen.getByText('Detalhes para Rua Exemplo'),
        ).toBeInTheDocument();
        expect(screen.getByText('Rua Exemplo')).toBeInTheDocument();
        expect(
            screen.getByText('Cidade Exemplo, Estado Exemplo 12345-678 Brasil'),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                new Date(mockAddress.createdAt).toLocaleString('pt-BR'),
            ),
        ).toBeInTheDocument();
    });

    it('should call closeModal when the Close button is clicked', () => {
        const closeModal = jest.fn();

        render(
            <HistoryDetailModal
                selectedItem={mockAddress}
                closeModal={closeModal}
                handleDeleteHistoryItem={jest.fn()}
            />,
        );

        const closeButton = screen.getByText('Fechar');
        fireEvent.click(closeButton);

        expect(closeModal).toHaveBeenCalled();
    });

    it('should toggle the confirmation modal when the Delete button is clicked', () => {
        render(
            <HistoryDetailModal
                selectedItem={mockAddress}
                closeModal={jest.fn()}
                handleDeleteHistoryItem={jest.fn()}
            />,
        );

        const deleteButton = screen.getByText('Deletar');
        fireEvent.click(deleteButton);

        expect(
            screen.getByText('Você tem certeza absoluta?'),
        ).toBeInTheDocument();

        const cancelButton = screen.getByText('Cancelar');
        fireEvent.click(cancelButton);

        expect(
            screen.queryByText('Você tem certeza absoluta?'),
        ).not.toBeInTheDocument();
    });

    it('should call handleDeleteHistoryItem when the Continue button in ConfirmModal is clicked', () => {
        const handleDeleteHistoryItem = jest.fn();

        render(
            <HistoryDetailModal
                selectedItem={mockAddress}
                closeModal={jest.fn()}
                handleDeleteHistoryItem={handleDeleteHistoryItem}
            />,
        );

        const deleteButton = screen.getByText('Deletar');
        fireEvent.click(deleteButton);

        const continueButton = screen.getByText('Continuar');
        fireEvent.click(continueButton);

        expect(handleDeleteHistoryItem).toHaveBeenCalled();
    });
});
