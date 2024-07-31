'use client';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className='flex h-[calc(100vh-4.5rem)] flex-1 flex-col items-center justify-center gap-2'>
            <h1 className='text-4xl font-bold'>Oh não, algo deu errado...</h1>
            <p className='text-accent-foreground'>
                A página que você tentou acessar não existe! 😢
            </p>
            <p className='text-accent-foreground'>
                Voltar para a{' '}
                <Link
                    href='/'
                    className='text-sky-600 hover:underline dark:text-sky-400'
                >
                    Página inicial
                </Link>
            </p>
        </div>
    );
}
