import styles from './styles.module.scss';
import Image from 'next/image';
import { ButtonProps } from './types';

const Button = ({ onClick, type = 'button', text, iconProps }: ButtonProps) => {
  return (
    <button type={type} className={styles.btn} onClick={onClick}>
      {iconProps ? (
        <Image
          src={iconProps.src}
          width={iconProps.size}
          height={iconProps.size}
          alt={iconProps.alt}
        />
      ) : null}
      <span>{text}</span>
    </button>
  );
};

export { Button };
