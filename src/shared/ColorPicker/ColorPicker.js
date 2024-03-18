import React from 'react';
import { ColorPicker } from 'primereact/colorpicker';
import InputLayout from '../Form/InputLayout';

export default function CustomPicker({ label, name, data, value, onChange, errorMessage, extraClassName, required, col = 4, inputClass, ...props }) {
    return (
        <>
            <InputLayout col={col} label={label} name={name} required={required} extraClassName={extraClassName} data={data} errorMessage={errorMessage}>
                <ColorPicker
                    inputId={name}
                    name={name}
                    format="hex"
                    value={value || data?.[name] || ''}
                    onChange={(e) => onChange && onChange({ ...e, name: e.target.name, value: e.value })}
                    inputClassName={`w-full ${inputClass ? inputClass : ''} ${errorMessage ? 'p-invalid' : ''}`}
                    {...props}
                />
            </InputLayout>
        </>
    );
}
