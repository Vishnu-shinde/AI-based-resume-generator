import { memo } from 'react';

const ErrorMessage = memo(function ErrorMessage({ title = 'Something went wrong', description, onRetry }) {
  return (
    <div className="py-4 d-flex flex-column gap-3 align-items-center">
      <div className="alert alert-danger w-100 mb-0">
        <h6 className="mb-2">{title}</h6>
        {description ? <div className="small">{description}</div> : null}
      </div>
      {onRetry ? (
        <button className="btn btn-primary" onClick={onRetry}>
          Retry
        </button>
      ) : null}
    </div>
  );
});

export default ErrorMessage;
