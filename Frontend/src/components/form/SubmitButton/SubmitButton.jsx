import { memo } from 'react';
import Button from '../../common/Button/Button';

const SubmitButton = memo(function SubmitButton({ isLoading, disabled }) {
  return (
    <div className="d-flex justify-content-center">
      <Button type="submit" disabled={disabled || isLoading} className="px-4" style={{ minWidth: 210 }}>
        {isLoading ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" /> : null}
        {isLoading ? 'Generating...' : 'Generate Resume'}
      </Button>
    </div>
  );
});

export default SubmitButton;
