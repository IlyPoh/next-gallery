import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';

import Header from '@/components/Header';

import Provider from '@/utils/Provider';

import '@/styles/app.scss';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: '#f472b6',
};

export const metadata: Metadata = {
  title: {
    template: '%s | Gallery App',
    default: 'Gallery App',
    absolute: 'Home | Gallery App',
  },
  description: 'Home page in Gallery App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='h-full'>
      <body className={`h-full flex flex-col bg-black ${inter.className}`}>
        <Provider>
          <Header />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
