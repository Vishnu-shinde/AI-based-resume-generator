import React, { useEffect, useRef, useState } from "react";

const EditableText = ({
  value,
  onChange,
  placeholder,
  multiline = false,
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && multiline && inputRef.current) {
      const textarea = inputRef.current;

      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value, editing, multiline]);

  const handleChange = (e) => {
    onChange(e.target.value);

    if (multiline) {
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
  };

  if (!editing) {
    return (
      <span
        className="editable-text"
        onClick={() => setEditing(true)}
      >
        {value || placeholder}
      </span>
    );
  }

  if (multiline) {
    return (
      <textarea
        ref={inputRef}
        className="editable-text-input"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={() => setEditing(false)}
        autoFocus
      />
    );
  }

  return (
    <input
      ref={inputRef}
      className="editable-text-input"
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      onBlur={() => setEditing(false)}
      autoFocus
    />
  );
};

export default EditableText;