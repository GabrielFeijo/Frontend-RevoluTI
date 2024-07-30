import { Loader2 } from 'lucide-react';
import { withMask } from 'use-mask-input';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type SearchInputProps = {
    handleSubmit: (data: FormData) => void;
    isLoading: boolean;
};

const SearchForm: React.FC<SearchInputProps> = ({
    handleSubmit,
    isLoading,
}) => {
    return (
        <form className='flex items-center gap-4' action={handleSubmit}>
            <Input
                type='text'
                name='postalCode'
                placeholder='Insira um código postal'
                ref={withMask('99999-999')}
                className='flex-1 border-card-foreground/20 bg-card text-card-foreground'
            />
            <Button type='submit' className='flex gap-2' disabled={isLoading}>
                <span>Buscar</span>
                {isLoading && <Loader2 className='size-4 animate-spin' />}
            </Button>
        </form>
    );
};

export default SearchForm;
