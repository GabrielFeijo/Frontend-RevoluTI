import Image from 'next/image';

import { ModeToggle } from './mode-toggle';

const Header = () => {
    return (
        <header className='flex w-full justify-between p-4 shadow-md'>
            <Image src='/logo.svg' alt='logo' width={90} height={40} />

            <ModeToggle />
        </header>
    );
};

export default Header;
