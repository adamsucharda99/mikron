import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';
import { localePrefix } from './navigation';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
});

export const config = {
  matcher: ['/', '/(sk|en)/:path*'],
};
