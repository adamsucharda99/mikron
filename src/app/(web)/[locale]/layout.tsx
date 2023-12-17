import Footer from '@/components/Footer';
import Header, { navbarHeight } from '@/components/Header';
import { locales } from '@/i18n';
import { Box } from '@chakra-ui/react';
import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { groq } from 'next-sanity';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { client } from '../../../../sanity/lib/client';
import { Providers } from '../../providers';

const query = groq`
 *[_type == 'category' && !defined(parent)] {
  'name': name[$locale],
  'children': *[_type == 'category' && parent._ref == ^._id] {
    'name': name[$locale],
      'series': *[_type == 'series' && category._ref == ^._id] {
      _id,  
      name,
      'manufacturer': manufacturer -> name,
      'slug': slug.current,
      }
  }
}
`;

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mikron Slovakia',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const getProductMenuData = async (locale: string) =>
  await client.fetch(query, { locale }, { next: { revalidate: 1 } });

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

  const productMenuData = await getProductMenuData(locale);

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
