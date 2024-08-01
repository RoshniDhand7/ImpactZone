import React from 'react';
import InputLayout from '../Form/InputLayout';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { Calendar } from 'primereact/calendar';
import { InputSwitch } from 'primereact/inputswitch';
import { Checkbox } from 'primereact/checkbox';
import { Chips } from 'primereact/chips';
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from 'primereact/multiselect';
import { Password } from 'primereact/password';
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
        <InputLayout col={col} label={label} name={name} required={required} extraClassName={extraClassName} data={data} errorMessage={errorMessage}>
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
export const CustomGroupInput = ({
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
    prefixName,
    ...props
}) => {
    return (
        <InputLayout col={col} label={label} name={name} required={required} extraClassName={extraClassName} data={data} errorMessage={errorMessage}>
            <div className="p-inputgroup  flex-1">
                <span className="p-inputgroup-addon w-20rem">{prefixName}</span>
                <InputNumber
                    id={name}
                    name={name}
                    value={value || data?.[name] || ''}
                    type={type}
                    onChange={(e) => onChange && onChange({ ...e, name: name, value: e.value })}
                    className={`w-full ${inputClass ? inputClass : ''} ${errorMessage ? 'p-invalid' : ''}`}
                    disabled={disabled}
                    useGrouping={props.useGrouping || false}
                    {...props}
                />
            </div>
        </InputLayout>
    );
};
export const CustomPassword = ({
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
        <InputLayout col={col} label={label} name={name} required={required} extraClassName={extraClassName} data={data} errorMessage={errorMessage}>
            <Password
                id={name}
                name={name}
                value={value || data?.[name] || ''}
                type={type}
                onChange={(e) => onChange && onChange({ ...e, name: e.target.name, value: e.target.value })}
                className={`w-full justify-content-center${inputClass ? inputClass : ''} ${errorMessage ? 'p-invalid' : ''}`}
                inputClassName="w-full"
                disabled={disabled}
                toggleMask
                feedback={false}
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
        <InputLayout col={col} label={label} name={name} required={required} extraClassName={extraClassName} data={data} errorMessage={errorMessage}>
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
    customIndex,
    fieldName,
    ...props
}) => {
    return (
        <InputLayout col={col} label={label} name={name} required={required} extraClassName={extraClassName} data={data} errorMessage={errorMessage}>
            <Dropdown
                id={name}
                name={name}
                onChange={(e) => onChange && onChange({ ...e, name: e.target.name, value: e.value, customIndex, fieldName })}
                value={value || data?.[name]}
                className={`w-full ${inputClass ? inputClass : ''} ${errorMessage ? 'p-invalid' : ''}`}
                optionLabel={optionLabel}
                filter={true}
                // placeholder={props.placeholder || `Select ${label}`}
                disabled={disabled}
                {...props}
            />
            {errorMessage ? <small className="p-error">{errorMessage}</small> : null}
        </InputLayout>
    );
};
export const CustomMultiselect = ({
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
    customIndex,
    fieldName,
    ...props
}) => {
    return (
        <InputLayout col={col} label={label} name={name} required={required} extraClassName={extraClassName} data={data} errorMessage={errorMessage}>
            <MultiSelect
                id={name}
                name={name}
                value={value || data?.[name]}
                onChange={(e) => onChange && onChange({ ...e, name: e.target.name, value: e.value, customIndex, fieldName })}
                className={`w-full ${inputClass ? inputClass : ''} ${errorMessage ? 'p-invalid' : ''}`}
                optionLabel={optionLabel}
                disabled={disabled}
                {...props}
            />
            {errorMessage ? <small className="p-error">{errorMessage}</small> : null}
        </InputLayout>
    );
};
export const CustomCalenderInput = ({
    id,
    label,
    name,
    data,
    value,
    onChange,
    errorMessage,
    extraClassName,
    required,
    col,
    inputClass,
    disabled,
    customIndex,
    fieldName,
    ...props
}) => {
    return (
        <InputLayout col={col || 4} label={label} name={name} required={required} extraClassName={extraClassName} data={data} errorMessage={errorMessage}>
            <Calendar
                inputId={name}
                name={name}
                value={data?.[name] || value}
                onChange={(e) => onChange && onChange({ ...e, name: e.target.name, value: e.value, customIndex, fieldName })}
                className={`w-full ${inputClass ? inputClass : ''} ${errorMessage ? 'p-invalid' : ''}`}
                disabled={disabled}
                readOnlyInput
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
        <InputLayout col={col || 6} label={label} name={name} required={required} extraClassName={extraClassName} data={data} errorMessage={errorMessage}>
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
        <>
            <div className={`col-12  md:col-${col} ${extraClassName}`}>
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
            </div>
        </>
    );
};

