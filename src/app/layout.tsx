import { AppProvider } from '@/context';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Navigation from '../components/navigation';
import '../scss/globals.scss';

const roboto = Roboto({
	weight: '400',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Technical challenge',
	description: 'Delosi technical challenge by Segundo Carmen Dominguez',
	icons: {
		icon: '/logos/32x32_dark.jpg'
	}
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
	return (
		<html lang="en">
			<AppProvider>
				<body className={roboto.className}>
					<Navigation />
					<main>
						{children}
					</main>
				</body>
			</AppProvider>
		</html>
	)
}
