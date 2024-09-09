import React, { useState, useEffect } from 'react';
import ProfileImg from '../../assets/icons/camera.png';
// import CameraIcon from '../../assets/icons/Vector.png';
import { getDefaultImage, getImageURL } from '../../utils/imageUrl';
import InputLayout from '../Form/InputLayout';

const CustomLogoImage = ({
    label,
    name,
    onFilesChange,
    errorMessage,
    extraClassName,
    value,
    data,
    col,
    required,
    imgclass,
    removeable,
    editable,
    uploadboxclass,
    uploadIcon,
    disabled = false,
    ...props
}) => {
    const [files, setFiles] = useState(value || data?.[name] || []);

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
        } else {
            onFilesChange({ name, value: [] });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files, name]);

    const onFileChange = (e) => {
        const chossenFile = e.target.files;
        handlefileChange(Object.values(chossenFile));
        e.target.value = '';
    };
    const handlefileChange = (uploadedfile) => {
        let uploadedFiles = [];
        uploadedfile.forEach((file) => {
            if (files.findIndex((f) => f.name === file.name) === -1) {
                uploadedFiles.push(file);
            }
        });
        setFiles([...uploadedFiles]);
    };

    const onDelete = (id) => {
        const s = files.filter((item, index) => index !== id);
        setFiles([...s]);
        onFilesChange({ name, value: [] });
    };

    return (
        <InputLayout col={col || 12} label={label} name={name} required={required} extraClassName={extraClassName} data={data} errorMessage={errorMessage}>
            <input type="file" className=" " name={name} onChange={onFileChange} id={name} accept=".jpg, .jpeg, .png,.jfif" hidden {...props} />
            {files.length ? (
                Object.values(files).map((image, i) => (
                    <div key={i} className="photoDiv">
                        {removeable && <i onClick={() => onDelete(i)} className="pi pi-times cursor-pointer"></i>}
                        <img
                            src={image ? (typeof image === 'string' ? getImageURL(image) : URL.createObjectURL(image)) : ProfileImg}
                            onError={(e) => (e.target.src = getDefaultImage())}
                            alt="pic"
                            className={`profile-img relative btn-border-color ${imgclass}`}
                            accept=".jpg, .jpeg, .png, .jfif"
                        />
                    </div>
                ))
            ) : (
                <div
                    className="photo-upload flex justify-content-center align-items-center"
                    style={{
                        height: '95px',
                        width: '90px',
                    }}
                >
                    <label htmlFor={name}>
                        <img
                            className="w-full h-full fit-cover"
                            style={{ width: '50px' }}
                            src={ProfileImg}
                            onError={(e) => (e.target.src = getDefaultImage())}
                            alt=""
                            accept=".jpg, .jpeg, .png"
                        />
                    </label>
                </div>
            )}

            {/* <div className="text-left ">
                {errorMessage || data?.formErrors?.[name] ? <small className="p-error">{errorMessage || data?.formErrors?.[name]}</small> : null}
            </div> */}
        </InputLayout>
    );
};

export default CustomLogoImage;
