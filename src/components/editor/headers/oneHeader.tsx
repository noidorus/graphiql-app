import { OneHeaderType, SimpleHeaderType } from '@/components/Documentation/types';
import { SyntheticEvent, useState } from 'react';

import styles from './style.module.scss';

const OneHeader = ({ removeHeader, updateHeader, index, headerData }: OneHeaderType) => {
  const [headerKey, setHeaderKey] = useState<string>(headerData.headerKey);
  const [value, setValue] = useState<string>(headerData.value);
  const [active, setActive] = useState<boolean>(headerData.active);

  const changeActive = (event: SyntheticEvent) => {
    const newActive = !active;
    setActive(newActive);
    changeHeader(newActive);
  };

  const changeKey = (event: SyntheticEvent) => {
    const element = event.target as HTMLInputElement;
    setHeaderKey(element.value);
    changeHeader(active);
  };

  const changeValue = (event: SyntheticEvent) => {
    const element = event.target as HTMLInputElement;
    setValue(element.value);
    changeHeader(active);
  };

  const changeHeader = (newActive: boolean | undefined) => {
    const setledActive: boolean = newActive !== undefined ? newActive : active;
    const header: SimpleHeaderType = { headerKey, value, active: setledActive };
    updateHeader(index, header);
  };

  const delHeader = (event: SyntheticEvent) => {
    removeHeader(index);
  };

  return (
    <div className={styles['editors__editor-header']}>
      <input type="checkbox" checked={active} onChange={changeActive} />
      <input
        className={styles['editors__editor-header_input']}
        placeholder="key"
        value={headerKey}
        onInput={changeKey}
      />
      <input
        className={styles['editors__editor-header_input']}
        placeholder="value"
        value={value}
        onInput={changeValue}
      />
      <button className={styles['editors__editor-tool_btn_delete']} onClick={delHeader}>
        <picture>
          <img
            className={styles['editors__editor-tool_icon']}
            src="/delete-header.png"
            alt="delete"
          />
        </picture>
      </button>
    </div>
  );
};

export default OneHeader;
