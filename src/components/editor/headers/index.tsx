import { HeaderEditorType, SimpleHeaderType } from '@/components/Documentation/types';
import OneHeader from './oneHeader';
import { SyntheticEvent } from 'react';
import { useTranslation } from 'next-i18next';

import styles from './style.module.scss';

const HeadersSection = ({ headers, addHeader, removeHeader, updateHeader }: HeaderEditorType) => {
  const { t } = useTranslation();

  const newHeader = (event: SyntheticEvent) => {
    const newEmptyHeader: SimpleHeaderType = {
      headerKey: '',
      value: '',
      active: false,
    };
    addHeader(newEmptyHeader);
  };

  const headersElements = Object.entries(headers).map(([key, value]) => {
    return (
      <OneHeader
        key={key}
        headerData={value}
        index={+key}
        removeHeader={removeHeader}
        updateHeader={updateHeader}
      />
    );
  });

  return (
    <div className={styles['editors__editor-tool']}>
      <header>
        <button className={styles['editors__editor-tool_btn_add']} onClick={newHeader}>
          <picture>
            <img className={styles['editors__editor-tool_icon']} src="/plus.png" alt="add" />
          </picture>
          {t('app.new-header')}
        </button>
      </header>
      {headersElements}
    </div>
  );
};

export default HeadersSection;
