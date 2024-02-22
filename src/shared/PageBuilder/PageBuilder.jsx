import React, { useRef, useEffect } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import './PageBuilder.css';
import grapesjs from 'grapesjs';
import plugin from 'grapesjs-preset-newsletter';
import constants from '../../constants';
import { addAssets, deleteAsset, getAssets } from '../../redux/actions/AgreementSettings/AgreementTemplate';
import { useDispatch } from 'react-redux';

export default function PageBuilder() {
    const dispatch = useDispatch();
    const editorRef = useRef(null);
    useEffect(() => {
        const initEditor = () => {
            const editor = grapesjs.init({
                container: editorRef.current,
                plugins: [plugin],
                assetManager: {
                    assets: [],
                    uploadFile: onAddAsset,
                },
            });

            let panelManager = editor.Panels;

            let am = editor.AssetManager;
            let assets = am.getAll();
            assets.on('remove', onRemoveAsset);

            panelManager.addButton('options', {
                id: 'save',
                className: 'fa fa-upload',
                command: 'onSave',
                attributes: { title: 'Save' },
                // active: false,
            });

            const commands = editor.Commands;
            commands.add('onSave', handleSaveHTML);

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
        return () => {
            // editorRef.current.destroy();
            // editorRef.current = null;
        };
    }, []);
    useEffect(() => {
        onGetAssets();
    }, []);

    const onGetAssets = () => {
        dispatch(
            getAssets((data) => {
                let { models } = editorRef.current.AssetManager.getAll();

                let as = data.map((item) => ({
                    id: item._id,
                    name: item.name,
                    type: 'image',
                    src: constants.baseUrl + item.url,
                }));
                if (models && models.length) {
                    as = as.filter((item) => models.findIndex((item2) => item.id === item2.attributes.id) === -1);
                }
                editorRef.current.AssetManager.add(as);
            }),
        );
    };

    const onAddAsset = async (e) => {
        dispatch(
            addAssets(e.target.files, (data) => {
                let as = data.map((item) => ({
                    id: item._id,
                    name: item.name,
                    type: 'image',
                    src: constants.baseUrl + item.url,
                }));
                editorRef.current.AssetManager.add(as);
            }),
        );
    };
    const onRemoveAsset = async ({ attributes }) => {
        console.log(attributes);
        dispatch(
            deleteAsset(attributes.id, () => {
                editorRef.current.AssetManager.remove(attributes.src);
            }),
        );
    };

    let con = {
        htmlContent:
            '<body id="i0pi"><div id="inqx">hello Insert your text here</div><table id="ia8e"><tbody><tr><td id="ipaq"><table class="grid-item-row"><tbody><tr><td class="grid-item-cell2-l"><table class="grid-item-card"><tbody><tr><td class="grid-item-card-cell"><img src="https://via.placeholder.com/250x150/78c5d6/fff/" alt="Image" class="grid-item-image"/><table class="grid-item-card-body"><tbody><tr><td class="grid-item-card-content"><h1 class="card-title">Title here</h1><p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p><a class="button">Button</a></td></tr></tbody></table></td></tr></tbody></table></td><td class="grid-item-cell2-r"><table class="grid-item-card"><tbody><tr><td class="grid-item-card-cell"><img src="https://via.placeholder.com/250x150/78c5d6/fff/" alt="Image" class="grid-item-image"/><table class="grid-item-card-body"><tbody><tr><td class="grid-item-card-content"><h1 class="card-title">Title here</h1><p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td><td id="ikvh"><img id="ituf" src="https://impactzoneapi.appdeft.biz/public/uploads/1708595963701.png"/></td></tr></tbody></table><table id="i6mal"><tbody><tr><td class="divider"></td></tr></tbody></table></body>',
        cssContent:
            '* { box-sizing: border-box; } body {margin: 0;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}#inqx{padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;}#ia8e{height:150px;margin-top:0px;margin-right:auto;margin-bottom:10px;margin-left:auto;padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px;width:100%;}#ipaq{padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;vertical-align:top;width:50%;}#ikvh{padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;vertical-align:top;width:50%;}#ituf{color:black;width:394px;height:330px;}.divider{background-color:rgba(0, 0, 0, 0.1);height:1px;}#i6mal{width:100%;margin-top:10px;margin-bottom:10px;}.button{background-color:#ac2222;border-radius:3px 3px 0px 4px;border:0px solid #250a0a;padding:5px 5px 5px 10px;}',
    };

    // useEffect(() => {
    //     setTimeout(() => {
    //         console.log('worked');

    //         editorRef.current.setComponents(con.htmlContent);
    //         editorRef.current.setStyle(con.cssContent);
    //     }, 5000);
    // }, []);

    const handleSaveHTML = async () => {
        const htmlContent = editorRef.current.getHtml();
        const cssContent = editorRef.current.getCss();
        try {
            console.log({ htmlContent, cssContent });
        } catch (error) {
            console.error('Error saving HTML content:', error);
        }
    };

    return (
        <>
            <div className="gpj" ref={editorRef}></div>
        </>
    );
}
