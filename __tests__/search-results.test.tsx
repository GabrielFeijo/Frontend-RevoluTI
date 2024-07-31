import { render, screen } from '@testing-library/react';

import SearchResults from '@/components/search-results';
import Address from '@/interfaces/address';

import '@testing-library/jest-dom';

const mockResults: Address[] = [
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

describe('SearchResults Component', () => {
    it('should display the heading correctly', () => {
        render(<SearchResults results={[]} />);

        expect(
            screen.getByText('Últimos resultados da pesquisa'),
        ).toBeInTheDocument();
    });

    it('should display no results message when results are empty', () => {
        render(<SearchResults results={[]} />);

        expect(
            screen.getByText('Nenhum resultado de pesquisa ainda.'),
        ).toBeInTheDocument();
    });

    it('should display search results correctly', () => {
        render(<SearchResults results={mockResults} />);

        expect(screen.getByText('Rua Exemplo 1')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Cidade Exemplo 1, Estado Exemplo 1 12345-678 Brasil',
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('Rua Exemplo 2')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Cidade Exemplo 2, Estado Exemplo 2 87654-321 Brasil',
            ),
        ).toBeInTheDocument();
    });

    it('should render the correct number of results', () => {
        render(<SearchResults results={mockResults} />);

        const items = screen.getAllByRole('listitem');
        expect(items).toHaveLength(mockResults.length);
    });
});
