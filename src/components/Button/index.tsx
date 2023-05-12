import styles from './styles.module.scss';

type ButtonProps = {
  onClick?: () => void | Promise<boolean> | Promise<void>;
  type: 'button' | 'reset' | 'submit';
  text: string;
};

const Button = ({ onClick, type = 'button', text }: ButtonProps) => {
  return (
    <button type={type} className={styles.btn} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
