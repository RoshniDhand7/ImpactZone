import React from 'react';
import InputLayout from '../Form/InputLayout';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';

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
        <InputLayout col={col} label={label || name} name={name} required={required} extraClassName={extraClassName} data={data} errorMessage={errorMessage}>
            <InputText
                id={name}
                name={name}
                value={value || data?.[name]}
                type={type}
                onChange={(e) => onChange && onChange({ ...e, name: e.target.name, value: e.target.value })}
                className={`w-full p-2 my-1 ${inputClass ? inputClass : ''} ${errorMessage ? 'p-invalid' : ''}`}
                disabled={disabled}
                {...props}
            />
        </InputLayout>
    );
};
export const CustomTextArea = ({ label, name, onChange, data, value, errorMessage, extraClassName, required, col, inputClass, maxLength, ...props }) => {
    return (
        <InputLayout
            col={col || 12}
            label={label}
            name={name}
            required={required}
            extraClassName={extraClassName}
            data={data}
            errorMessage={errorMessage}
            maxLength={maxLength}
        >
            <InputTextarea
                id={name}
                name={name}
                value={value || data?.[name]}
                onChange={(e) => onChange && onChange({ name: e.target.name, value: e.target.value.slice(0, maxLength), ...e })}
                className={`w-full ${inputClass ? inputClass : ''} ${errorMessage ? 'p-invalid' : ''}`}
                {...props}
            />
            {errorMessage ? <small className="p-error">{errorMessage}</small> : null}
        </InputLayout>
    );
};

export const CustomDropDown = ({
    label,
    name,
    onChange,
    data,
    value,
    errorMessage,
    extraClassName,
    required,
    col = 4,
    inputClass,
    disabled = false,
    optionLabel = 'name',
    ...props
}) => {
    return (
        <InputLayout col={col} label={label || name} name={name} required={required} extraClassName={extraClassName} data={data} errorMessage={errorMessage}>
            <Dropdown
                id={name}
                name={name}
                value={value || data?.[name]}
                onChange={(e) => onChange && onChange({ ...e, name: e.target.name, value: e.value })}
                className={`w-full ${inputClass ? inputClass : ''} ${errorMessage ? 'p-invalid' : ''}`}
                optionLabel={optionLabel}
                // placeholder={props.placeholder || `Select ${label}`}
                disabled={disabled}
                {...props}
            />
            {errorMessage ? <small className="p-error">{errorMessage}</small> : null}
        </InputLayout>
    );
};
