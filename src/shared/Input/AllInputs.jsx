import React from 'react';
import InputLayout from '../Form/InputLayout';
import { InputText } from 'primereact/inputtext';

export const CustomInput = ({
  label,
  name,
  data,
  value,
  onChange,
  errorMessage,
  extraClassName,
  required,
  col = 4,
  inputClass,
  disabled = false,
  type = 'text',
  ...props
}) => {
  return (
    <InputLayout
      col={col}
      label={label || name}
      name={name}
      required={required}
      extraClassName={extraClassName}
      data={data}
      errorMessage={errorMessage}
    >
      <InputText
        id={name}
        name={name}
        value={value || data?.[name]}
        type={type}
        onChange={(e) =>
          onChange &&
          onChange({ ...e, name: e.target.name, value: e.target.value })
        }
        className={`w-full p-2 my-1 ${inputClass ? inputClass : ''} ${
          errorMessage ? 'p-invalid' : ''
        }`}
        disabled={disabled}
        {...props}
      />
    </InputLayout>
  );
};
