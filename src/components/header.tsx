import Image from 'next/image';

import { ModeToggle } from './mode-toggle';

const Header = () => {
    return (
        <header className='flex w-full justify-between p-4 shadow-md dark:shadow-white/5'>
            <Image
                src='/logo.svg'
                alt='logo'
                width={90}
                height={40}
                className='dark:rounded-sm dark:bg-white dark:px-1'
            />

            <ModeToggle />
        </header>
    );
};

export default Header;
