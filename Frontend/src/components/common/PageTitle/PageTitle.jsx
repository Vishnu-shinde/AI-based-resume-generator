import { memo } from 'react';

const PageTitle = memo(function PageTitle({ title, subtitle }) {
  return (
    <div>
      <h1 className="display-6 fw-bold mb-2">{title}</h1>
      {subtitle ? <p className="text-secondary mb-0">{subtitle}</p> : null}
    </div>
  );
});

export default PageTitle;
