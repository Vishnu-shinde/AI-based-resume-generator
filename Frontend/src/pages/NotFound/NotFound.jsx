import { memo } from 'react';
import { Link } from 'react-router-dom';

const NotFound = memo(function NotFound() {
  return (
    <div className="container py-5 text-center">
      <h1 className="display-4 fw-bold mb-3">404</h1>
      <p className="text-secondary mb-4">The page you are looking for does not exist.</p>
      <Link className="btn btn-primary" to="/">
        Back to Home
      </Link>
    </div>
  );
});

export default NotFound;
