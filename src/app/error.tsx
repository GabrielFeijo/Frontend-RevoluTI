'use client';
import Link from 'next/link';

export default function Error({
    error,
}: {
    error: Error & { digest?: string };
}) {
    return (
        <div className='flex h-[calc(100vh-4.5rem)] flex-1 flex-col items-center justify-center gap-2'>
            <h1 className='text-4xl font-bold'>Oh não, algo deu errado...</h1>
            <p className='text-accent-foreground'>
                Um erro aconteceu na aplicação, abaixo você encontra mais
                detalhes:
            </p>
            <p> {error.message}</p>
            <p className='text-accent-foreground'>
                <Link
                    href='https://www.linkedin.com/in/gabriel-feijo/'
                    className='text-sky-600 hover:underline dark:text-sky-400'
                >
                    Suporte do desenvolvedor
                </Link>
            </p>
        </div>
    );
}
