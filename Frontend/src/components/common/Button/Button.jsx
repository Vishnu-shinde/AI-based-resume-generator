import { memo } from 'react';

const Button = memo(function Button({ children, variant = 'primary', fullWidth = false, className = '', ...props }) {
  const bootstrapVariant =
    variant === 'outlined'
      ? 'btn-outline-primary'
      : variant === 'secondary'
        ? 'btn-secondary'
        : variant === 'danger'
          ? 'btn-danger'
          : 'btn-primary';

  return (
    <button
      type={props.type || 'button'}
      className={`btn ${bootstrapVariant} ${fullWidth ? 'w-100' : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
