import { MouseEventHandler } from 'react';

import styles from './styles.module.scss';

type ButtonProps = {
  onClick: () => void | Promise<boolean>;
  text: string;
};

const Button = (props: ButtonProps) => {
  return (
    <button className={styles.btn} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default Button;
