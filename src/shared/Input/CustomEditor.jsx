import React from 'react';
import { Editor } from 'primereact/editor';
import InputLayout from '../Form/InputLayout';

const CustomEditor = ({ name, data, value, onTextChange, height = '320px', inputClass, col = 12, label, required, extraClassName, errorMessage }) => {
    return (
        <InputLayout col={col} label={label} name={name} required={required} extraClassName={extraClassName} data={data} errorMessage={errorMessage}>
            <div className="custom-editor">
                <Editor
                    value={value || data?.[name]}
                    onTextChange={(e) => onTextChange && onTextChange({ ...e, name: name, value: e.htmlValue })}
                    style={{ height }}
                    className={`w-full ${inputClass ? inputClass : ''} ${errorMessage ? 'p-invalid' : ''}`}
                />
            </div>
        </InputLayout>
    );
};

export default CustomEditor;
