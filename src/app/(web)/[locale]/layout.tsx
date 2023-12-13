import Footer from '@/components/Footer';
import Header, { navbarHeight } from '@/components/Header';
import { client } from '@/contentful';
import { locales } from '@/i18n';
import { Box } from '@chakra-ui/react';
import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Providers } from '../../providers';
import { ProductMenuData } from './productMenuData';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mikron Slovakia',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function getProductMenuData(locale: string) {
  const categories = await client.getEntries({
    content_type: 'category',
    locale,
  });

  const manufacturers = await client.getEntries({
    content_type: 'manufacturer',
  });

  const series = await client.getEntries({
    content_type: 'series',
    locale,
  });

  return { categories, manufacturers, series };
}

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  if (!locales.includes(locale as any)) notFound();
  unstable_setRequestLocale(locale);

  const productMenuData = (await getProductMenuData(
    locale
  )) as unknown as ProductMenuData;

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Providers>
          <Header locale={locale} productMenuData={productMenuData} />
          <Box h={navbarHeight} />
          {children}
          <Footer locale={locale} />
        </Providers>
      </body>
    </html>
  );
}