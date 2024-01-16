import React, { useRef, useEffect } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import './PageBuilder.css';
import grapesjs from 'grapesjs';
import plugin from 'grapesjs-preset-newsletter';

export default function PageBuilder() {
    const editorRef = useRef(null);
    useEffect(() => {
        if (editorRef.current) {
            const editor = grapesjs.init({
                container: editorRef.current,
                plugins: [plugin],
            });
            return () => {
                editor.destroy();
            };
        }
    }, []);
    return <div className="gpj" ref={editorRef}></div>;
}
