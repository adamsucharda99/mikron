import { unstable_setRequestLocale } from 'next-intl/server';

interface Props {
  params: { locale: string };
}

export default function Home({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  return <main></main>;
}
