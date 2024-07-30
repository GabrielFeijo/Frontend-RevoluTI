import React from 'react';
import { ModeToggle } from './mode-toggle';
import Image from 'next/image';

const Header = () => {
	return (
		<header className='flex justify-between w-full p-4 shadow-md '>
			<Image
				src='/logo.svg'
				alt='logo'
				width={90}
				height={40}
			/>

			<ModeToggle />
		</header>
	);
};

export default Header;
