import styles from './styles.module.scss';
import Image from 'next/image';

type ButtonProps = {
  onClick?: () => void | Promise<boolean> | Promise<void>;
  type: 'button' | 'reset' | 'submit';
  text: string;
  iconProps?: {
    src: string;
    alt: string;
    size: number;
  };
  testId?: string;
};

const Button = ({ onClick, type = 'button', text, iconProps, testId }: ButtonProps) => {
  return (
    <button type={type} className={styles.btn} onClick={onClick} data-testid={testId}>
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

export default Button;
