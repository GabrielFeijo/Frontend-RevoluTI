import { fireEvent, render, screen } from '@testing-library/react';

import ConfirmModal from '@/components/confirm-modal';

import '@testing-library/jest-dom';

describe('ConfirmModal Component', () => {
    it('should render the confirmation dialog with title and description', () => {
        const handleDeleteHistoryItem = jest.fn();
        const setShowConfirmModal = jest.fn();

        render(
            <ConfirmModal
                showConfirmModal={true}
                setShowConfirmModal={setShowConfirmModal}
                handleDeleteHistoryItem={handleDeleteHistoryItem}
            />,
        );

        expect(
            screen.getByText('Você tem certeza absoluta?'),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'Esta ação não pode ser desfeita. Isso excluirá permanentemente o endereço da sua lista de histórico.',
            ),
        ).toBeInTheDocument();
    });

    it('should call handleDeleteHistoryItem when Continue button is clicked', () => {
        const handleDeleteHistoryItem = jest.fn();
        const setShowConfirmModal = jest.fn();

        render(
            <ConfirmModal
                showConfirmModal={true}
                setShowConfirmModal={setShowConfirmModal}
                handleDeleteHistoryItem={handleDeleteHistoryItem}
            />,
        );

        const continueButton = screen.getByText('Continuar');
        fireEvent.click(continueButton);

        expect(handleDeleteHistoryItem).toHaveBeenCalled();
    });

    it('should call setShowConfirmModal with false when Cancel button is clicked', () => {
        const handleDeleteHistoryItem = jest.fn();
        const setShowConfirmModal = jest.fn();

        render(
            <ConfirmModal
                showConfirmModal={true}
                setShowConfirmModal={setShowConfirmModal}
                handleDeleteHistoryItem={handleDeleteHistoryItem}
            />,
        );

        const cancelButton = screen.getByText('Cancelar');
        fireEvent.click(cancelButton);

        expect(setShowConfirmModal).toHaveBeenCalledWith(false);
    });
});
