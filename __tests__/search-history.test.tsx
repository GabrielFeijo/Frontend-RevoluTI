import { fireEvent, render, screen } from '@testing-library/react';

import SearchHistory from '@/components/search-history';
import Address from '@/interfaces/address';

import '@testing-library/jest-dom';

const mockHistory: Address[] = [
    {
        id: '1',
        street: 'Rua Exemplo 1',
        city: 'Cidade Exemplo 1',
        state: 'Estado Exemplo 1',
        postalCode: '12345-678',
        country: 'Brasil',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '2',
        street: 'Rua Exemplo 2',
        city: 'Cidade Exemplo 2',
        state: 'Estado Exemplo 2',
        postalCode: '87654-321',
        country: 'Brasil',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

describe('SearchHistory Component', () => {
    it('should display the heading and loader correctly', () => {
        render(
            <SearchHistory
                history={[]}
                isLoading={true}
                handleHistoryItemClick={jest.fn()}
            />,
        );

        expect(screen.getByText('Histórico de pesquisa')).toBeInTheDocument();
    });

    it('should display loading message when isLoading is true', () => {
        render(
            <SearchHistory
                history={[]}
                isLoading={true}
                handleHistoryItemClick={jest.fn()}
            />,
        );

        expect(
            screen.getByText('Carregando histórico de pesquisa ...'),
        ).toBeInTheDocument();
    });

    it('should display no history message when history is empty and not loading', () => {
        render(
            <SearchHistory
                history={[]}
                isLoading={false}
                handleHistoryItemClick={jest.fn()}
            />,
        );

        expect(
            screen.getByText('Nenhum histórico de pesquisa ainda.'),
        ).toBeInTheDocument();
    });

    it('should display search history items correctly when history is not empty', () => {
        render(
            <SearchHistory
                history={mockHistory}
                isLoading={false}
                handleHistoryItemClick={jest.fn()}
            />,
        );

        expect(screen.getByText('Rua Exemplo 1')).toBeInTheDocument();
        expect(screen.getByText('Rua Exemplo 2')).toBeInTheDocument();
    });

    it('should call handleHistoryItemClick when a history item is clicked', () => {
        const handleHistoryItemClick = jest.fn();
        render(
            <SearchHistory
                history={mockHistory}
                isLoading={false}
                handleHistoryItemClick={handleHistoryItemClick}
            />,
        );

        const firstItem = screen.getByText('Rua Exemplo 1');
        fireEvent.click(firstItem);

        expect(handleHistoryItemClick).toHaveBeenCalledWith('1');
    });

    it('should render the correct number of history items', () => {
        render(
            <SearchHistory
                history={mockHistory}
                isLoading={false}
                handleHistoryItemClick={jest.fn()}
            />,
        );

        const items = screen.getAllByRole('listitem');
        expect(items).toHaveLength(mockHistory.length);
    });
});
