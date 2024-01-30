import React from 'react';
import InputLayout from '../Form/InputLayout';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { Calendar } from 'primereact/calendar';
import { InputSwitch } from 'primereact/inputswitch';
import { Checkbox } from 'primereact/checkbox';
import { capitalizeCamelCase } from '../../utils/commonFunctions';

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
                value={value || data?.[name] || ''}
                type={type}
                onChange={(e) => onChange && onChange({ ...e, name: e.target.name, value: e.target.value })}
                className={`w-full ${inputClass ? inputClass : ''} ${errorMessage ? 'p-invalid' : ''}`}
                disabled={disabled}
                {...props}
            />
        </InputLayout>
    );
};
export const CustomInputMask = ({
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
    mask,
    disabled = false,
    type = 'text',
    ...props
}) => {
    return (
        <InputLayout col={col} label={label || name} name={name} required={required} extraClassName={extraClassName} data={data} errorMessage={errorMessage}>
            <InputMask
                id={name}
                name={name}
                value={data?.[name] || value}
                onChange={(e) => onChange?.({ ...e, name: e.target.name, value: e.target.value })}
                className={`border-none bg-surface-0 w-full ${inputClass || ''} ${errorMessage ? 'p-invalid' : ''}`}
                disabled={disabled}
                mask={mask}
                {...props}
            ></InputMask>
        </InputLayout>
    );
};

export const CustomTextArea = ({ label, name, onChange, data, value, errorMessage, extraClassName, required, col, inputClass, maxLength, ...props }) => {
    return (
        <InputLayout
            col={col || 12}
            label={label || name}
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
export const CustomCalenderInput = ({ id, label, name, data, value, onChange, errorMessage, extraClassName, required, col, inputClass, ...props }) => {
    return (
        <InputLayout
            col={col || 4}
            label={label || name}
            name={name}
            required={required}
            extraClassName={extraClassName}
            data={data}
            errorMessage={errorMessage}
        >
            <Calendar
                inputId={name}
                name={name}
                value={value || data?.[name]}
                onChange={(e) => onChange && onChange({ ...e, name: e.target.name, value: e.target.value })}
                className={`w-full ${inputClass ? inputClass : ''} ${errorMessage ? 'p-invalid' : ''}`}
                showIcon
                {...props}
                // icon="pi pi-clock"
                // timeOnly
            />
        </InputLayout>
    );
};
export const CustomInputSwitch = ({ label, name, data, value, onChange, errorMessage, extraClassName, required, col, inputClass, ...props }) => {
    return (
        <InputLayout
            col={col || 6}
            label={label || name}
            name={name}
            required={required}
            extraClassName={extraClassName}
            data={data}
            errorMessage={errorMessage}
        >
            <InputSwitch
                id={name}
                name={name}
                checked={value || data?.[name]}
                onChange={(e) => onChange && onChange({ ...e, name: e.target.name, value: e.value })}
                className={`${inputClass ? inputClass : ''} ${errorMessage ? 'p-invalid' : ''}`}
                {...props}
            />
        </InputLayout>
    );
};
export const CustomCheckbox = ({ label, name, data, value, onChange, errorMessage, extraClassName, required, col, inputClass, ...props }) => {
    return (
        <InputLayout col={col || 6} name={name} extraClassName={extraClassName} data={data} errorMessage={errorMessage}>
            <Checkbox
                id={name}
                name={name}
                inputId={label}
                checked={value || data?.[name]}
                onChange={(e) => onChange && onChange({ ...e, name: e.target.name, value: e.checked })}
                className={`${inputClass ? inputClass : ''} ${errorMessage ? 'p-invalid' : ''}`}
                {...props}
            />
            <label htmlFor={label} className="ml-2 text-xs text-dark-gray font-semibold">
                {label ? capitalizeCamelCase(label) : label}
            </label>
        </InputLayout>
    );
};
