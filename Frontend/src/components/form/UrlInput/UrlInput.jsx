import { memo } from 'react';

const UrlInput = memo(function UrlInput({
  label,
  name,
  placeholder,
  register,
  error,
  helperText,
}) {
  const inputClassName = `form-control ${error ? 'is-invalid' : ''}`.trim();

  return (
    <div className="mb-4">
      <label className="text-14 fw-semibold" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="url"
        className={inputClassName}
        placeholder={placeholder}
        aria-label={label}
        {...register(name)}
      />
      <div className="invalid-feedback d-block">{helperText || ' '}</div>
    </div>
  );
});

export default UrlInput;
