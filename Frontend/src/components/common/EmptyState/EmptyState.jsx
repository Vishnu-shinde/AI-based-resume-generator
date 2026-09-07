import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const EmptyState = memo(function EmptyState({ title = 'No profile data yet', description = 'Add one or more profile URLs to generate a resume.' }) {
  const navigate = useNavigate();

  return (
    <div className="py-5 d-flex flex-column gap-3 align-items-center">
      <div className="alert alert-info w-100 mb-0">
        <strong>{title}</strong>
        <div>{description}</div>
      </div>
      <button className="btn btn-primary" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
});

export default EmptyState;
