import React from "react";

export type LabelPosition = "top" | "left";

export interface IInputText {
  className?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  icon?: React.ReactNode;
  label?: string;
  labelPosition?: LabelPosition;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  error?: string;
  name?: string;
  type?: string;
}

export function InputText({
  className = "",
  wrapperClassName = "",
  inputClassName = "",
  icon,
  label,
  labelPosition = "top",
  placeholder,
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  disabled,
  error,
  name,
  type = "text",
}: IInputText) {
  return (
    <div
      className={`input-text input-text--${labelPosition} ${wrapperClassName} ${
        disabled ? "is-disabled" : ""
      } ${error ? "has-error" : ""}`}
    >
      {label && (
        <label className="font-component-label" htmlFor={name}>
          {label}
        </label>
      )}

      <div className={`input-text__field ${className}`}>
        {icon && <span className="icon-component">{icon}</span>}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          className={`input-text__input font-component-input ${inputClassName}`}
        />
      </div>

      {error && <span className="input-text__error">{error}</span>}
    </div>
  );
}