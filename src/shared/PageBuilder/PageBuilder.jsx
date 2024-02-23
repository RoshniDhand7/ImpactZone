import React, { useRef, useEffect, useState } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import './PageBuilder.css';
import grapesjs from 'grapesjs';
import plugin from 'grapesjs-preset-newsletter';
import constants from '../../constants';
import {
    addAgreementTemplate,
    addAssets,
    deleteAsset,
    editAgreementTemplate,
    editAgreementTemplates,
    getAgreementTemplate,
    getAssets,
} from '../../redux/actions/AgreementSettings/AgreementTemplate';
import { useDispatch, useSelector } from 'react-redux';
import CustomDialog from '../Overlays/CustomDialog';
import { CustomGridLayout } from '../Cards/CustomCard';
import { CustomDropDown, CustomInput } from '../Input/AllInputs';
import { getClubs } from '../../redux/actions/BusinessSettings/clubsAction';
import formValidation from '../../utils/validations';
import { showFormErrors } from '../../utils/commonFunctions';
import { useHistory } from 'react-router-dom';

export default function PageBuilder({ id }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { clubsDropdown } = useSelector((state) => state.clubs);
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
            commands.add('onSave', onSave);

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
        dispatch(getClubs());
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

    let initialTemplate = {
        htmlContent:
            '<body><table id="i7mg"><tbody><tr><td id="isf3"><table id="ib67"><tbody><tr><td id="ixft"><table id="ib2u2"><tbody><tr><td id="iz5hj"><img id="ishaz" src="https://impactzoneapi.appdeft.biz/public/static/dummy-logo.png"/></td></tr></tbody></table><h1 class="heading">Its time to design your Contract.</h1><p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua\n      <br/><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua<br/><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua<br/></p></td></tr></tbody></table><table id="i8jsj"><tbody><tr><td id="idfyu"><img id="ib46g" src="https://impactzoneapi.appdeft.biz/public/static/twitter.png"/><img src="https://impactzoneapi.appdeft.biz/public/static/facebook.png" id="ivccx"/><img src="https://impactzoneapi.appdeft.biz/public/static/link.png" id="ijlgh"/></td></tr></tbody></table><table id="ivqzu"><tbody><tr><td class="divider"></td></tr></tbody></table><div id="i6st6">Copyright | 2024 | impact Zone | All rights reserved</div></td></tr></tbody></table></body>',
        cssContent:
            '* { box-sizing: border-box; } body {margin: 0;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}#i7mg{height:150px;margin-top:0px;margin-right:auto;margin-bottom:10px;margin-left:auto;padding-top:30px;padding-right:30px;padding-bottom:30px;padding-left:30px;width:100%;background-color:rgb(242, 245, 254);}#isf3{padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;vertical-align:top;}#ib67{height:150px;padding-top:50px;padding-right:50px;padding-bottom:50px;padding-left:50px;width:100%;background-color:rgb(255, 255, 255);border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;}#ixft{padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;vertical-align:top;}#ib2u2{height:150px;margin-top:0px;margin-right:auto;margin-bottom:10px;margin-left:auto;padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px;width:100%;}#iz5hj{padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;vertical-align:middle;text-align:center;}#ishaz{color:black;width:200px;height:74px;}.heading{text-align:center;}.paragraph{text-align:center;font-size:20px;color:rgb(81, 81, 81);}#i8jsj{height:150px;margin-top:0px;margin-right:auto;margin-bottom:10px;margin-left:auto;padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px;width:100%;}#idfyu{padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;vertical-align:middle;text-align:center;}#ib46g{color:black;width:40px;height:40px;margin-top:0px;margin-right:10px;margin-bottom:0px;margin-left:10px;}#ijlgh{color:black;width:40px;height:40px;margin-top:0px;margin-right:10px;margin-bottom:0px;margin-left:10px;}#ivccx{color:black;width:40px;height:40px;margin-top:0px;margin-right:10px;margin-bottom:0px;margin-left:10px;}.divider{background-color:rgba(0, 0, 0, 0.1);height:1px;}#ivqzu{width:100%;margin-top:10px;margin-bottom:10px;}#i6st6{padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;text-align:center;color:rgb(71, 69, 69);}',
    };

    useEffect(() => {
        if (id) {
            dispatch(
                getAgreementTemplate(id, (data) => {
                    editorRef.current.setComponents(data.htmlContent);
                    editorRef.current.setStyle(data.cssContent);
                    setData({ name: data.name, club: data.club });
                }),
            );
        } else {
            editorRef.current.setComponents(initialTemplate.htmlContent);
            editorRef.current.setStyle(initialTemplate.cssContent);
        }
    }, []);

    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({ name: '', club: '' });

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const onSave = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
        setData({
            name: '',
            club: '',
        });
    };

    const handleSaveHTML = async () => {
        if (showFormErrors(data, setData)) {
            const htmlContent = editorRef.current.getHtml();
            const cssContent = editorRef.current.getCss();
            if (id) {
                dispatch(
                    editAgreementTemplate(id, { ...data, htmlContent, cssContent }, setLoading, () => {
                        localStorage.removeItem('gjsProject');
                        history.goBack();
                    }),
                );
            } else {
                dispatch(
                    addAgreementTemplate({ ...data, htmlContent, cssContent }, setLoading, () => {
                        localStorage.removeItem('gjsProject');
                        history.goBack();
                    }),
                );
            }
        }
    };

    return (
        <>
            <CustomDialog title={id ? 'Update' : 'Add'} visible={visible} onCancel={onClose} loading={loading} onSave={handleSaveHTML}>
                <CustomGridLayout>
                    <CustomInput col="12" name="name" data={data} onChange={handleChange} />
                    <CustomDropDown col="12" name="club" data={data} onChange={handleChange} options={clubsDropdown} />
                </CustomGridLayout>
            </CustomDialog>
            <div className="gpj" ref={editorRef}></div>
        </>
    );
}
