import { useRouter } from 'next/router';
import Link from 'next/link';

import styles from './styles.module.scss';

const LanguageSwitcher = () => {

  const router = useRouter();

  const { locales, locale: activeLocale } = router;

  const otherLocales = locales?.filter((locale) => locale !== activeLocale && locale !== 'default');

  return (
    <span className="text-muted cursor-pointer">
      {otherLocales?.map((locale) => {
        const { pathname, query, asPath } = router;
        return (
          <span key={'locale-' + locale}>
            <Link href={{ pathname, query }} as={asPath} locale={locale}>
              {locale === 'en' ? 'English' : locale === 'ru' ? 'Русский' : null}
            </Link>
          </span>
        );
      })}
    </span>
  );
};

export default LanguageSwitcher;
