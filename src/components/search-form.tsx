import { withMask } from 'use-mask-input';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type SearchInputProps = {
    handleSubmit: (data: FormData) => void;
};

const SearchForm: React.FC<SearchInputProps> = ({ handleSubmit }) => {
    return (
        <form className='mb-6 flex items-center' action={handleSubmit}>
            <Input
                type='text'
                name='postalCode'
                placeholder='Enter a postal code or address'
                ref={withMask('99999-999')}
                className='mr-4 flex-1 border-card-foreground/20 bg-card text-card-foreground'
            />
            <Button type='submit'>Search</Button>
        </form>
    );
};

export default SearchForm;
