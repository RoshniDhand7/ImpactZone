import React, { useRef, useEffect } from 'react'
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import plugin from 'grapesjs-preset-newsletter';
import Buttons from '../../../../components/buttons/button';

const AddAgreement = () => {
    const editorRef = useRef(null);
    useEffect(() => {
        if (editorRef.current) {
            const editor = grapesjs.init({
                container: editorRef.current,
                plugins: [plugin],
            });

            // editor.CssComposer.setRule(`#${id}:hover`, { 'color': 'red'  });
            var panelManager = editor.Panels;


            // remove the buttons
            // panelManager.removeButton("views", "open-sm");
            // panelManager.removeButton("views", "open-layers");
            panelManager.removeButton('options', 'fullscreen');
            panelManager.removeButton('options', 'export-template');
            // panelManager.removeButton('options', 'undo');
            // panelManager.removeButton('options', 'redo');
            panelManager.removeButton('options', 'preview');
            // panelManager.removeButton('views','open-tm');
            panelManager.removeButton('options', 'toggle-images');
            panelManager.removeButton('options', 'sw-visibility');
            panelManager.removeButton('devices-c', 'set-device-desktop');
            panelManager.removeButton('devices-c', 'set-device-tablet');
            panelManager.removeButton('devices-c', 'set-device-mobile');

            // panelManager.removeButton("views", "open-blocks");
            return () => {
                editor.destroy();
            };
        }
    }, []);

    const handleSubmit = () => {
        if (editorRef.current) {
            console.log("editorRef.current>>", editorRef, editorRef.current)
            const html = editorRef.current.innerHTML;
            console.log("html>>", html)
        }
    };
    console.log("editorRef>>", editorRef.current);

    return (
        <>
        <div className="px-4">
            <div className=" flex align-items-center justify-content-between my-3">
              <span className="text-xl font-bold text-900">
              </span>
              <div className=" px-2 ">
              <Buttons
                onClick={handleSubmit}
                className=" btn-dark border-none"
                label="Submit"
                icon=""
            ></Buttons>
              </div>
            </div>
            </div>
            <div className='gpj1' ref={editorRef}></div>
           
        </>
    );

}

export default AddAgreement