export const CustomChipInput = ({
    label,
    name,
    data,
    value,
    onChange,
    errorMessage,
    extraClassName,
    required,
    col,
    inputClass,
    keyFilter = null,
    disabled = false,
    onRemove,
    onAdd,
    onKeyUp,
    ...props
}) => {
    return (
        <InputLayout col={col || 6} label={label} name={name} required={required} extraClassName={extraClassName} data={data} errorMessage={errorMessage}>
            <Chips
                id={name}
                onAdd={(e) => onAdd && onAdd({ ...e, name: name, currentValue: e.value })}
                name={name}
                onKeyUp={(e) => {
                    if (e.key === 'Enter') return e.preventDefault();
                    onKeyUp && onKeyUp({ ...e, name: e.target.name, value: e.target.value });
                }}
                value={value || data?.[name]}
                onRemove={(e) => onRemove && onRemove({ e, name: name, currentValue: e.value })}
                onChange={(e) => onChange && onChange({ ...e, name: e.target.name, value: [...new Set(e.value)] })}
                className={`w-full p-fluid ${inputClass ? inputClass : ''} ${errorMessage ? 'p-invalid' : ''}`}
                placeholder="Press enter to add value."
                disabled={disabled}
                keyfilter={keyFilter}
                {...props}
            />
        </InputLayout>
    );
};

export const CustomInputNumber = ({
    label,
    name,
    data,
    value,
    onChange,
    errorMessage,
    extraClassName,
    required,
    col,
    inputClass,
    disabled,
    customIndex,
    fieldName,
    ...props
}) => {
    return (
        <InputLayout col={col || 6} label={label} name={name} required={required} extraClassName={extraClassName} data={data} errorMessage={errorMessage}>
            <InputNumber
                id={name}
                name={name}
                value={value || data?.[name] || 0}
                onChange={(e) => onChange && onChange({ ...e, name: name, value: e.value, customIndex, fieldName })}
                className={`w-full ${inputClass ? inputClass : ''} ${errorMessage ? 'p-invalid' : ''}`}
                useGrouping={props.useGrouping || false}
                disabled={disabled}
                {...props}
            />
        </InputLayout>
    );
};
export const CustomInputDecimalNumber = ({
    label,
    name,
    data,
    value,
    onChange,
    errorMessage,
    extraClassName,
    required,
    col,
    inputClass,
    disabled,
    customIndex,
    fieldName,
    prefix = '$',
    ...props
}) => {
    return (
        <InputLayout col={col || 6} label={label} name={name} required={required} extraClassName={extraClassName} data={data} errorMessage={errorMessage}>
            <InputNumber
                id={name}
                name={name}
                value={value || data?.[name] || 0}
                onChange={(e) => onChange && onChange({ ...e, name: name, value: e.value, customIndex, fieldName })}
                className={`w-full ${inputClass ? inputClass : ''} ${errorMessage ? 'p-invalid' : ''}`}
                useGrouping={props.useGrouping || false}
                disabled={disabled}
                minFractionDigits={4}
                maxFractionDigits={4}
                prefix={prefix}
                {...props}
            />
        </InputLayout>
    );
};
export const CustomInputTime = ({
    label,
    name,
    data,
    value,
    onChange,
    errorMessage,
    extraClassName,
    required,
    col,
    inputClass,
    disabled,
    customIndex,
    fieldName,
    ...props
}) => {
    return (
        <InputLayout col={col || 6} label={label} name={name} required={required} extraClassName={extraClassName} data={data} errorMessage={errorMessage}>
            <input
                type="time"
                id={name}
                name={name}
                value={value || data?.[name] || 0}
                onChange={(e) => onChange && onChange({ ...e, name: name, value: e.target.value, customIndex, fieldName })}
                className={`w-full ${inputClass ? inputClass : ''} ${errorMessage ? 'p-invalid' : ''}`}
                disabled={disabled}
                autocomplete="off"
                {...props}
            />
            {/* <InputNumber
                id={name}
                name={name}
                value={value || data?.[name] || 0}
                onChange={(e) => onChange && onChange({ ...e, name: name, value: e.value, customIndex, fieldName })}
                className={`w-full ${inputClass ? inputClass : ''} ${errorMessage ? 'p-invalid' : ''}`}
                useGrouping={props.useGrouping || false}
                disabled={disabled}
                {...props}
            /> */}
        </InputLayout>
    );
};

export const CustomFilterCheckbox = ({ name, data, value, onChange }) => {
    const handleChange = (e) => {
        let _new = data ? [...data] : [];
        if (e.checked) {
            _new.push({ name, value });
        } else {
            _new = _new.filter((item) => item.name !== name);
        }
        onChange(_new);
    };
    let _id = name + Date.now();
    return (
        <div className="flex mx-2 mb-2">
            <Checkbox name={name} inputId={_id} checked={data?.find((item) => item.name === name) ? true : false} onChange={handleChange} />
            <label htmlFor={_id} className="ml-2">
                {name}
            </label>
        </div>
    );
};
export const CustomCheckBoxInput = ({ label, name, onChange, data, value, extraClassName, options, col = 12 }) => {
    console.log('options>>', options);
    return (
        <div className={`col-12  md:col-${col} ${extraClassName}`}>
            {label && <label>{label}</label>}
            <div className="grid mt-3">
                {options?.map((checkbox, i) => (
                    <CustomFilterCheckbox
                        key={i}
                        name={checkbox.name}
                        value={checkbox.value}
                        data={data[name] || value}
                        onChange={(e) => onChange({ name, value: e })}
                    />
                ))}
            </div>
        </div>
    );
};
