import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { withMask } from 'use-mask-input';

type SearchInputProps = {
	handleSubmit: (data: FormData) => void;
};

const SearchForm: React.FC<SearchInputProps> = ({ handleSubmit }) => {
	return (
		<form
			className='flex items-center mb-6'
			action={handleSubmit}
		>
			<Input
				type='text'
				name='postalCode'
				placeholder='Enter a postal code or address'
				ref={withMask('99999-999')}
				className='flex-1 mr-4 bg-card border-card-foreground/20 text-card-foreground'
			/>
			<Button type='submit'>Search</Button>
		</form>
	);
};

export default SearchForm;
