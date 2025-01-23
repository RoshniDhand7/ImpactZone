import React, { useMemo, useState } from 'react';
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
import { capitalizeCamelCase, denominationsToDollarConverter } from '../../utils/commonFunctions';
import { AutoComplete } from 'primereact/autocomplete';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { CascadeSelect } from 'primereact/cascadeselect';

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
                className={` bg-surface-0 w-full ${inputClass || ''} ${errorMessage ? 'p-invalid' : ''}`}
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
    showLabel = true,
    ...props
}) => {
    return (
        <InputLayout
            col={col}
            label={label}
            name={name}
            required={required}
            extraClassName={extraClassName}
            data={data}
            errorMessage={errorMessage}
            showLabel={showLabel}
        >
            <Dropdown
                id={name}
                name={name}
                onChange={(e) => onChange && onChange({ ...e, name: e.target.name, value: e.value, customIndex, fieldName })}
                value={value || data?.[name]}
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
    showLabel = true,
    ...props
}) => {
    return (
        <InputLayout
            col={col || 4}
            label={label}
            name={name}
            required={required}
            extraClassName={extraClassName}
            data={data}
            errorMessage={errorMessage}
            showLabel={showLabel}
        >
            <Calendar
                inputId={name}
                name={name}
                value={data?.[name] || value}
                onChange={(e) => onChange && onChange({ ...e, name: e.target.name, value: e.value, customIndex, fieldName })}
                className={`w-full ${inputClass ? inputClass : ''} ${errorMessage ? 'p-invalid' : ''}`}
                disabled={disabled}
                readOnlyInput
                showIcon
                clearButtonClassName="mt-4"
                {...props}
            />
        </InputLayout>
    );
};
export const CustomTimeInput = ({
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
                icon="pi pi-clock"
                timeOnly
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
export const CustomCheckbox = ({ label, name, data, value, onChange, errorMessage, extraClassName, required, col = 6, inputClass, customIndex, ...props }) => {
    return (
        <>
            <div className={`col-12  md:col-${col} ${extraClassName}`}>
                <Checkbox
                    id={name}
                    name={name}
                    inputId={label}
                    checked={value || data?.[name]}
                    onChange={(e) => onChange && onChange({ ...e, name: e.target.name, value: e.checked, customIndex })}
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
    placeholder,
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
                placeholder={placeholder ?? 'Press enter to add value'}
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
    onBlur,
    errorMessage,
    extraClassName,
    required,
    col,
    inputClass,
    disabled,
    customIndex,
    fieldName,
    maxFractionDigits = 4,
    showLabel = true,
    ...props
}) => {
    return (
        <InputLayout
            col={col || 4}
            label={label}
            name={name}
            required={required}
            extraClassName={extraClassName}
            data={data}
            errorMessage={errorMessage}
            showLabel={showLabel}
        >
            <InputNumber
                id={name}
                name={name}
                value={value || data?.[name] || 0}
                onChange={(e) => onChange && onChange({ ...e, name: name, value: e.value, customIndex, fieldName })}
                onBlur={(e) => onBlur && onBlur({ ...e, name: name, value: e.value, customIndex, fieldName })}
                className={`w-full ${inputClass ? inputClass : ''} ${errorMessage ? 'p-invalid' : ''}`}
                useGrouping={props.useGrouping || false}
                disabled={disabled}
                maxFractionDigits={maxFractionDigits}
                {...props}
            />
        </InputLayout>
    );
};

export const CustomInputCurrentChange = ({ name, col = 4, data, handleChange, onAdd, onSub, ...props }) => {
    let _total = denominationsToDollarConverter(data, name);

    const onInc = () => {
        if (onAdd) {
            onAdd({ name, value: parseInt(data?.[name] || 0) });
        }
    };
    const onDec = () => {
        if (onSub) {
            onSub({ name, value: parseInt(data?.[name] || 0) });
        }
    };

    const onChange = (e) => {
        if (handleChange) {
            let value = e.target.value || 0;
            handleChange({ ...e, name: name, value });
        }
    };
    return (
        <div className={`col-${col}`}>
            <div className="text-sm font-semibold">{capitalizeCamelCase(name)}</div>
            <div className="col grid">
                <InputText id={name} name={name} value={data?.[name] || 0} onChange={onChange} className={`w-5`} keyfilter="pnum" {...props} />
                <div className="col-2 text-center my-auto">
                    <i className="pi pi-arrow-right "></i>
                </div>
                <div
                    style={{ position: 'relative', overflow: 'hidden' }}
                    className="cursor-pointer border col-4 border-round-md bg-green-600 text-white flex flex-column justify-content-center"
                >
                    <div style={{ position: 'absolute', left: 0 }} className="py-auto select-none px-2">
                        ${_total}
                    </div>
                    <div className="hover:bg-white opacity-20" onClick={onDec} style={{ position: 'absolute', width: '50%', height: '100%', left: 0 }}></div>
                    <div
                        className="hover:surface-900 opacity-10"
                        onClick={onInc}
                        style={{ position: 'absolute', width: '50%', height: '100%', right: 0 }}
                    ></div>
                </div>
            </div>
        </div>
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
            _new = _new.filter((item) => item.value !== value);
        }
        onChange(_new);
    };
    let _id = name + Date.now();
    return (
        <div className="flex mx-2 mb-2">
            <Checkbox name={name} inputId={_id} checked={data?.find((item) => item.value === value) ? true : false} onChange={handleChange} />
            <label htmlFor={_id} className="ml-2">
                {name}
            </label>
        </div>
    );
};
export const CustomCheckBoxInput = ({ label, name, onChange, data, value, extraClassName, options, col = 12 }) => {
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

export const CustomReactSelect = ({
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
    suggestions = [],
    isDisabled = false,
    options,
    defaultValue,
    isLoading = false,
    isClearable = true,
    isSearchable = true,
    ...props
}) => {
    return (
        <InputLayout col={col || 12} label={label} name={name} required={required} extraClassName={extraClassName} data={data} errorMessage={errorMessage}>
            <Select
                className={`w-full selectreact ${inputClass ? inputClass : ''} ${errorMessage ? 'p-invalid' : ''}`}
                classNamePrefix="select"
                defaultValue={defaultValue}
                isDisabled={isDisabled}
                id={data?.[name]}
                isLoading={isLoading}
                isClearable={isClearable}
                isSearchable={isSearchable}
                onChange={(selectedOptions) => onChange && onChange({ value: selectedOptions, name })}
                name={name}
                value={value || data?.[name]}
                options={options}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                {...props}
            />
        </InputLayout>
    );
};
export const CustomSelectCascade = ({
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
    options,
    placeholder,
    ...props
}) => {
    return (
        <InputLayout col={col} label={label} name={name} required={required} extraClassName={extraClassName} data={data} errorMessage={errorMessage}>
            <CascadeSelect
                value={value || data?.[name] || ''}
                onChange={(e) => onChange && onChange({ ...e, name, value: e.value })}
                options={options}
                className={`w-full md:w-14rem ${inputClass ? inputClass : ''} ${errorMessage ? 'p-invalid' : ''}`}
                breakpoint="767px"
                {...props}
            />
        </InputLayout>
    );
};

export const CustomAsyncReactSelect = ({
    label,
    name,
    data,
    value = '',
    onChange,
    errorMessage,
    extraClassName,
    required,
    col,
    inputClass,
    suggestions = [],
    options,
    defaultValue,
    isClearable = true,
    isSearchable = true,
    showLabel,
    ...props
}) => {
    let _options = useMemo(() => options?.map((item) => ({ label: item?.name, value: item?.value })), [options]);
    let _suggestions = useMemo(() => suggestions?.map((item) => ({ label: item?.name, value: item?.value })), [suggestions]);

    const handleChange = (e) => {
        if (e && onChange) {
            const newValue = e.value !== undefined ? e.value : e;
            onChange({ e, name, value: newValue });
        } else {
            onChange({ e, name, value: null });
        }
    };

    const loadOptions = (inputValue, callback) => {
        setTimeout(() => {
            callback(_options.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase())));
        }, 100);
    };

    const _value = useMemo(() => (value ? _options.find((item) => item?.value === value) : null), [value, _options]);

    return (
        <InputLayout
            col={col || 12}
            label={label}
            name={name}
            required={required}
            extraClassName={extraClassName}
            data={data}
            errorMessage={errorMessage}
            showLabel={showLabel}
        >
            <AsyncSelect
                className={`selectreact ${inputClass ? inputClass : ''} ${errorMessage ? 'p-invalid' : ''}`}
                value={_value}
                loadOptions={loadOptions}
                defaultOptions={_suggestions}
                onChange={handleChange}
                isClearable={isClearable}
                isSearchable={isSearchable}
                {...props}
            />
        </InputLayout>
    );
};

export const CustomField = ({ label, value, errorMessage, extraClassName, required, col = 1, children }) => {
    return (
        <InputLayout col={col} label={label} required={required} extraClassName={extraClassName} errorMessage={errorMessage}>
            {value}
            {children}
        </InputLayout>
    );
};
