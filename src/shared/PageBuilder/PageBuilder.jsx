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

            editor.BlockManager.add('membership_type', {
                id: 'membership_type',
                label: 'Membership Type',
                category: 'Field',
                content: `<span>{{Membership_Type}}</span>`,
                media: '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="3" stroke="#000000"><path  d="M45.41,11.16l.86,2.61a3.75,3.75,0,0,0,1.5,2L50,17.21a3.85,3.85,0,0,1,1.43,4.62l-.84,2.09a3.83,3.83,0,0,0,0,2.88l.83,2a3.83,3.83,0,0,1-1.32,4.58L48.13,34.8a3.86,3.86,0,0,0-1.46,2.08L46,39.32a3.84,3.84,0,0,1-4,2.78l-2.1-.18a3.88,3.88,0,0,0-2.74.84l-2,1.63a3.83,3.83,0,0,1-4.85,0L28.54,43a3.85,3.85,0,0,0-2.45-.88H23a3.83,3.83,0,0,1-3.74-3l-.55-2.35a3.82,3.82,0,0,0-1.58-2.31L15.3,33.19a3.84,3.84,0,0,1-1.45-4.48l.86-2.36a3.86,3.86,0,0,0,0-2.66l-.77-2.06a3.86,3.86,0,0,1,1.51-4.58l2-1.31a3.87,3.87,0,0,0,1.61-2.19l.61-2.18a3.85,3.85,0,0,1,4-2.79l1.93.17a3.88,3.88,0,0,0,2.74-.84l1.83-1.48a3.84,3.84,0,0,1,4.87,0L36.7,7.81a3.82,3.82,0,0,0,2.75.88l2-.15A3.84,3.84,0,0,1,45.41,11.16Z"/><path d="M44.59,41.57l7,12.21c.18.31,0,.64-.23.55l-8.61-3.5a.24.24,0,0,0-.31.19l-1.06,9c-.06.29-.42.25-.6-.06L32.65,45.25" stroke-linecap="round"/><path d="M32.65,45.25,25.14,60c-.19.31-.53.35-.6.07l-1.27-9.2a.24.24,0,0,0-.31-.18L14.59,54.3c-.28.08-.43-.24-.24-.56l7-12.17" stroke-linecap="round"/><path d="M32.74,16.89l2.7,5.49a.1.1,0,0,0,.08.05l6,.88c.08,0,.12.12.06.17l-4.38,4.27a.09.09,0,0,0,0,.09l1,6a.1.1,0,0,1-.14.11l-5.42-2.85a.07.07,0,0,0-.09,0L27.19,34a.11.11,0,0,1-.15-.11l1-6a.1.1,0,0,0,0-.09l-4.39-4.27a.11.11,0,0,1,.06-.17l6.05-.88a.09.09,0,0,0,.08-.05l2.71-5.49A.1.1,0,0,1,32.74,16.89Z" stroke-linecap="round"/></svg>',
            });

            editor.BlockManager.add('services', {
                id: 'services',
                label: 'Services',
                category: 'Field',
                content: `<span>{{Services}}</span>`,
                media: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 8.25C9.92894 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92894 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z" fill="#1C274C"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.9747 1.25C11.5303 1.24999 11.1592 1.24999 10.8546 1.27077C10.5375 1.29241 10.238 1.33905 9.94761 1.45933C9.27379 1.73844 8.73843 2.27379 8.45932 2.94762C8.31402 3.29842 8.27467 3.66812 8.25964 4.06996C8.24756 4.39299 8.08454 4.66251 7.84395 4.80141C7.60337 4.94031 7.28845 4.94673 7.00266 4.79568C6.64714 4.60777 6.30729 4.45699 5.93083 4.40743C5.20773 4.31223 4.47642 4.50819 3.89779 4.95219C3.64843 5.14353 3.45827 5.3796 3.28099 5.6434C3.11068 5.89681 2.92517 6.21815 2.70294 6.60307L2.67769 6.64681C2.45545 7.03172 2.26993 7.35304 2.13562 7.62723C1.99581 7.91267 1.88644 8.19539 1.84541 8.50701C1.75021 9.23012 1.94617 9.96142 2.39016 10.5401C2.62128 10.8412 2.92173 11.0602 3.26217 11.2741C3.53595 11.4461 3.68788 11.7221 3.68786 12C3.68785 12.2778 3.53592 12.5538 3.26217 12.7258C2.92169 12.9397 2.62121 13.1587 2.39007 13.4599C1.94607 14.0385 1.75012 14.7698 1.84531 15.4929C1.88634 15.8045 1.99571 16.0873 2.13552 16.3727C2.26983 16.6469 2.45535 16.9682 2.67758 17.3531L2.70284 17.3969C2.92507 17.7818 3.11058 18.1031 3.28089 18.3565C3.45817 18.6203 3.64833 18.8564 3.89769 19.0477C4.47632 19.4917 5.20763 19.6877 5.93073 19.5925C6.30717 19.5429 6.647 19.3922 7.0025 19.2043C7.28833 19.0532 7.60329 19.0596 7.8439 19.1986C8.08452 19.3375 8.24756 19.607 8.25964 19.9301C8.27467 20.3319 8.31403 20.7016 8.45932 21.0524C8.73843 21.7262 9.27379 22.2616 9.94761 22.5407C10.238 22.661 10.5375 22.7076 10.8546 22.7292C11.1592 22.75 11.5303 22.75 11.9747 22.75H12.0252C12.4697 22.75 12.8407 22.75 13.1454 22.7292C13.4625 22.7076 13.762 22.661 14.0524 22.5407C14.7262 22.2616 15.2616 21.7262 15.5407 21.0524C15.686 20.7016 15.7253 20.3319 15.7403 19.93C15.7524 19.607 15.9154 19.3375 16.156 19.1985C16.3966 19.0596 16.7116 19.0532 16.9974 19.2042C17.3529 19.3921 17.6927 19.5429 18.0692 19.5924C18.7923 19.6876 19.5236 19.4917 20.1022 19.0477C20.3516 18.8563 20.5417 18.6203 20.719 18.3565C20.8893 18.1031 21.0748 17.7818 21.297 17.3969L21.3223 17.3531C21.5445 16.9682 21.7301 16.6468 21.8644 16.3726C22.0042 16.0872 22.1135 15.8045 22.1546 15.4929C22.2498 14.7697 22.0538 14.0384 21.6098 13.4598C21.3787 13.1586 21.0782 12.9397 20.7378 12.7258C20.464 12.5538 20.3121 12.2778 20.3121 11.9999C20.3121 11.7221 20.464 11.4462 20.7377 11.2742C21.0783 11.0603 21.3788 10.8414 21.6099 10.5401C22.0539 9.96149 22.2499 9.23019 22.1547 8.50708C22.1136 8.19546 22.0043 7.91274 21.8645 7.6273C21.7302 7.35313 21.5447 7.03183 21.3224 6.64695L21.2972 6.60318C21.0749 6.21825 20.8894 5.89688 20.7191 5.64347C20.5418 5.37967 20.3517 5.1436 20.1023 4.95225C19.5237 4.50826 18.7924 4.3123 18.0692 4.4075C17.6928 4.45706 17.353 4.60782 16.9975 4.79572C16.7117 4.94679 16.3967 4.94036 16.1561 4.80144C15.9155 4.66253 15.7524 4.39297 15.7403 4.06991C15.7253 3.66808 15.686 3.2984 15.5407 2.94762C15.2616 2.27379 14.7262 1.73844 14.0524 1.45933C13.762 1.33905 13.4625 1.29241 13.1454 1.27077C12.8407 1.24999 12.4697 1.24999 12.0252 1.25H11.9747ZM10.5216 2.84515C10.5988 2.81319 10.716 2.78372 10.9567 2.76729C11.2042 2.75041 11.5238 2.75 12 2.75C12.4762 2.75 12.7958 2.75041 13.0432 2.76729C13.284 2.78372 13.4012 2.81319 13.4783 2.84515C13.7846 2.97202 14.028 3.21536 14.1548 3.52165C14.1949 3.61826 14.228 3.76887 14.2414 4.12597C14.271 4.91835 14.68 5.68129 15.4061 6.10048C16.1321 6.51968 16.9974 6.4924 17.6984 6.12188C18.0143 5.9549 18.1614 5.90832 18.265 5.89467C18.5937 5.8514 18.9261 5.94047 19.1891 6.14228C19.2554 6.19312 19.3395 6.27989 19.4741 6.48016C19.6125 6.68603 19.7726 6.9626 20.0107 7.375C20.2488 7.78741 20.4083 8.06438 20.5174 8.28713C20.6235 8.50382 20.6566 8.62007 20.6675 8.70287C20.7108 9.03155 20.6217 9.36397 20.4199 9.62698C20.3562 9.70995 20.2424 9.81399 19.9397 10.0041C19.2684 10.426 18.8122 11.1616 18.8121 11.9999C18.8121 12.8383 19.2683 13.574 19.9397 13.9959C20.2423 14.186 20.3561 14.29 20.4198 14.373C20.6216 14.636 20.7107 14.9684 20.6674 15.2971C20.6565 15.3799 20.6234 15.4961 20.5173 15.7128C20.4082 15.9355 20.2487 16.2125 20.0106 16.6249C19.7725 17.0373 19.6124 17.3139 19.474 17.5198C19.3394 17.72 19.2553 17.8068 19.189 17.8576C18.926 18.0595 18.5936 18.1485 18.2649 18.1053C18.1613 18.0916 18.0142 18.045 17.6983 17.8781C16.9973 17.5075 16.132 17.4803 15.4059 17.8995C14.68 18.3187 14.271 19.0816 14.2414 19.874C14.228 20.2311 14.1949 20.3817 14.1548 20.4784C14.028 20.7846 13.7846 21.028 13.4783 21.1549C13.4012 21.1868 13.284 21.2163 13.0432 21.2327C12.7958 21.2496 12.4762 21.25 12 21.25C11.5238 21.25 11.2042 21.2496 10.9567 21.2327C10.716 21.2163 10.5988 21.1868 10.5216 21.1549C10.2154 21.028 9.97201 20.7846 9.84514 20.4784C9.80512 20.3817 9.77195 20.2311 9.75859 19.874C9.72896 19.0817 9.31997 18.3187 8.5939 17.8995C7.86784 17.4803 7.00262 17.5076 6.30158 17.8781C5.98565 18.0451 5.83863 18.0917 5.73495 18.1053C5.40626 18.1486 5.07385 18.0595 4.81084 17.8577C4.74458 17.8069 4.66045 17.7201 4.52586 17.5198C4.38751 17.314 4.22736 17.0374 3.98926 16.625C3.75115 16.2126 3.59171 15.9356 3.4826 15.7129C3.37646 15.4962 3.34338 15.3799 3.33248 15.2971C3.28921 14.9684 3.37828 14.636 3.5801 14.373C3.64376 14.2901 3.75761 14.186 4.0602 13.9959C4.73158 13.5741 5.18782 12.8384 5.18786 12.0001C5.18791 11.1616 4.73165 10.4259 4.06021 10.004C3.75769 9.81389 3.64385 9.70987 3.58019 9.62691C3.37838 9.3639 3.28931 9.03149 3.33258 8.7028C3.34348 8.62001 3.37656 8.50375 3.4827 8.28707C3.59181 8.06431 3.75125 7.78734 3.98935 7.37493C4.22746 6.96253 4.3876 6.68596 4.52596 6.48009C4.66055 6.27983 4.74468 6.19305 4.81093 6.14222C5.07395 5.9404 5.40636 5.85133 5.73504 5.8946C5.83873 5.90825 5.98576 5.95483 6.30173 6.12184C7.00273 6.49235 7.86791 6.51962 8.59394 6.10045C9.31998 5.68128 9.72896 4.91837 9.75859 4.12602C9.77195 3.76889 9.80512 3.61827 9.84514 3.52165C9.97201 3.21536 10.2154 2.97202 10.5216 2.84515Z" fill="#1C274C"/></svg>',
            });
            editor.BlockManager.add('assessed_fees', {
                id: 'assessed_fees',
                label: 'Assessed Fees',
                category: 'Field',
                content: `<span>{{Assessed_Fees}}</span>`,
                media: '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000"><polyline points="8 36 16 36 16 52 8 52"/><path d="M16 38h8a4 4 0 0 1 4 4h9a3 3 0 0 1 3 3 3 3 0 0 1-3 3H26"/><path d="m40 44.8 6.63-4a5.82 5.82 0 0 1 3-.82 5.78 5.78 0 0 1 4.09 1.69L56 44 38.07 54.76A8.75 8.75 0 0 1 33.58 56a8.68 8.68 0 0 1-3.06-.56L16 50"/><circle cx="38" cy="22" r="14"/><path d="M36.33 22a3.34 3.34 0 0 1 0-6.67"/><path d="M39.67 22a3.34 3.34 0 0 1 0 6.67"/><line x1="38" y1="12" x2="38" y2="15.33"/><line x1="38" y1="28.67" x2="38" y2="32"/><line x1="36.33" y1="22" x2="39.67" y2="22"/><path d="M43 17s-1.67-1.67-3.33-1.67h-3.34"/><path d="M33 27s1.67 1.67 3.33 1.67h3.34"/></svg>',
            });
            editor.BlockManager.add('membership_name', {
                id: 'membership_name',
                label: 'Membership Name',
                category: 'Field',
                content: `<span>{{Membership_Name}}</span>`,
                media: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.3375 19C5.815 19 5.33219 18.7141 5.07094 18.25C4.80969 17.7859 4.80969 17.2141 5.07094 16.75C5.33219 16.2859 5.815 16 6.3375 16H17.0625C17.8702 16 18.525 16.6716 18.525 17.5C18.525 18.3284 17.8702 19 17.0625 19H6.3375Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.875 8C6.10837 10.228 8.83837 13.569 11.7 8C14.5616 13.569 17.2916 10.228 18.525 8L17.16 16H6.24L4.875 8Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.7 8C10.8923 8 10.2375 7.32843 10.2375 6.5C10.2375 5.67157 10.8923 5 11.7 5C12.5078 5 13.1625 5.67157 13.1625 6.5C13.1625 6.89782 13.0085 7.27936 12.7342 7.56066C12.4599 7.84196 12.0879 8 11.7 8Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M18.525 8C17.9866 8 17.55 7.55228 17.55 7C17.55 6.44772 17.9866 6 18.525 6C19.0635 6 19.5 6.44772 19.5 7C19.5 7.26522 19.3973 7.51957 19.2145 7.70711C19.0316 7.89464 18.7836 8 18.525 8Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.87502 8C4.33655 8 3.90002 7.55228 3.90002 7C3.90002 6.44772 4.33655 6 4.87502 6C5.4135 6 5.85002 6.44772 5.85002 7C5.85002 7.26522 5.7473 7.51957 5.56445 7.70711C5.38161 7.89464 5.13361 8 4.87502 8Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            });

            panelManager.addButton('options', {
                id: 'save',
                className: 'fa fa-upload',
                command: 'onSave',
                attributes: { title: 'Save' },
                // active: false,
            });

            const blocks = editor.BlockManager.getAll();
            console.log(blocks);

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
