import { memo } from 'react';

const Loader = memo(function Loader({ message = 'Loading your developer profile…' }) {
  return (
    <div className="d-grid place-items-center text-center py-5" style={{ minHeight: 280 }}>
      <div className="spinner-border text-primary" role="status" aria-hidden="true" />
      <div className="text-secondary">{message}</div>
    </div>
  );
});

export default Loader;
