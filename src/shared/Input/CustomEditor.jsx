import React from 'react';
import { Editor } from 'primereact/editor';

const CustomEditor = ({ name, data, value, onTextChange, height = '320px' }) => {
    return (
        <div className="custom-editor">
            <Editor
                value={value || data?.[name]}
                onTextChange={(e) => onTextChange && onTextChange({ ...e, name: name, value: e.htmlValue })}
                style={{ height }}
            />
        </div>
    );
};

export default CustomEditor;
