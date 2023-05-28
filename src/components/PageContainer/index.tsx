import styles from './styles.module.scss';
import { PageContainerProps } from './types';

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export { PageContainer };
