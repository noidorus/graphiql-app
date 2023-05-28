import React, { MouseEvent } from 'react';

import styles from './style.module.scss';

interface IProps {
  children: JSX.Element | null;
  closeModal: () => void;
}

const Modal = ({ children, closeModal }: IProps) => {
  return (
    <>
      <div className={styles.overlay} onClick={closeModal} />

      <div className={styles.modal}>
        <button className={styles.modal__btn} onClick={closeModal}>
          <picture>
            <img className={styles.modal__btn_icon} src="/close-doc.png" alt="close" />
          </picture>
        </button>
        {children}
      </div>
    </>
  );
};

export { Modal };
