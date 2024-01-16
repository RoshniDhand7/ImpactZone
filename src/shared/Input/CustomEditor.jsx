import React, { useState } from 'react';
import { Editor } from 'primereact/editor';

const CustomEditor = ({ value, onTextChange, height = '320px' }) => {
    const [text, setText] = useState(value || '');

    const handleTextChange = (e) => {
        setText(e.htmlValue);
        if (onTextChange) {
            onTextChange(e.htmlValue);
        }
    };

    return (
        <div className="custom-editor">
            <Editor value={text} onTextChange={handleTextChange} style={{ height }} />
        </div>
    );
};

export default CustomEditor;
