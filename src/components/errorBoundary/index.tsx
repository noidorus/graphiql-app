import { ErrorBoundary } from 'react-error-boundary';
import { Props } from './types';

const ErrorBoundaryWithMessage = ({ children }: Props) => {
  return <ErrorBoundary fallback={<div>Something went wrong...</div>}>{children}</ErrorBoundary>;
};

export { ErrorBoundaryWithMessage };
