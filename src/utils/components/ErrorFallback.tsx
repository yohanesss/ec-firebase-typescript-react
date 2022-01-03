type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary?: () => void;
};

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      {resetErrorBoundary && (
        <button onClick={resetErrorBoundary}>Try again</button>
      )}
    </div>
  );
};
