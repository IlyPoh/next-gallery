import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import type { Metadata, Viewport } from 'next';

import Header from '@/components/Header';
import QueryProvider from '@/components/QueryProvider';
import SessionProvider from '@/components/SessionProvider';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang='en' className='h-full'>
      <body className={`h-full flex flex-col bg-black ${inter.className}`}>
        <SessionProvider session={session}>
          <QueryProvider>
            <Header />
            <main>{children}</main>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
