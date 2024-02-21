import React, { useRef, useEffect } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import './PageBuilder.css';
import grapesjs from 'grapesjs';
import plugin from 'grapesjs-preset-newsletter';
import constants from '../../constants';
import endPoints from '../../services/endPoints';
import { isAuthenticated } from '../../services/auth';

export default function PageBuilder() {
    const editorRef = useRef(null);
    useEffect(() => {
        const initEditor = () => {
            const editor = grapesjs.init({
                container: editorRef.current,
                plugins: [plugin],
                assetManager: {
                    upload: constants.endPointUrl + endPoints.ASSETS,
                    uploadName: 'files',
                    headers: { Authorization: `Bearer ${isAuthenticated()}` }, // Add any additional headers if required
                },
            });

            editor.on('asset:upload:error', (err) => {
                console.log(err);
            });

            let panelManager = editor.Panels;

            panelManager.addButton('options', {
                id: 'save',
                className: 'fa fa-upload',
                command: 'onSave',
                attributes: { title: 'Save' },
                // active: false,
            });

            const commands = editor.Commands;
            commands.add('onSave', (editor) => {
                handleSaveHTML();
            });

            panelManager.removeButton('devices-c', 'set-device-desktop');
            panelManager.removeButton('devices-c', 'set-device-tablet');
            panelManager.removeButton('devices-c', 'set-device-mobile');

            panelManager.removeButton('options', 'sw-visibility');
            panelManager.removeButton('options', 'preview');
            panelManager.removeButton('options', 'fullscreen');
            panelManager.removeButton('options', 'export-template');

            // panelManager.removeButton('options', 'toggle-images');

            // panelManager.removeButton('options', 'undo');
            // panelManager.removeButton('options', 'redo');

            // remove the buttons
            // panelManager.removeButton('views', 'open-sm');
            // panelManager.removeButton('views', 'open-layers');
            // panelManager.removeButton('views', 'open-tm');

            // editor.setComponents(existingHTML);
            editorRef.current = editor;
        };
        initEditor();

        editorRef.current.AssetManager.add([
            {
                type: 'image',
                src: 'https://images.pexels.com/photos/20187061/pexels-photo-20187061/free-photo-of-women-in-the-village-grow-rice-together-for-the-family.jpeg',
            },

            {
                type: 'image',
                src: 'https://images.pexels.com/photos/7461579/pexels-photo-7461579.jpeg',
            },
        ]);

        return () => {
            editorRef.current.destroy();
            // editorRef.current = null;
        };
    }, []);

    const handleSaveHTML = async () => {
        const htmlContent = editorRef.current.getHtml();
        try {
            console.log(htmlContent);
        } catch (error) {
            console.error('Error saving HTML content:', error);
        }
    };

    const imageUpload = document.getElementById('imageUpload');
    imageUpload?.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            editorRef.current.AssetManager.add([{ type: 'image', file }]);
        }
    });

    return (
        <>
            <div className="gpj" ref={editorRef}></div>
            <input type="file" id="imageUpload" />
        </>
    );
}
