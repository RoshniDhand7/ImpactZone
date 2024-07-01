import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Gallery from '../../assets/images/gallery.png';
import DefaultImg from '../../assets/images/defaultImage.png';
import { getImageURL } from '../../utils/imageUrl.js';
import { showToast } from '../../redux/actions/toastAction';
import InputLayout from '../Form/InputLayout.jsx';
import Camera from '../../assets/images/camera.png';

export default function CustomImageInput({
    label,
    name,
    onFilesChange,
    errorMessage,
    extraClassName,
    value,
    data,
    limit,
    multiple,
    col,
    required,
    removeable,
    editable,
    ...props
}) {
    const [files, setFiles] = useState(value || data?.[name] || []);
    const dispatch = useDispatch();

    useEffect(() => {
        if (value || data?.[name]) {
            if (JSON.stringify(value || data?.[name]) !== JSON.stringify(files)) {
                setFiles(value || data?.[name]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value || data?.[name]]);

    useEffect(() => {
        if (onFilesChange) {
            if (files.length) {
                onFilesChange({ name, value: files });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files, name]);

    const onDelete = (id) => {
        if (editable) {
            const s = files.filter((item, index) => index !== id);
            setFiles([...s]);
        }
    };

    const onFileChange = (e) => {
        if (editable) {
            const chossenFile = e.target.files;

            console.log(chossenFile, 'ChooseNFile');
            if (chossenFile.length > 0) {
                handlefileChange(Object.values(chossenFile));
            }
        }
    };
    const handlefileChange = (uploadedfile) => {
        let uploadedFiles = [];

        console.log(uploadedfile, 'uploadedfile');
        uploadedfile.forEach((file) => {
            if (files.findIndex((f) => f.name === file.name) === -1) {
                uploadedFiles.push(file);
            }
        });
        if (multiple) {
            if (limit) {
                let newarr = [...files, ...uploadedFiles];
                if (newarr.length > limit) {
                    newarr = newarr.slice(0, limit);
                    dispatch(
                        showToast({
                            severity: 'warn',
                            summary: 'Limit Exceeded',
                            detail: `Max. file limit is ${limit}.`,
                        }),
                    );
                }
                setFiles(newarr);
            } else {
                setFiles([...files, ...uploadedFiles]);
            }
        } else {
            setFiles([...uploadedFiles]);
        }
    };

    console.log('files>>', files);

    return (
        <>
            <InputLayout col={col || 12} label={label} name={name} required={required} extraClassName={extraClassName} data={data} errorMessage={errorMessage}>
                <div className="image-box relative">
                    {files && files.length ? (
                        <div className="h-full">
                            {Object.values(files).map((image, i) => (
                                <div
                                    key={i}
                                    className="photoDiv"
                                    style={{
                                        height: '100% ',
                                        width: '100%',
                                    }}
                                >
                                    {removeable && <i onClick={() => onDelete(i)} className="fa-solid fa-circle-xmark cursor-pointer"></i>}

                                    <label htmlFor={name}>
                                        <img
                                            className="w-full h-full fit-cover"
                                            src={image ? getImageURL(image) : DefaultImg}
                                            onError={(e) => (e.target.src = '')}
                                            alt=""
                                        />
                                    </label>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div
                            className="photo-upload "
                            style={{
                                height: '100%',
                                width: '100%',
                            }}
                        >
                            <label htmlFor={name}>
                                <img className="w-full h-full fit-cover" src={DefaultImg} onError={(e) => (e.target.src = '')} alt="" />
                            </label>
                        </div>
                    )}
                    <div className="absolute camera-icon">
                        <input
                            name={name}
                            onChange={onFileChange}
                            id={name}
                            type="file"
                            accept="image/*"
                            hidden
                            {...props}
                            multiple={multiple}
                            // capture="camera"
                        />
                        <label htmlFor={name}>
                            <img src={Camera} alt="" style={{ width: '20px', height: '20px' }} />
                        </label>
                    </div>
                </div>
            </InputLayout>
        </>
    );
}
