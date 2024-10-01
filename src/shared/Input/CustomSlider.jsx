import { Slider } from 'primereact/slider';
import React from 'react';
import InputLayout from '../Form/InputLayout';

const CustomSlider = ({
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
            <Slider
                id={name}
                name={name}
                
                value={value || data?.[name]}
                onChange={(e) => onChange && onChange({ ...e, name: name, value: e.value, customIndex, fieldName })}
                className={`w-full  my-3${inputClass ? inputClass : ''} ${errorMessage ? 'p-invalid' : ''}`}
                disabled={disabled}
                {...props}
            />
        </InputLayout>
    );
};

export default CustomSlider;
