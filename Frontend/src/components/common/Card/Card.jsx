import { memo } from 'react';

const Card = memo(function Card({ children, contentProps = {}, className = '', ...props }) {
  const { className: contentClassName = '', ...restContentProps } = contentProps;

  return (
    <div {...props} className={`card shadow-sm border-0 h-100 ${className}`.trim()}>
      <div {...restContentProps} className={`card-body ${contentClassName}`.trim()}>
        {children}
      </div>
    </div>
  );
});

export default Card;
