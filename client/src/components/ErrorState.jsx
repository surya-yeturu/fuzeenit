import Button from './Button';

const ErrorState = ({
  title = 'Something went wrong',
  message = 'We encountered an error. Please try again.',
  onRetry,
}) => (
  <div className="flex flex-col items-center justify-center py-20 text-center" role="alert">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-red/10">
      <svg className="h-6 w-6 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-primary">{title}</h3>
    <p className="mt-2 max-w-md text-sm text-secondary">{message}</p>
    {onRetry && (
      <Button onClick={onRetry} className="mt-6" variant="outline">
        Try Again
      </Button>
    )}
  </div>
);

export default ErrorState;
