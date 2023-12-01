import { getRequestConfig } from 'next-intl/server';

export const locales = ['sk', 'en'] as const;
export const defaultLocale = 'sk';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
}));
