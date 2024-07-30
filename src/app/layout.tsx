import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

import Header from '@/components/header';
import { ThemeProvider } from '@/components/theme-provider';
import { SessionProvider } from '@/contexts/SessionContext';
import { ReactQueryProvider } from '@/providers/react-query-provider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Desafio RevoluTI  - Gabriel Feijó',
    description:
        'Um aplicativo para pesquisa e validação de códigos postais, fornecendo resultados precisos e atualizados em tempo real, com foco na eficiência e intuitividade.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='pt-BR'>
            <body className={inter.className}>
                <SessionProvider>
                    <ThemeProvider
                        attribute='class'
                        defaultTheme='light'
                        enableSystem
                        disableTransitionOnChange
                    >
                        <ReactQueryProvider>
                            <Header />
                            {children}
                            <Toaster richColors />
                        </ReactQueryProvider>
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
