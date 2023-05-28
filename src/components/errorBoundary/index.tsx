import { ErrorBoundary } from 'react-error-boundary';

interface Props {
  children: JSX.Element | null;
}

const ErrorBoundaryWithMessage = ({ children }: Props) => {
  return <ErrorBoundary fallback={<div>Something went wrong...</div>}>{children}</ErrorBoundary>;
};

export { ErrorBoundaryWithMessage };
