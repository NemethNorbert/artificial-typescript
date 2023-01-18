export interface UploadError {
  message: string;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({
  message,
  resetErrorBoundary,
}: UploadError): JSX.Element {
  return (
    <div role="alert">
      <p>Ohh no!:</p>
      <pre>{message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
