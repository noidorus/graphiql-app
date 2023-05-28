import React, { FC } from 'react';
import styles from '../style.module.scss';

interface ResponseProps {
  responseWidth: string;
  responseValue: string;
}

export const Response: FC<ResponseProps> = ({ responseWidth, responseValue }) => {
  return (
    <div className={styles.response} style={{ width: responseWidth }}>
      <pre>{responseValue}</pre>
    </div>
  );
};
