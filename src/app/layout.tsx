import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { ReactQueryProvider } from '@/providers/react-query-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Desafio RevoluTI  - Gabriel Feijó',
	description:
		'An app for searching and validating postal codes, providing precise and up-to-date results in real-time, focusing on efficiency and intuitiveness.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='pt-BR'>
			<body className={inter.className}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<ReactQueryProvider>{children}</ReactQueryProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
